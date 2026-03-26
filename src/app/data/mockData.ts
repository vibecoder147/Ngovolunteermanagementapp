export interface Volunteer {
  id: number; name: string; email: string; phone: string; address: string;
  joinDate: string; status: 'active' | 'inactive'; assignedAdmin: string;
  tasks: number[]; tenure: string; skills: string[]; avatar: string;
}
export interface Member {
  id: number; name: string; email: string; phone: string; address: string;
  joinDate: string; renewalDate: string; status: 'active' | 'inactive';
  membershipType: '80G' | 'non-80G'; tasks: number[]; avatar: string; isPaid: boolean;
}
export interface Task {
  id: number; title: string; description: string; deadline: string;
  assignedToId: number; assignedToName: string; assignedToType: 'volunteer' | 'member';
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  requiresUpload: boolean; uploadedImage?: string; submittedAt?: string; createdAt: string;
}
export interface Donation {
  id: number; donorName: string; amount: number; date: string;
  type: 'cash' | 'online' | 'cheque'; receiptGenerated: boolean;
  receiptNumber?: string; purpose: string; is80G: boolean;
}
export interface Document {
  id: number; title: string; category: string; uploadDate: string;
  fileType: 'PDF' | 'DOC' | 'XLSX' | 'JPG'; size: string;
}
export interface JoiningLetterRequest {
  id: number; name: string; type: 'volunteer' | 'member' | 'new-member';
  requestDate: string; status: 'pending' | 'approved' | 'rejected';
  tenure: string; generatedBy?: string; isNewMember?: boolean;
}
export interface GeneralRequest {
  id: number; requestType: 'joining-letter' | 'certificate' | 'medical-mou';
  requesterName: string; requesterType: 'volunteer' | 'member';
  requestDate: string; status: 'pending' | 'approved' | 'rejected'; details: string;
}
export interface Meeting {
  id: number; title: string; date: string; time: string;
  attendees: string[]; summary?: string; status: 'upcoming' | 'completed'; addedBy?: string;
}
export interface MouRequest {
  id: number; patientName: string; patientAge: number; disease: string;
  hospital: string; requestDate: string; status: 'pending' | 'approved' | 'rejected';
  requesterName: string; phone: string; address: string; bloodGroup: string;
}

export const volunteers: Volunteer[] = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul.sharma@email.com', phone: '9876543210', address: 'Andheri, Mumbai', joinDate: '2024-01-15', status: 'active', assignedAdmin: 'Priya Sharma', tasks: [1, 2], tenure: 'Jan 2024 - Dec 2024', skills: ['Teaching', 'Event Management'], avatar: 'RS' },
  { id: 2, name: 'Priya Patel', email: 'priya.patel@email.com', phone: '9765432109', address: 'Bandra, Mumbai', joinDate: '2024-02-20', status: 'active', assignedAdmin: 'Arjun Kapoor', tasks: [3], tenure: 'Feb 2024 - Jan 2025', skills: ['Healthcare', 'Counselling'], avatar: 'PP' },
  { id: 3, name: 'Amit Kumar', email: 'amit.kumar@email.com', phone: '9654321098', address: 'Pune, Maharashtra', joinDate: '2023-11-10', status: 'active', assignedAdmin: 'Priya Sharma', tasks: [4, 5], tenure: 'Nov 2023 - Oct 2024', skills: ['Photography', 'Social Media'], avatar: 'AK' },
  { id: 4, name: 'Sneha Reddy', email: 'sneha.reddy@email.com', phone: '9543210987', address: 'Thane, Mumbai', joinDate: '2024-03-05', status: 'inactive', assignedAdmin: 'Arjun Kapoor', tasks: [], tenure: 'Mar 2024 - Feb 2025', skills: ['Cooking', 'Teaching'], avatar: 'SR' },
  { id: 5, name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '9432109876', address: 'Navi Mumbai', joinDate: '2024-01-01', status: 'active', assignedAdmin: 'Priya Sharma', tasks: [6], tenure: 'Jan 2024 - Dec 2024', skills: ['Legal Aid', 'Documentation'], avatar: 'VS' },
];

export const members: Member[] = [
  { id: 1, name: 'Dr. Anjali Mehta', email: 'anjali.mehta@email.com', phone: '9321098765', address: 'Colaba, Mumbai', joinDate: '2023-04-01', renewalDate: '2025-04-01', status: 'active', membershipType: '80G', tasks: [7, 8], avatar: 'AM', isPaid: true },
  { id: 2, name: 'Suresh Nair', email: 'suresh.nair@email.com', phone: '9210987654', address: 'Fort, Mumbai', joinDate: '2022-07-15', renewalDate: '2025-07-15', status: 'active', membershipType: 'non-80G', tasks: [9], avatar: 'SN', isPaid: true },
  { id: 3, name: 'Kavita Desai', email: 'kavita.desai@email.com', phone: '9109876543', address: 'Dadar, Mumbai', joinDate: '2024-01-01', renewalDate: '2025-01-01', status: 'active', membershipType: '80G', tasks: [10], avatar: 'KD', isPaid: false },
  { id: 4, name: 'Mohan Verma', email: 'mohan.verma@email.com', phone: '9098765432', address: 'Worli, Mumbai', joinDate: '2023-09-10', renewalDate: '2024-09-10', status: 'inactive', membershipType: 'non-80G', tasks: [], avatar: 'MV', isPaid: true },
  { id: 5, name: 'Lakshmi Iyer', email: 'lakshmi.iyer@email.com', phone: '8987654321', address: 'Chembur, Mumbai', joinDate: '2024-02-14', renewalDate: '2025-02-14', status: 'active', membershipType: '80G', tasks: [11], avatar: 'LI', isPaid: true },
];

export const tasks: Task[] = [
  { id: 1, title: 'Community Food Drive - Photo Doc', description: 'Organize and document the community food drive. Upload clear photos of the event and beneficiaries.', deadline: '2025-03-15', assignedToId: 1, assignedToName: 'Rahul Sharma', assignedToType: 'volunteer', status: 'submitted', requiresUpload: true, uploadedImage: 'uploaded', submittedAt: '2025-03-10', createdAt: '2025-03-01' },
  { id: 2, title: 'Youth Workshop Coordination', description: 'Coordinate the youth empowerment workshop including attendance management and logistics.', deadline: '2025-03-25', assignedToId: 1, assignedToName: 'Rahul Sharma', assignedToType: 'volunteer', status: 'pending', requiresUpload: false, createdAt: '2025-03-01' },
  { id: 3, title: 'Health Camp Assistance', description: 'Assist medical team during the free health camp in Dharavi. Document proceedings with photos.', deadline: '2025-03-20', assignedToId: 2, assignedToName: 'Priya Patel', assignedToType: 'volunteer', status: 'approved', requiresUpload: true, uploadedImage: 'uploaded', submittedAt: '2025-03-15', createdAt: '2025-03-05' },
  { id: 4, title: 'Tree Plantation Drive', description: 'Photograph the tree plantation drive at Sanjay Gandhi National Park. Document all 200 saplings.', deadline: '2025-04-01', assignedToId: 3, assignedToName: 'Amit Kumar', assignedToType: 'volunteer', status: 'pending', requiresUpload: true, createdAt: '2025-03-10' },
  { id: 5, title: 'Social Media Content Creation', description: 'Create weekly social media content for the NGO Instagram and Facebook pages for March.', deadline: '2025-03-31', assignedToId: 3, assignedToName: 'Amit Kumar', assignedToType: 'volunteer', status: 'rejected', requiresUpload: false, createdAt: '2025-03-01' },
  { id: 6, title: 'Legal Documentation Review', description: 'Review and organize all legal documents for the upcoming court hearing on land dispute.', deadline: '2025-03-28', assignedToId: 5, assignedToName: 'Vikram Singh', assignedToType: 'volunteer', status: 'pending', requiresUpload: false, createdAt: '2025-03-05' },
  { id: 7, title: 'Fundraising Gala Organization', description: 'Lead the fundraising gala committee and coordinate with vendors for the annual event.', deadline: '2025-04-15', assignedToId: 1, assignedToName: 'Dr. Anjali Mehta', assignedToType: 'member', status: 'pending', requiresUpload: false, createdAt: '2025-03-01' },
  { id: 8, title: 'Medical Supplies Procurement', description: 'Identify and procure medical supplies for the upcoming health camp. Upload invoice photos.', deadline: '2025-03-22', assignedToId: 1, assignedToName: 'Dr. Anjali Mehta', assignedToType: 'member', status: 'submitted', requiresUpload: true, uploadedImage: 'uploaded', submittedAt: '2025-03-18', createdAt: '2025-03-01' },
  { id: 9, title: 'Annual Report Preparation', description: 'Compile and prepare the annual stakeholder report with financial summaries and impact stories.', deadline: '2025-04-30', assignedToId: 2, assignedToName: 'Suresh Nair', assignedToType: 'member', status: 'pending', requiresUpload: false, createdAt: '2025-03-10' },
  { id: 10, title: 'Donor Communication Campaign', description: 'Design and execute a comprehensive donor thank-you campaign for FY 2024-25.', deadline: '2025-03-25', assignedToId: 3, assignedToName: 'Kavita Desai', assignedToType: 'member', status: 'approved', requiresUpload: false, createdAt: '2025-03-01' },
  { id: 11, title: 'CSR Partnership Presentation', description: 'Prepare and deliver a presentation for the CSR partnership meeting with TechCorp India.', deadline: '2025-04-05', assignedToId: 5, assignedToName: 'Lakshmi Iyer', assignedToType: 'member', status: 'pending', requiresUpload: false, createdAt: '2025-03-10' },
];

export const donations: Donation[] = [
  { id: 1, donorName: 'TechCorp India Ltd', amount: 500000, date: '2025-02-15', type: 'online', receiptGenerated: true, receiptNumber: 'RCP-2025-001', purpose: 'Annual CSR Contribution', is80G: true },
  { id: 2, donorName: 'Ramesh Gupta', amount: 25000, date: '2025-03-01', type: 'cash', receiptGenerated: false, purpose: 'Food Drive', is80G: false },
  { id: 3, donorName: 'Sunrise Foundation', amount: 150000, date: '2025-02-20', type: 'cheque', receiptGenerated: true, receiptNumber: 'RCP-2025-002', purpose: 'Medical Camp', is80G: true },
  { id: 4, donorName: 'Mrs. Kamla Joshi', amount: 10000, date: '2025-03-05', type: 'cash', receiptGenerated: true, receiptNumber: 'RCP-2025-003', purpose: 'General Fund', is80G: true },
  { id: 5, donorName: 'Anonymous', amount: 5000, date: '2025-03-10', type: 'online', receiptGenerated: false, purpose: 'Education', is80G: false },
  { id: 6, donorName: 'MNO Enterprises', amount: 200000, date: '2025-01-28', type: 'cheque', receiptGenerated: true, receiptNumber: 'RCP-2025-004', purpose: 'Infrastructure', is80G: true },
  { id: 7, donorName: 'Pradeep Shah', amount: 15000, date: '2025-03-12', type: 'cash', receiptGenerated: false, purpose: 'Scholarship Fund', is80G: false },
];

export const documents: Document[] = [
  { id: 1, title: 'NGO Registration Certificate', category: 'Legal', uploadDate: '2023-01-15', fileType: 'PDF', size: '2.3 MB' },
  { id: 2, title: '12A Tax Exemption Certificate', category: 'Tax', uploadDate: '2023-02-10', fileType: 'PDF', size: '1.8 MB' },
  { id: 3, title: '80G Certificate', category: 'Tax', uploadDate: '2023-02-10', fileType: 'PDF', size: '1.5 MB' },
  { id: 4, title: 'FCRA Registration', category: 'Legal', uploadDate: '2023-03-20', fileType: 'PDF', size: '3.2 MB' },
  { id: 5, title: 'Annual Report 2023-24', category: 'Reports', uploadDate: '2024-06-30', fileType: 'PDF', size: '8.5 MB' },
  { id: 6, title: 'Audited Financial Statements 2023-24', category: 'Financial', uploadDate: '2024-07-15', fileType: 'PDF', size: '4.1 MB' },
  { id: 7, title: 'Board Resolution - March 2025', category: 'Governance', uploadDate: '2025-03-01', fileType: 'DOC', size: '0.8 MB' },
  { id: 8, title: 'Staff List & Contact Directory', category: 'HR', uploadDate: '2025-01-10', fileType: 'XLSX', size: '0.5 MB' },
  { id: 9, title: 'MOU with City Hospital', category: 'Partnerships', uploadDate: '2024-11-20', fileType: 'PDF', size: '2.0 MB' },
  { id: 10, title: 'Project Proposal - Education 2025', category: 'Projects', uploadDate: '2025-02-14', fileType: 'DOC', size: '1.2 MB' },
  { id: 11, title: 'Volunteer Handbook 2024', category: 'HR', uploadDate: '2024-09-01', fileType: 'PDF', size: '3.4 MB' },
  { id: 12, title: 'Donor List 2024-25', category: 'Financial', uploadDate: '2025-03-01', fileType: 'XLSX', size: '0.9 MB' },
];

export const joiningLetterRequests: JoiningLetterRequest[] = [
  { id: 1, name: 'Rahul Sharma', type: 'volunteer', requestDate: '2025-03-01', status: 'approved', tenure: 'Jan 2025 - Dec 2025', generatedBy: 'Priya Sharma' },
  { id: 2, name: 'Priya Patel', type: 'volunteer', requestDate: '2025-03-05', status: 'pending', tenure: 'Mar 2025 - Feb 2026' },
  { id: 3, name: 'Dr. Anjali Mehta', type: 'member', requestDate: '2025-02-20', status: 'approved', tenure: 'FY 2025-26', generatedBy: 'Arjun Kapoor' },
  { id: 4, name: 'Neha Joshi', type: 'new-member', requestDate: '2025-03-10', status: 'pending', tenure: 'FY 2025-26', isNewMember: true },
  { id: 5, name: 'Rohan Gupta', type: 'new-member', requestDate: '2025-03-08', status: 'approved', tenure: 'FY 2025-26', isNewMember: true, generatedBy: 'Priya Sharma' },
  { id: 6, name: 'Amit Kumar', type: 'volunteer', requestDate: '2025-03-12', status: 'pending', tenure: 'Apr 2025 - Mar 2026' },
];

export const generalRequests: GeneralRequest[] = [
  { id: 1, requestType: 'joining-letter', requesterName: 'Rahul Sharma', requesterType: 'volunteer', requestDate: '2025-03-01', status: 'approved', details: 'Monthly tenure Jan-Dec 2025' },
  { id: 2, requestType: 'certificate', requesterName: 'Priya Patel', requesterType: 'volunteer', requestDate: '2025-03-05', status: 'pending', details: 'Certificate of completion for Health Camp project' },
  { id: 3, requestType: 'medical-mou', requesterName: 'Dr. Anjali Mehta', requesterType: 'member', requestDate: '2025-03-08', status: 'pending', details: 'MOU request for City General Hospital - Patient: Ram Kumar, Age 45, Cardiac Surgery' },
  { id: 4, requestType: 'certificate', requesterName: 'Amit Kumar', requesterType: 'volunteer', requestDate: '2025-02-28', status: 'rejected', details: 'Certificate for Tree Plantation Drive' },
  { id: 5, requestType: 'joining-letter', requesterName: 'Sneha Reddy', requesterType: 'volunteer', requestDate: '2025-03-10', status: 'pending', details: 'Monthly tenure Mar 2025 - Feb 2026' },
  { id: 6, requestType: 'medical-mou', requesterName: 'Kavita Desai', requesterType: 'member', requestDate: '2025-03-12', status: 'approved', details: 'MOU for Lifeline Hospital - Patient: Sunita Devi, Age 62, Kidney Dialysis' },
];

export const meetings: Meeting[] = [
  { id: 1, title: 'Monthly Board Meeting', date: '2025-03-15', time: '11:00 AM', attendees: ['Dr. Anjali Mehta', 'Suresh Nair', 'Kavita Desai', 'Lakshmi Iyer'], summary: 'Reviewed Q4 financials. Approved new volunteer intake. Budget allocation for health camp ₹2L approved.', status: 'completed', addedBy: 'Dr. Anjali Mehta' },
  { id: 2, title: 'Fundraising Committee Meeting', date: '2025-03-20', time: '3:00 PM', attendees: ['Dr. Anjali Mehta', 'Suresh Nair', 'Mohan Verma'], status: 'upcoming' },
  { id: 3, title: 'Volunteer Orientation Q1', date: '2025-03-12', time: '10:00 AM', attendees: ['Rahul Sharma', 'Priya Patel', 'Vikram Singh'], summary: 'New volunteers welcomed. NGO policies explained. Task assignments discussed. Safety protocols reviewed.', status: 'completed', addedBy: 'Suresh Nair' },
  { id: 4, title: 'Health Camp Planning', date: '2025-04-02', time: '2:00 PM', attendees: ['Dr. Anjali Mehta', 'Priya Patel', 'Kavita Desai'], status: 'upcoming' },
  { id: 5, title: 'Annual General Meeting', date: '2025-04-30', time: '10:00 AM', attendees: ['All Members', 'Board of Directors'], status: 'upcoming' },
];

export const mouRequests: MouRequest[] = [
  { id: 1, patientName: 'Ram Kumar', patientAge: 45, disease: 'Cardiac Surgery', hospital: 'City General Hospital', requestDate: '2025-03-08', status: 'pending', requesterName: 'Dr. Anjali Mehta', phone: '9876543210', address: 'Dharavi, Mumbai', bloodGroup: 'B+' },
  { id: 2, patientName: 'Sunita Devi', patientAge: 62, disease: 'Kidney Dialysis', hospital: 'Lifeline Hospital', requestDate: '2025-03-12', status: 'approved', requesterName: 'Kavita Desai', phone: '9765432109', address: 'Govandi, Mumbai', bloodGroup: 'O+' },
  { id: 3, patientName: 'Vikrant Rao', patientAge: 8, disease: 'Bone Marrow Transplant', hospital: 'Rainbow Children Hospital', requestDate: '2025-02-25', status: 'pending', requesterName: 'Dr. Anjali Mehta', phone: '9654321098', address: 'Mankhurd, Mumbai', bloodGroup: 'A-' },
];

export const monthlyDonations = [
  { month: 'Oct', amount: 85000 },
  { month: 'Nov', amount: 120000 },
  { month: 'Dec', amount: 210000 },
  { month: 'Jan', amount: 145000 },
  { month: 'Feb', amount: 180000 },
  { month: 'Mar', amount: 905000 },
];
