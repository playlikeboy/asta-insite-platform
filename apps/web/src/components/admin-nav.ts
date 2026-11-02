import {
  Activity,
  BadgeCheck,
  Bell,
  CreditCard,
  FileText,
  LayoutDashboard,
  type LucideIcon,
  Layers,
  ListChecks,
  ReceiptText,
  ScrollText,
  Settings,
  ShieldCheck,
  ShieldUser,
  Target,
  Users,
  Wrench,
} from 'lucide-react';

export type AdminNavItem = { title: string; icon: LucideIcon; href?: string };

/** Sidebar order from docs/design/ADMIN_SCREENS.md. Items without href are not built yet. */
export const adminNav: readonly AdminNavItem[] = [
  { title: 'Overview', icon: LayoutDashboard, href: '/' },
  { title: 'Customers', icon: Users },
  { title: 'Service Providers', icon: Wrench },
  { title: 'Provider Approvals', icon: BadgeCheck },
  { title: 'Service Categories', icon: Layers },
  { title: 'Requirements', icon: ListChecks },
  { title: 'Leads', icon: Target },
  { title: 'Content Moderation', icon: ShieldCheck },
  { title: 'Subscriptions', icon: ReceiptText },
  { title: 'Payments', icon: CreditCard },
  { title: 'Invoices', icon: FileText },
  { title: 'Analytics', icon: Activity },
  { title: 'Notifications', icon: Bell },
  { title: 'Admin Users', icon: ShieldUser },
  { title: 'Settings', icon: Settings },
  { title: 'Audit Logs', icon: ScrollText },
];
