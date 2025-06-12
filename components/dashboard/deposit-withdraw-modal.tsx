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
import { useState } from "react";

interface DepositWithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'deposit' | 'withdraw';
  currentBalance: number;
  currency: string;
  onConfirm: (amount: number) => void;
}

export const DepositWithdrawModal: React.FC<DepositWithdrawModalProps> = ({
  isOpen,
  onClose,
  type,
  currentBalance,
  currency,
  onConfirm
}) => {
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const isDeposit = type === 'deposit';
  const title = isDeposit ? 'Deposit Funds' : 'Withdraw Funds';
  const buttonText = isDeposit ? 'Confirm Deposit' : 'Confirm Withdrawal';
  const maxAmount = isDeposit ? undefined : currentBalance;

  const handleConfirm = async () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;
    
    if (!isDeposit && numAmount > currentBalance) return;

    setIsLoading(true);
    try {
      await onConfirm(numAmount);
      setAmount("");
      onClose();
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setAmount("");
    onClose();
  };

  const isValidAmount = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return false;
    if (!isDeposit && numAmount > currentBalance) return false;
    return true;
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      placement="center"
      backdrop="blur"
      classNames={{
        base: "mx-4 sm:mx-0",
        body: "py-4 sm:py-6",
        footer: "px-4 sm:px-6 py-3 sm:py-4"
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 px-4 sm:px-6 py-4 sm:py-6">
          <h3 className="text-lg sm:text-xl">{title}</h3>
          <p className="text-small text-default-500">
            Current balance: ${currentBalance.toFixed(2)} {currency}
          </p>
        </ModalHeader>
        <ModalBody className="px-4 sm:px-6">
          <Input
            autoFocus
            label="Amount"
            placeholder="0.00"
            value={amount}
            onValueChange={setAmount}
            type="number"
            min="0"
            max={maxAmount}
            step="0.01"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">{currency}</span>
              </div>
            }
            isInvalid={amount !== "" && !isValidAmount()}
            errorMessage={
              amount !== "" && !isValidAmount() 
                ? (!isDeposit && parseFloat(amount) > currentBalance 
                    ? "Amount exceeds available balance" 
                    : "Please enter a valid amount")
                : ""
            }
          />
          
          {isDeposit && (
            <div className="bg-warning-50 border border-warning-200 rounded-lg p-3">
              <p className="text-small text-warning-600">
                ⚠️ <strong>Important Warning:</strong> You may need to 'Approve' in MetaMask before you can deposit.
              </p>
            </div>
          )}

          {!isDeposit && (
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-3">
              <p className="text-small text-danger-600">
                🚨 <strong>Attention:</strong> Make sure you keep enough balance for automatic subscription payments.
              </p>
            </div>
          )}
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
            color={isDeposit ? "primary" : "warning"}
            onPress={handleConfirm}
            isDisabled={!isValidAmount()}
            isLoading={isLoading}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            {buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
