import React from "react";
import { IconSvgProps } from "@/types";

export const PlayIcon: React.FC<IconSvgProps> = ({ size = 18, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className="ml-1"
    {...props}
  >
    <path d="M8 5v14l11-7z"/>
  </svg>
);

export const WalletIcon: React.FC<IconSvgProps> = ({ size = 48, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className="text-primary"
    {...props}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
    <path d="M12 2a10 10 0 1 0 10 10h-5a5 5 0 0 1-5-5V2z" fill="currentColor" fillOpacity="0.3"/>
  </svg>
);

export const SubscriptionIcon: React.FC<IconSvgProps> = ({ size = 48, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className="text-secondary"
    {...props}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 14h.01" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
    <path d="M12 14h.01" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
    <path d="M16 14h.01" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
  </svg>
);

export const AutoPayIcon: React.FC<IconSvgProps> = ({ size = 48, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className="text-success"
    {...props}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
    <polyline points="16,8 12,12 8,16" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
  </svg>
);

export const ArrowIcon: React.FC<IconSvgProps> = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className="text-default-400"
    {...props}
  >
    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
