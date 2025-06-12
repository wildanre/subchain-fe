"use client";

import { useState } from "react";
import { title } from "@/components/primitives";
import {
  VaultBalanceCard,
  SubscriptionSummaryCard,
  SubscriptionTable,
  DepositWithdrawModal,
  AddSubscriptionModal,
  type Subscription,
  type NewSubscription
} from "@/components/dashboard";

// Mock data - in real app, this would come from API/blockchain
const mockSubscriptions: Subscription[] = [
  {
    id: 1,
    name: "Netflix Premium",
    amount: 15.99,
    currency: "USDC",
    frequency: 'monthly',
    nextPayment: new Date('2025-07-10'),
    isActive: true,
    recipient: "0x1234567890abcdef1234567890abcdef12345678"
  },
  {
    id: 2,
    name: "Spotify Premium",
    amount: 9.99,
    currency: "USDC",
    frequency: 'monthly',
    nextPayment: new Date('2025-07-15'),
    isActive: true,
    recipient: "0xabcdef1234567890abcdef1234567890abcdef12"
  },
  {
    id: 3,
    name: "Adobe Creative Cloud",
    amount: 52.99,
    currency: "USDC",
    frequency: 'monthly',
    nextPayment: new Date('2025-07-20'),
    isActive: false,
    recipient: "0x567890abcdef1234567890abcdef1234567890ab"
  }
];

export default function DashboardPage() {
  // State management
  const [vaultBalance, setVaultBalance] = useState(100.00);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isAddSubscriptionModalOpen, setIsAddSubscriptionModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'deposit' | 'withdraw'>('deposit');

  // Calculated values
  const activeSubscriptions = subscriptions.filter(sub => sub.isActive);
  const monthlyEstimate = activeSubscriptions.reduce((total, sub) => {
    const monthlyAmount = sub.frequency === 'yearly' ? sub.amount / 12 : sub.amount;
    return total + monthlyAmount;
  }, 0);

  // Event handlers
  const handleDeposit = () => {
    setModalType('deposit');
    setIsDepositModalOpen(true);
  };

  const handleWithdraw = () => {
    setModalType('withdraw');
    setIsWithdrawModalOpen(true);
  };

  const handleDepositConfirm = async (amount: number) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setVaultBalance(prev => prev + amount);
    console.log(`Deposited ${amount} USDC`);
  };

  const handleWithdrawConfirm = async (amount: number) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setVaultBalance(prev => prev - amount);
    console.log(`Withdrew ${amount} USDC`);
  };

  const handleAddSubscription = async (newSubscription: NewSubscription) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const subscription: Subscription = {
      id: Date.now(), // Simple ID generation
      ...newSubscription,
      currency: "USDC",
      nextPayment: new Date(Date.now() + (newSubscription.frequency === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000),
      isActive: true
    };
    
    setSubscriptions(prev => [...prev, subscription]);
    console.log(`Added subscription: ${newSubscription.name}`);
  };

  const handleToggleSubscription = (id: number) => {
    setSubscriptions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, isActive: !sub.isActive } : sub
      )
    );
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8 max-w-full lg:max-w-7xl">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className={title({ size: "md", class: "text-2xl sm:text-4xl lg:text-5xl" })}>Dashboard</h1>
        <p className="text-default-600 mt-2 text-sm sm:text-base lg:text-lg">
          Manage your vault balance and automatic subscriptions
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Vault Balance Card - Takes full width on mobile, 2 columns on desktop */}
        <div className="lg:col-span-2">
          <VaultBalanceCard
            balance={vaultBalance}
            currency="USDC"
            onDeposit={handleDeposit}
            onWithdraw={handleWithdraw}
          />
        </div>
        
        {/* Subscription Summary Card - Takes full width on mobile, 1 column on desktop */}
        <div className="lg:col-span-1">
          <SubscriptionSummaryCard
            totalActiveSubscriptions={activeSubscriptions.length}
            monthlyEstimate={monthlyEstimate}
            currency="USDC"
          />
        </div>
      </div>

      {/* Subscription Table */}
      <SubscriptionTable
        subscriptions={subscriptions}
        onAddNew={() => setIsAddSubscriptionModalOpen(true)}
        onToggleStatus={handleToggleSubscription}
      />

      {/* Modals */}
      <DepositWithdrawModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        type="deposit"
        currentBalance={vaultBalance}
        currency="USDC"
        onConfirm={handleDepositConfirm}
      />

      <DepositWithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        type="withdraw"
        currentBalance={vaultBalance}
        currency="USDC"
        onConfirm={handleWithdrawConfirm}
      />

      <AddSubscriptionModal
        isOpen={isAddSubscriptionModalOpen}
        onClose={() => setIsAddSubscriptionModalOpen(false)}
        onSave={handleAddSubscription}
      />
    </div>
  );
}
