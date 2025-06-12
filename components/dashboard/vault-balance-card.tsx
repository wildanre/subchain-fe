"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { title } from "@/components/primitives";

interface VaultBalanceCardProps {
  balance: number;
  currency: string;
  onDeposit: () => void;
  onWithdraw: () => void;
}

const WalletIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
    <path d="M12 2a10 10 0 1 0 10 10h-5a5 5 0 0 1-5-5V2z" fill="currentColor" fillOpacity="0.3"/>
  </svg>
);

export const VaultBalanceCard: React.FC<VaultBalanceCardProps> = ({
  balance,
  currency,
  onDeposit,
  onWithdraw
}) => {
  return (
    <Card className="w-full h-full bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-50/10 dark:to-secondary-50/10">
      <CardHeader className="flex gap-3 p-4 sm:p-6">
        <div className="flex items-center gap-2 w-full">
          <WalletIcon />
          <div className="flex flex-col flex-1 min-w-0">
            <p className="text-sm sm:text-md lg:text-lg font-semibold truncate">Your SubChain Vault Balance</p>
            <p className="text-xs sm:text-small text-default-500">Total available funds</p>
          </div>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody className="p-4 sm:p-6 flex-1 flex flex-col justify-center">
        <div className="flex flex-col items-center text-center py-4 sm:py-6">
          <h2 className={title({ size: "md", class: "text-primary mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl" })}>
            ${balance.toFixed(2)} {currency}
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md lg:max-w-lg xl:max-w-xl">
            <Button
              color="primary"
              variant="shadow"
              className="flex-1"
              size="lg"
              onPress={onDeposit}
            >
              Deposit Funds
            </Button>
            <Button
              color="secondary"
              variant="bordered"
              className="flex-1"
              size="lg"
              onPress={onWithdraw}
            >
              Withdraw Funds
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
