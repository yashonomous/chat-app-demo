const uuid = require('uuid/v4');
const fs = require('fs');

const addComment = async (comments, newComment) => {
  const now = Date.now();
  const comment = {
    ...newComment,
    id: uuid(),
    dateAdded: now,
    dateEdited: now,
    status: 1,
  };

  await writeComments([...comments, comment]);
  return comment;
};

const deleteComment = async (comments, commentId) => {
  const deletedComment = comments.find((c) => c.id === commentId);
  await writeComments(comments.filter((c) => c.id !== commentId));

  return deletedComment;
};

const editComment = async (comments, editedComment) => {
  const date = Date.now();
  await writeComments(
    comments.map((c) =>
      c.id === editedComment.id ? { ...c, ...editedComment, dateEdited: date } : c
    )
  );

  return {
    ...comments.find((c) => c.id === editedComment.id),
    ...editedComment,
    dateEdited: date,
  };
};

const getComments = async () =>
  new Promise((res) => {
    fs.readFile('./api/comments.json', 'utf8', (err, data) => {
      if (err) throw err;

      if (!data) {
        return res([]);
      }
      res(JSON.parse(data));
    });
  });

const writeComments = async (comments) =>
  new Promise((res) => {
    fs.writeFile('./api/comments.json', JSON.stringify(comments), (err, data) => {
      if (err) throw err;
      res();
    });
  });

module.exports = { addComment, deleteComment, editComment, getComments };
