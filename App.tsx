import React from 'react';
import { Provider } from 'react-redux';
import Root from './components/Root';
import store from './redux/store';
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Root />
      </Provider>
    </QueryClientProvider>
  );
}