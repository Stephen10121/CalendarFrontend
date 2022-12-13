import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import Root from './components/Root';

export default function App() {
  return (
    <Provider store={Store}>
      <Root />
    </Provider>
  );
}