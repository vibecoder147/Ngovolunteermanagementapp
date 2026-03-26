import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Layout, adminNavItems } from '../components/layout/Layout';
import AdminOverviewTab from '../components/admin/AdminOverviewTab';
import VolunteersTab from '../components/admin/VolunteersTab';
import MembersTab from '../components/admin/MembersTab';
import DonationsTab from '../components/admin/DonationsTab';
import DocumentationTab from '../components/admin/DocumentationTab';
import JoiningLetterTab from '../components/admin/JoiningLetterTab';
import RequestsTab from '../components/admin/RequestsTab';

export default function AdminDashboard() {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!currentUser) navigate('/');
  }, [currentUser, navigate]);

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':       return <AdminOverviewTab isSuperAdmin={false} />;
      case 'volunteers':     return <VolunteersTab isSuperAdmin={false} />;
      case 'members':        return <MembersTab isSuperAdmin={false} />;
      case 'donations':      return <DonationsTab isSuperAdmin={false} />;
      case 'documentation':  return <DocumentationTab />;
      case 'joining-letters':return <JoiningLetterTab isSuperAdmin={false} />;
      case 'requests':       return <RequestsTab isSuperAdmin={false} />;
      default:               return <AdminOverviewTab isSuperAdmin={false} />;
    }
  };

  return (
    <Layout navItems={adminNavItems} activeTab={activeTab} onTabChange={setActiveTab} notifications={2}>
      {renderTab()}
    </Layout>
  );
}
