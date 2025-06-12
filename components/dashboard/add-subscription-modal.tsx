"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useState } from "react";

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (subscription: NewSubscription) => void;
}

export interface NewSubscription {
  name: string;
  amount: number;
  frequency: 'monthly' | 'yearly';
  recipient?: string;
}

const frequencyOptions = [
    { key: 'monthly', label: 'Monthly' },
    { key: 'yearly', label: 'Yearly' }
];

export const AddSubscriptionModal: React.FC<AddSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<NewSubscription>({
    name: "",
    amount: 0,
    frequency: 'monthly',
    recipient: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof NewSubscription, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!formData.name || formData.amount <= 0) return;

    setIsLoading(true);
    try {
      await onSave(formData);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Failed to save subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      amount: 0,
      frequency: 'monthly',
      recipient: ""
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const isFormValid = () => {
    return formData.name.trim() !== "" && formData.amount > 0;
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      placement="center"
      backdrop="blur"
      size="lg"
      scrollBehavior="inside"
      classNames={{
        base: "mx-4 sm:mx-0",
        body: "py-4 sm:py-6",
        footer: "px-4 sm:px-6 py-3 sm:py-4"
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 px-4 sm:px-6 py-4 sm:py-6">
          <h3 className="text-lg sm:text-xl">Add New Subscription</h3>
          <p className="text-small text-default-500">
            Register a subscription service for automatic payments
          </p>
        </ModalHeader>
        <ModalBody className="gap-4 px-4 sm:px-6">
          <Input
            autoFocus
            label="Subscription Name"
            placeholder="Example: Netflix, Spotify Premium, Adobe Creative Cloud"
            value={formData.name}
            onValueChange={(value) => handleInputChange('name', value)}
            isRequired
          />

          <Input
            label="Payment Amount"
            placeholder="0.00"
            type="number"
            min="0"
            step="0.01"
            value={formData.amount.toString()}
            onValueChange={(value) => handleInputChange('amount', parseFloat(value) || 0)}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">USDC</span>
              </div>
            }
            isRequired
          />

          <Select
            label="Payment Frequency"
            placeholder="Select frequency"
            selectedKeys={[formData.frequency]}
            onSelectionChange={(keys) => {
              const frequency = Array.from(keys)[0] as 'monthly' | 'yearly';
              handleInputChange('frequency', frequency);
            }}
          >
            {frequencyOptions.map((option) => (
              <SelectItem key={option.key}>
                {option.label}
              </SelectItem>
            ))}
          </Select>

          <Input
            label="Recipient Address"
            placeholder="0x... (Optional - can be set later)"
            value={formData.recipient}
            onValueChange={(value) => handleInputChange('recipient', value)}
            description="Wallet address that will receive the payment"
          />

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
            <p className="text-small text-primary-600">
              💡 <strong>Info:</strong> The first payment will be made according to the selected frequency. 
              Make sure your vault balance is sufficient.
            </p>
          </div>
        </ModalBody>
        <ModalFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button 
            variant="flat" 
            onPress={handleClose}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button 
            color="primary"
            onPress={handleSave}
            isDisabled={!isFormValid()}
            isLoading={isLoading}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            Save Subscription
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
