"use client";

import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
}

const baseStyle = (color = "currentColor", size: number | string = 20, strokeWidth: number | string = 1.75): React.SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: Number(strokeWidth),
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

// 1. Dashboard / Overview
export const LayoutDashboardIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <rect width="7" height="9" x="3" y="3" rx="1.5" />
    <rect width="7" height="5" x="14" y="3" rx="1.5" />
    <rect width="7" height="9" x="14" y="12" rx="1.5" />
    <rect width="7" height="5" x="3" y="16" rx="1.5" />
  </svg>
);

// 2. Users / People
export const UsersIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// 3. User / Single Person
export const UserIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// 4. Guide / Compass Navigator
export const CompassIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

// 5. Shield / Security / Admin
export const ShieldIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
  </svg>
);

// 6. Shield Check / Verified
export const ShieldCheckIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

// 7. Calendar
export const CalendarIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

// 8. Wallet / Finance
export const WalletIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
  </svg>
);

// 9. Credit Card / Payment
export const CreditCardIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

// 10. File / Documents
export const FileTextIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);

// 11. Folder / Catalog
export const FolderIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
);

// 12. Message / Chat
export const MessageSquareIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

// 13. Bell / Notification
export const BellIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

// 14. Settings
export const SettingsIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// 15. Activity / Audit
export const ActivityIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

// 16. Server / Database / API
export const ServerIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
    <line x1="6" x2="6.01" y1="6" y2="6" />
    <line x1="6" x2="6.01" y1="18" y2="18" />
  </svg>
);

// 17. Eye (Inspect / View Action)
export const EyeIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// 18. Edit / Pencil Action
export const EditIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    <path d="m15 5 4 4" />
  </svg>
);

// 19. Trash / Delete Action
export const TrashIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
);

// 20. Check / Approve Action
export const CheckIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// 21. Check Circle
export const CheckCircleIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// 22. X / Close / Reject Action
export const XIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// 23. X Circle
export const XCircleIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

// 24. Plus / Add Action
export const PlusIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

// 25. Key / 2FA Reset Action
export const KeyIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
    <path d="m21 2-9.6 9.6" />
    <circle cx="7.5" cy="15.5" r="5.5" />
  </svg>
);

// 26. Ban / Freeze Action
export const BanIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m4.9 4.9 14.2 14.2" />
  </svg>
);

// 27. Search
export const SearchIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

// 28. Filter
export const FilterIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

// 29. Mail / Email
export const MailIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// 30. Send / Paperplane
export const SendIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

// 31. Alert Triangle / Warning / Dispute
export const AlertTriangleIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" x2="12" y1="9" y2="13" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </svg>
);

// 32. Scale / Settlement
export const ScaleIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </svg>
);

// 33. Star / Rating
export const StarIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// 34. Download
export const DownloadIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

// 35. Globe / Language
export const GlobeIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// 36. Sun
export const SunIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

// 37. Moon
export const MoonIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

// 38. Map Pin / Destination
export const MapPinIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// 39. Layers / Categories
export const LayersIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

// 40. RefreshCw / Reload
export const RefreshIcon: React.FC<IconProps> = ({ size, color, strokeWidth, ...props }) => (
  <svg {...baseStyle(color, size, strokeWidth)} {...props}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </svg>
);
