import React from "react";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";

interface ActionButton {
  href: string;
  label: string;
  variant: 'primary' | 'bordered';
  icon?: React.ReactNode;
  isExternal?: boolean;
}

const actionButtons: ActionButton[] = [
  {
    href: siteConfig.links.docs,
    label: "Documentation",
    variant: 'primary',
    isExternal: true
  },
  {
    href: siteConfig.links.github,
    label: "GitHub",
    variant: 'bordered',
    icon: <GithubIcon size={20} />,
    isExternal: true
  }
];

export const ActionButtons: React.FC = () => {
  return (
    <div className="flex gap-3 mt-6 hidden">
      {actionButtons.map((button) => (
        <Link
          key={button.href}
          isExternal={button.isExternal}
          className={buttonStyles({
            color: button.variant === 'primary' ? "primary" : undefined,
            radius: "full",
            variant: button.variant === 'primary' ? "shadow" : "bordered",
          })}
          href={button.href}
        >
          {button.icon}
          {button.label}
        </Link>
      ))}
    </div>
  );
};
