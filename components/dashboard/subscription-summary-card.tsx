"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";

interface SubscriptionSummaryCardProps {
  totalActiveSubscriptions: number;
  monthlyEstimate: number;
  currency: string;
}

const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-success">
    <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 9l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SubscriptionSummaryCard: React.FC<SubscriptionSummaryCardProps> = ({
  totalActiveSubscriptions,
  monthlyEstimate,
  currency
}) => {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex gap-3 p-4 sm:p-6">
        <div className="flex items-center gap-2 w-full">
          <ChartIcon />
          <div className="flex flex-col flex-1 min-w-0">
            <p className="text-sm sm:text-md lg:text-lg font-semibold truncate">Subscription Summary</p>
            <p className="text-xs sm:text-small text-default-500">Active subscriptions overview</p>
          </div>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody className="py-4 sm:py-6 px-4 sm:px-6 flex-1 flex flex-col justify-center">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2">
            <span className="text-default-600 text-sm sm:text-base">Total Active Subscriptions:</span>
            <Chip color="success" variant="flat" size="lg" className="self-start lg:self-auto">
              {totalActiveSubscriptions}
            </Chip>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2">
            <span className="text-default-600 text-sm sm:text-base">Monthly Estimated Spending:</span>
            <div className="text-left lg:text-right">
              <p className="text-lg lg:text-xl font-semibold text-primary">
                ${monthlyEstimate.toFixed(2)}
              </p>
              <p className="text-small text-default-500">{currency}</p>
            </div>
          </div>

          <div className="bg-default-100 rounded-lg p-3 lg:p-4">
            <p className="text-xs sm:text-small text-default-600">
              💡 Tip: Make sure your vault balance is sufficient for next month's automatic payments
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
