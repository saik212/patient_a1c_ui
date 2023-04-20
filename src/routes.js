import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/dashboard/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Dashboard from 'src/components/dashboard/Dashboard';
import Launcher from 'src/Launcher';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'app/dashboard', element: <Dashboard /> },
      { path: 'launch', element: <Launcher /> },
      { path: '*', element: <Navigate to="/app/dashboard" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'launch', element: <Launcher /> },
      { path: '/', element: <Navigate to="/launch" /> },
    ]
  }
];

export default routes;
