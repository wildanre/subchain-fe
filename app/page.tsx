import { HeroSection } from "@/components/hero-section";
import { ActionButtons } from "@/components/action-buttons";
import { HowItWorksSection } from "@/components/how-it-works";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <HeroSection />
      <ActionButtons />
      <HowItWorksSection />
    </section>
  );
}
