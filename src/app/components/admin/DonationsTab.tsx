import { useState } from 'react';
import { DollarSign, Receipt, TrendingUp, Search, CheckCircle, Printer, Filter } from 'lucide-react';
import { donations as initialDonations, monthlyDonations, Donation } from '../../data/mockData';
import { Modal, Badge, PrimaryButton, Card, SectionHeader, FormField, Input, Select } from '../shared/UIComponents';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Props { isSuperAdmin: boolean; }

export default function DonationsTab({ isSuperAdmin }: Props) {
  const [donations, setDonations] = useState<Donation[]>(initialDonations);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showReceipt, setShowReceipt] = useState<Donation | null>(null);
  const [showAddDonation, setShowAddDonation] = useState(false);
  const [form, setForm] = useState({ donorName: '', amount: '', type: 'cash' as 'cash' | 'online' | 'cheque', purpose: '', is80G: false });

  const filtered = donations.filter(d => {
    const matchSearch = d.donorName.toLowerCase().includes(search.toLowerCase()) || d.purpose.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || d.type === filterType;
    return matchSearch && matchType;
  });

  const totalAmount = donations.reduce((s, d) => s + d.amount, 0);
  const cashTotal = donations.filter(d => d.type === 'cash').reduce((s, d) => s + d.amount, 0);
  const onlineTotal = donations.filter(d => d.type === 'online').reduce((s, d) => s + d.amount, 0);
  const pendingReceipts = donations.filter(d => !d.receiptGenerated).length;

  const formatAmount = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  const generateReceipt = (donation: Donation) => {
    const receiptNum = `RCP-2025-${String(donations.length + 1).padStart(3, '0')}`;
    setDonations(prev => prev.map(d => d.id === donation.id ? { ...d, receiptGenerated: true, receiptNumber: receiptNum } : d));
    setShowReceipt({ ...donation, receiptGenerated: true, receiptNumber: receiptNum });
  };

  const handleAddDonation = () => {
    if (!form.donorName || !form.amount) return;
    const newD: Donation = {
      id: Date.now(), donorName: form.donorName, amount: parseInt(form.amount),
      date: new Date().toISOString().split('T')[0], type: form.type,
      receiptGenerated: false, purpose: form.purpose, is80G: form.is80G
    };
    setDonations(prev => [...prev, newD]);
    setForm({ donorName: '', amount: '', type: 'cash', purpose: '', is80G: false });
    setShowAddDonation(false);
  };

  const typeColors: Record<string, string> = {
    cash: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    online: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    cheque: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  };

  return (
    <div>
      <SectionHeader
        title="Donations"
        subtitle="Track and manage all donations"
        actions={
          <PrimaryButton onClick={() => setShowAddDonation(true)}>
            <DollarSign className="w-4 h-4" /> Record Donation
          </PrimaryButton>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Received', value: formatAmount(totalAmount), icon: <DollarSign className="w-5 h-5" />, color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
          { label: 'Cash Donations', value: formatAmount(cashTotal), icon: <TrendingUp className="w-5 h-5" />, color: 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' },
          { label: 'Online/Cheque', value: formatAmount(onlineTotal + donations.filter(d => d.type === 'cheque').reduce((s, d) => s + d.amount, 0)), icon: <CheckCircle className="w-5 h-5" />, color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
          { label: 'Receipts Pending', value: pendingReceipts, icon: <Receipt className="w-5 h-5" />, color: 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
        ].map(s => (
          <Card key={s.label} className="p-4">
            <div className={`inline-flex p-2 rounded-lg ${s.color} mb-2`}>{s.icon}</div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{s.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="p-4 mb-6">
        <h3 className="text-slate-800 dark:text-slate-200 mb-4 text-sm font-medium">Monthly Donation Trend</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={monthlyDonations} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, 'Amount']} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
            <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Table */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search donor or purpose..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <select value={filterType} onChange={e => setFilterType(e.target.value)}
          className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-200 focus:outline-none">
          <option value="all">All Types</option>
          <option value="cash">Cash</option>
          <option value="online">Online</option>
          <option value="cheque">Cheque</option>
        </select>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50">
                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 px-4 py-3">Donor</th>
                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 px-4 py-3">Amount</th>
                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 px-4 py-3 hidden sm:table-cell">Purpose</th>
                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 px-4 py-3">Type</th>
                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 px-4 py-3 hidden md:table-cell">Date</th>
                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 px-4 py-3">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filtered.map(d => (
                <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{d.donorName}</p>
                      {d.is80G && <span className="text-xs text-purple-600 dark:text-purple-400">80G</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">{formatAmount(d.amount)}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 hidden sm:table-cell">{d.purpose}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${typeColors[d.type]}`}>{d.type}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 hidden md:table-cell">{d.date}</td>
                  <td className="px-4 py-3">
                    {d.receiptGenerated ? (
                      <button onClick={() => setShowReceipt(d)}
                        className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 hover:underline">
                        <Receipt className="w-3 h-3" />{d.receiptNumber}
                      </button>
                    ) : (
                      <button onClick={() => generateReceipt(d)}
                        className="flex items-center gap-1 text-xs bg-blue-600 text-white px-2.5 py-1 rounded-md hover:bg-blue-700 transition-colors">
                        <Printer className="w-3 h-3" /> Generate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Receipt Modal */}
      {showReceipt && (
        <Modal title="Donation Receipt" onClose={() => setShowReceipt(null)}>
          <div className="space-y-4">
            <div className="text-center border-b border-slate-200 dark:border-slate-700 pb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Receipt className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-slate-900 dark:text-white">HopeConnect NGO</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Official Donation Receipt</p>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">{showReceipt.receiptNumber}</p>
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'Donor Name', value: showReceipt.donorName },
                { label: 'Amount', value: formatAmount(showReceipt.amount) },
                { label: 'Date', value: showReceipt.date },
                { label: 'Payment Mode', value: showReceipt.type.toUpperCase() },
                { label: 'Purpose', value: showReceipt.purpose },
                { label: '80G Eligible', value: showReceipt.is80G ? 'Yes' : 'No' },
              ].map(r => (
                <div key={r.label} className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-sm text-slate-500 dark:text-slate-400">{r.label}</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{r.value}</span>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-xs text-blue-700 dark:text-blue-300 text-center">
              This is an official receipt from HopeConnect NGO (Reg. No. MH-12345/2020)
            </div>
            <PrimaryButton className="w-full justify-center">
              <Printer className="w-4 h-4" /> Print Receipt
            </PrimaryButton>
          </div>
        </Modal>
      )}

      {/* Add Donation Modal */}
      {showAddDonation && (
        <Modal title="Record New Donation" onClose={() => setShowAddDonation(false)}>
          <div className="space-y-3">
            <FormField label="Donor Name *"><Input value={form.donorName} onChange={v => setForm(p => ({ ...p, donorName: v }))} placeholder="Full name or organization" /></FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Amount (₹) *"><Input value={form.amount} onChange={v => setForm(p => ({ ...p, amount: v }))} placeholder="0" type="number" /></FormField>
              <FormField label="Payment Mode">
                <Select value={form.type} onChange={v => setForm(p => ({ ...p, type: v as 'cash' | 'online' | 'cheque' }))} options={[
                  { label: 'Cash', value: 'cash' }, { label: 'Online', value: 'online' }, { label: 'Cheque', value: 'cheque' }
                ]} />
              </FormField>
            </div>
            <FormField label="Purpose"><Input value={form.purpose} onChange={v => setForm(p => ({ ...p, purpose: v }))} placeholder="e.g. Food Drive, Medical Camp" /></FormField>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is80G} onChange={e => setForm(p => ({ ...p, is80G: e.target.checked }))} className="w-4 h-4 rounded accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-300">80G Eligible Donation</span>
            </label>
            <div className="flex gap-2 pt-2">
              <PrimaryButton onClick={handleAddDonation} className="flex-1 justify-center">Record Donation</PrimaryButton>
              <button onClick={() => setShowAddDonation(false)} className="flex-1 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
