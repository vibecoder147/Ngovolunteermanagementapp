import { useState } from 'react';
import { CreditCard, RefreshCw, UserPlus, CheckCircle, Receipt, Shield } from 'lucide-react';
import { Modal, Card, SectionHeader, FormField, Input } from '../shared/UIComponents';

type PaymentType = 'renew' | 'new' | null;
type MembershipCategory = '80G' | 'non-80G';

const CURRENT_MEMBER = {
  name: 'Dr. Anjali Mehta',
  membershipType: '80G' as MembershipCategory,
  renewalDate: '2026-04-01',
  membershipId: 'MBR-2023-001',
};

const fees = {
  '80G': { renew: 5000, new: 7500 },
  'non-80G': { renew: 3000, new: 4500 },
};

export default function MemberPaymentsTab() {
  const [paymentType, setPaymentType] = useState<PaymentType>(null);
  const [membershipCategory, setMembershipCategory] = useState<MembershipCategory>('80G');
  const [paymentMode, setPaymentMode] = useState<'online' | 'cash' | 'cheque'>('online');
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({ upiId: '', txnId: '', chequeNo: '' });

  const amount = paymentType ? fees[membershipCategory][paymentType === 'renew' ? 'renew' : 'new'] : 0;

  const handlePayment = () => {
    setPaymentType(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <div>
      <SectionHeader
        title="Payments & Membership"
        subtitle="Manage your NGO membership and dues"
      />

      {/* Current Membership Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-blue-200" />
            <span className="text-blue-200 text-xs">{CURRENT_MEMBER.membershipType} Member</span>
          </div>
          <h3 className="text-white text-lg mb-1">{CURRENT_MEMBER.name}</h3>
          <p className="text-blue-200 text-sm">ID: {CURRENT_MEMBER.membershipId}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-blue-100 text-sm">Renewal Due:</span>
            <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-sm text-white">{CURRENT_MEMBER.renewalDate}</span>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      {showSuccess && (
        <div className="mb-5 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-xl flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">Payment submitted successfully!</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">Your payment will be verified and receipt will be generated.</p>
          </div>
        </div>
      )}

      {/* Payment Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer group" >
          <div className="flex items-start gap-4" onClick={() => setPaymentType('renew')}>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors shrink-0">
              <RefreshCw className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200">Renew Membership</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Annual renewal for existing members</p>
              <div className="mt-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                ₹{fees['80G'].renew.toLocaleString('en-IN')} / ₹{fees['non-80G'].renew.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">80G / Non-80G</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex items-start gap-4" onClick={() => setPaymentType('new')}>
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors shrink-0">
              <UserPlus className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200">New Membership</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Register as a new member</p>
              <div className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                ₹{fees['80G'].new.toLocaleString('en-IN')} / ₹{fees['non-80G'].new.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">80G / Non-80G</p>
            </div>
          </div>
        </Card>
      </div>

      {/* 80G Info */}
      <Card className="p-4">
        <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
          <Receipt className="w-4 h-4 text-purple-500" /> Membership Types
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <p className="text-sm font-semibold text-purple-800 dark:text-purple-300">80G Membership</p>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 leading-relaxed">
              Donations are eligible for tax exemption under Section 80G of the Income Tax Act.
            </p>
            <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 mt-2">Annual: ₹5,000</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Non-80G Membership</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Standard membership without tax exemption benefits.
            </p>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-2">Annual: ₹3,000</p>
          </div>
        </div>
      </Card>

      {/* Payment Modal */}
      {paymentType && (
        <Modal title={paymentType === 'renew' ? 'Renew Membership' : 'New Membership'} onClose={() => setPaymentType(null)}>
          <div className="space-y-4">
            <FormField label="Membership Category">
              <div className="grid grid-cols-2 gap-2">
                {(['80G', 'non-80G'] as MembershipCategory[]).map(type => (
                  <button
                    key={type}
                    onClick={() => setMembershipCategory(type)}
                    className={`py-3 rounded-xl border-2 text-sm font-medium transition-colors ${membershipCategory === type ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300'}`}
                  >
                    {type} Membership
                  </button>
                ))}
              </div>
            </FormField>

            {/* Amount */}
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Amount Payable</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">₹{amount.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{membershipCategory} · Annual Membership FY 2025-26</p>
            </div>

            {/* Payment Mode */}
            <FormField label="Payment Mode">
              <div className="grid grid-cols-3 gap-2">
                {(['online', 'cash', 'cheque'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setPaymentMode(mode)}
                    className={`py-2 rounded-xl border-2 text-xs font-medium capitalize transition-colors ${paymentMode === mode ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </FormField>

            {paymentMode === 'online' && (
              <div className="space-y-3">
                <FormField label="UPI ID">
                  <Input value={form.upiId} onChange={v => setForm(p => ({ ...p, upiId: v }))} placeholder="name@upi" />
                </FormField>
                <FormField label="Transaction ID">
                  <Input value={form.txnId} onChange={v => setForm(p => ({ ...p, txnId: v }))} placeholder="Transaction reference number" />
                </FormField>
              </div>
            )}
            {paymentMode === 'cheque' && (
              <FormField label="Cheque Number">
                <Input value={form.chequeNo} onChange={v => setForm(p => ({ ...p, chequeNo: v }))} placeholder="Enter cheque number" />
              </FormField>
            )}
            {paymentMode === 'cash' && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-xs text-emerald-700 dark:text-emerald-400">
                💵 Please visit the NGO office to pay cash. The admin will generate a receipt upon payment.
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={handlePayment}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
              >
                <CreditCard className="w-4 h-4" /> Proceed to Pay
              </button>
              <button
                onClick={() => setPaymentType(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
