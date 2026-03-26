import { AppProvider } from './context/AppContext';
import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
