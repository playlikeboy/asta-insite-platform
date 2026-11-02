import { AdminSidebar } from '@/components/admin-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-14 items-center border-b border-border px-4">
          <SidebarTrigger aria-label="Toggle sidebar" />
        </header>
        <main className="p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
