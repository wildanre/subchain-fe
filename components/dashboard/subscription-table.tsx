"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@heroui/table";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";

export interface Subscription {
  id: number;
  name: string;
  amount: number;
  currency: string;
  frequency: 'monthly' | 'yearly';
  nextPayment: Date;
  isActive: boolean;
  recipient?: string;
}

interface SubscriptionTableProps {
  subscriptions: Subscription[];
  onAddNew: () => void;
  onToggleStatus: (id: number) => void;
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const getFrequencyText = (frequency: string): string => {
  return frequency === 'monthly' ? 'month' : 'year';
};

export const SubscriptionTable: React.FC<SubscriptionTableProps> = ({
  subscriptions,
  onAddNew,
  onToggleStatus
}) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 sm:p-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate">Subscription List</h3>
          <p className="text-xs sm:text-small text-default-500">Manage all your subscriptions</p>
        </div>
        <Button
          color="primary"
          variant="shadow"
          onPress={onAddNew}
          size="sm"
          className="self-start sm:self-auto whitespace-nowrap"
          startContent={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          }
        >
          <span className="hidden lg:inline">Add New Subscription</span>
          <span className="lg:hidden">Add New</span>
        </Button>
      </CardHeader>
      <Divider/>
      <CardBody className="p-0 sm:p-6">
        {subscriptions.length === 0 ? (
          <div className="text-center py-8 px-4">
            <p className="text-default-500 mb-4 text-sm sm:text-base">No subscriptions registered yet</p>
            <Button color="primary" onPress={onAddNew} size="sm">
              Add First Subscription
            </Button>
          </div>
        ) : (
          <div className="overflow-hidden">
            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-3 p-4">
              {subscriptions.map((subscription) => (
                <Card key={subscription.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{subscription.name}</h4>
                      {subscription.recipient && (
                        <p className="text-xs text-default-400">
                          {subscription.recipient.slice(0, 6)}...
                        </p>
                      )}
                    </div>
                    <Chip
                      color={subscription.isActive ? "success" : "default"}
                      variant="flat"
                      size="sm"
                    >
                      <span className="text-xs">{subscription.isActive ? "Active" : "Inactive"}</span>
                    </Chip>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-sm font-medium">
                        ${subscription.amount.toFixed(2)} / {getFrequencyText(subscription.frequency)}
                      </p>
                      <p className="text-xs text-default-500">
                        Next: {formatDate(subscription.nextPayment)}
                      </p>
                    </div>
                    <Button
                      color={subscription.isActive ? "warning" : "success"}
                      variant="light"
                      size="sm"
                      onPress={() => onToggleStatus(subscription.id)}
                      className="text-xs"
                    >
                      {subscription.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block">
              <div className="overflow-x-auto">
                <Table aria-label="Subscription table" className="min-w-full">
                  <TableHeader>
                    <TableColumn className="text-xs sm:text-sm min-w-[200px]">SUBSCRIPTION NAME</TableColumn>
                    <TableColumn className="text-xs sm:text-sm min-w-[120px]">AMOUNT</TableColumn>
                    <TableColumn className="text-xs sm:text-sm min-w-[150px]">NEXT PAYMENT</TableColumn>
                    <TableColumn className="text-xs sm:text-sm min-w-[100px]">STATUS</TableColumn>
                    <TableColumn className="text-xs sm:text-sm min-w-[120px]">ACTION</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell className="min-w-[200px]">
                          <div className="flex flex-col">
                            <p className="text-bold text-sm font-medium">{subscription.name}</p>
                            {subscription.recipient && (
                              <p className="text-tiny text-default-400">
                                {subscription.recipient.slice(0, 6)}...{subscription.recipient.slice(-4)}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[120px]">
                          <div className="flex flex-col">
                            <span className="text-bold text-sm font-medium">
                              ${subscription.amount.toFixed(2)}
                            </span>
                            <span className="text-tiny text-default-400">
                              / {getFrequencyText(subscription.frequency)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[150px]">
                          <p className="text-sm">{formatDate(subscription.nextPayment)}</p>
                        </TableCell>
                        <TableCell className="min-w-[100px]">
                          <Chip
                            color={subscription.isActive ? "success" : "default"}
                            variant="flat"
                            size="sm"
                          >
                            <span className="text-xs">{subscription.isActive ? "Active" : "Inactive"}</span>
                          </Chip>
                        </TableCell>
                        <TableCell className="min-w-[120px]">
                          <Button
                            color={subscription.isActive ? "warning" : "success"}
                            variant="light"
                            size="sm"
                            onPress={() => onToggleStatus(subscription.id)}
                            className="text-xs"
                          >
                            {subscription.isActive ? "Deactivate" : "Activate"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
