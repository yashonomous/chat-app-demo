import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './i18n.tsx';
import { store } from './store/store.tsx';

import Loader from './components/common/Loader/Loader.tsx';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>

  <Provider store={store}>
    <Suspense
      fallback={
        <Loader
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
          }}
          size="large"
        />
      }>
      <App />
    </Suspense>
  </Provider>

  // </React.StrictMode>
);
