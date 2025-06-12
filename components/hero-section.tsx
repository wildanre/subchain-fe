"use client";

import { Button } from "@heroui/button";
import { title, subtitle } from "@/components/primitives";
import { PlayIcon } from "@/components/home-icons";

interface HeroSectionProps {
  onGetStarted?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const handleGetStarted = () => {
    // Default behavior if no custom handler is provided
    if (onGetStarted) {
      onGetStarted();
    } else {
      // You can add default behavior here, like scrolling to a section
      console.log("Get started clicked!");
      // Example: scroll to how it works section
      document.getElementById('how-it-works')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <>
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title({ color: "blue" })}>Subchain&nbsp;</span>
        <span className={title()}>
          Automate Your Subscription Payments with Crypto
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Set it once, forget it forever. Let our smart contract handles everything.
        </div>
      </div>

      <div className="mt-8">
        <Button
          color="primary"
          size="lg"
          radius="full"
          variant="shadow"
          endContent={<PlayIcon />}
          className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white font-semibold px-8 py-3 hover:scale-105 transition-transform duration-200 shadow-xl hover:shadow-2xl"
          onPress={handleGetStarted}
        >
          Get Started Now
        </Button>
      </div>
    </>
  );
};
