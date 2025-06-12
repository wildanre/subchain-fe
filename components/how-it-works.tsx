import React from "react";
import { Button } from "@heroui/button";
import { title, subtitle } from "@/components/primitives";
import { WalletIcon, SubscriptionIcon, AutoPayIcon, ArrowIcon } from "@/components/home-icons";

interface StepData {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType;
  colorTheme: 'primary' | 'secondary' | 'success';
}

const stepsData: StepData[] = [
  {
    id: 1,
    title: "Deposit Funds",
    description: "Add crypto to your Subchain wallet to fund your subscriptions",
    icon: WalletIcon,
    colorTheme: 'primary'
  },
  {
    id: 2,
    title: "Register Subscription",
    description: "Set up your recurring payments with amount and frequency",
    icon: SubscriptionIcon,
    colorTheme: 'secondary'
  },
  {
    id: 3,
    title: "Automatic Payment",
    description: "Smart contract handles payments automatically - no manual work",
    icon: AutoPayIcon,
    colorTheme: 'success'
  }
];

interface StepCardProps {
  step: StepData;
  showArrow?: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ step, showArrow = false }) => {
  const IconComponent = step.icon;
  
  // Define color classes for each theme
  const colorClasses = {
    primary: {
      bgLight: 'bg-primary/10 hover:bg-primary/20',
      badge: 'bg-primary'
    },
    secondary: {
      bgLight: 'bg-secondary/10 hover:bg-secondary/20',
      badge: 'bg-secondary'
    },
    success: {
      bgLight: 'bg-success/10 hover:bg-success/20',
      badge: 'bg-success'
    }
  };
  
  const colors = colorClasses[step.colorTheme];
  
  return (
    <>
      <div className="flex flex-col items-center text-center max-w-xs">
        <div className={`${colors.bgLight} rounded-full p-4 mb-4 transition-colors duration-200`}>
          <IconComponent />
        </div>
        <div className={`${colors.badge} text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mb-3`}>
          {step.id}
        </div>
        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
        <p className="text-default-600 text-sm">{step.description}</p>
      </div>
      
      {showArrow && (
        <div className="hidden lg:block">
          <ArrowIcon />
        </div>
      )}
    </>
  );
};

export const HowItWorksSection: React.FC = () => {
  return (
    <div id="how-it-works" className="mt-16 w-full max-w-6xl">
      <div className="text-center mb-12">
        <h2 className={title({ size: "sm", class: "mb-4" })}>How It Works</h2>
        <p className={subtitle({ class: "text-default-600" })}>
          Simple steps to automate your crypto subscriptions
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {stepsData.map((step, index) => (
          <StepCard 
            key={step.id}
            step={step}
            showArrow={index < stepsData.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
