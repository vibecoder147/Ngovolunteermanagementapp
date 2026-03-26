import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Layout, memberNavItems } from '../components/layout/Layout';
import MemberTasksTab from '../components/member/MemberTasksTab';
import MemberMeetingsTab from '../components/member/MemberMeetingsTab';
import HospitalMouTab from '../components/member/HospitalMouTab';
import MemberCertificateTab from '../components/member/MemberCertificateTab';
import MemberPaymentsTab from '../components/member/MemberPaymentsTab';

export default function MemberDashboard() {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tasks');

  useEffect(() => {
    if (!currentUser) navigate('/');
  }, [currentUser, navigate]);

  const renderTab = () => {
    switch (activeTab) {
      case 'tasks':        return <MemberTasksTab />;
      case 'meetings':     return <MemberMeetingsTab />;
      case 'hospital-mou': return <HospitalMouTab />;
      case 'certificate':  return <MemberCertificateTab />;
      case 'payments':     return <MemberPaymentsTab />;
      default:             return <MemberTasksTab />;
    }
  };

  return (
    <Layout navItems={memberNavItems} activeTab={activeTab} onTabChange={setActiveTab} notifications={1}>
      {renderTab()}
    </Layout>
  );
}
