import React from 'react';
import { Provider } from 'react-redux';
import Root from './components/Root';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}