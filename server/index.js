const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const error = require('koa-json-error');
const chalk = require('chalk');
const { PassThrough } = require('stream');
const { addComment, deleteComment, editComment, getComments } = require('./src/commentsService');

const app = new Koa();
const router = new Router();

const fakeSleep = (ms) => new Promise((res) => setTimeout(res, ms));

const standardSleep = 1000;

app.use(koaBody());
app.use(cors());
app.use(error());

let clients = [];

router.get('/', async (ctx, next) => {
  await fakeSleep(standardSleep);

  ctx.body = { message: 'Welcome to chat app backend' };
});

router.get('/status', async (ctx, next) => {
  await fakeSleep(standardSleep);

  ctx.body = { clients: clients.length };
});

router.get('/commentsEvents', async (ctx, next) => {
  // await fakeSleep(standardSleep);

  ctx.request.socket.setTimeout(0);
  ctx.req.socket.setNoDelay(true);
  ctx.req.socket.setKeepAlive(true);

  ctx.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  const stream = new PassThrough();

  ctx.status = 200;
  ctx.body = stream;

  // Function to send an initial message when client connects
  stream.write(`data: {}\n\n`);

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    stream: stream,
  };

  clients.push(newClient);

  // Clean up when the client closes the connection
  ctx.req.on('close', () => {
    console.log(`Client ${clientId} disconnected`);
    clients = clients.filter((client) => client.id !== clientId);
    stream.end();
  });

  // Handle ECONNRESET error
  ctx.req.on('error', (err) => {
    if (err.code === 'ECONNRESET') {
      console.log(`Client ${clientId} disconnected abruptly`);
    } else {
      console.error(`Client ${clientId} encountered an error:`, err);
    }
    clients = clients.filter((client) => client.id !== clientId);
    stream.end();
  });

  // Prevent Koa from automatically closing the connection
  // ctx.respond = false;
});

router.get('/allComments', async (ctx, next) => {
  await fakeSleep(standardSleep);

  ctx.body = await getComments();
});

router.post('/comments', async (ctx, next) => {
  await fakeSleep(standardSleep);

  const { name, text } = ctx.request.body;
  if (!name || typeof name !== 'string' || name.length < 3) {
    ctx.throw(400, 'The request must include a name with a length greater than 2 characters');
  }

  if (!text || typeof text !== 'string' || text === '') {
    console.log('empty message', text === '');

    ctx.throw(400, 'The request must include some text');
  }

  const newComment = await addComment(await getComments(), { name, text });

  // Notify all connected SSE clients about the new comment
  clients.forEach((client) => {
    try {
      client.stream.write(`data: ${JSON.stringify(newComment)}\n\n`);
    } catch (error) {
      console.error(`Failed to send message to client ${client.id}:`, error);
    }
  });

  ctx.status = 201;
  ctx.body = newComment;
});

router.delete('/comment/:id', async (ctx, next) => {
  await fakeSleep(standardSleep);
  const { id } = ctx.params;
  try {
    await deleteComment(await getComments(), id);
    ctx.body = true;
  } catch (err) {
    ctx.body = false;
  }
});

router.put('/comment/:id', async (ctx, next) => {
  await fakeSleep(standardSleep);

  const { id } = ctx.params;

  const { name, text } = ctx.request.body;

  if (!name || typeof name !== 'string' || name.length < 3) {
    ctx.throw(400, 'The request must include a name with a length greater than 2 characterste');
  }

  if (!text || typeof text !== 'string' || text === '') {
    ctx.throw(400, 'The request must include some text');
  }

  try {
    ctx.body = await editComment(await getComments(), { name, text, id });
  } catch (err) {
    ctx.throw(500, 'Internal server error');
  }
});

app.use(router.routes()).use(router.allowedMethods());

// Default route (catch-all)
app.use(async (ctx) => {
  ctx.status = 404; // Set the status to 404
  ctx.body = 'Page Not Found'; // Customize your default response
});

console.log(chalk.yellow('starting server'));
// app.listen(3001);
console.log(chalk.green('server started'));

module.exports = app.callback();
