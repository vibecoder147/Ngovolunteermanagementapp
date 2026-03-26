import { createBrowserRouter } from 'react-router';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SuperadminDashboard from './pages/SuperadminDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MemberDashboard from './pages/MemberDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';

export const router = createBrowserRouter([
  { path: '/', Component: LandingPage },
  { path: '/login', Component: LoginPage },
  { path: '/superadmin', Component: SuperadminDashboard },
  { path: '/admin', Component: AdminDashboard },
  { path: '/member', Component: MemberDashboard },
  { path: '/volunteer', Component: VolunteerDashboard },
  { path: '*', Component: LandingPage },
]);