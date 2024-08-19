import { StrictMode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <PersistGate persistor={persistor}>
              <App />
            </PersistGate>
          </Router>
        </QueryClientProvider>
      </ChakraProvider>
    </Provider>
  </StrictMode>,
);
