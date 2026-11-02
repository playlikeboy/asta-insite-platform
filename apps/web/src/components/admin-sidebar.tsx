import Link from 'next/link';

import { adminNav } from '@/components/admin-nav';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-5 text-base font-bold">Asta Insite Admin</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <nav aria-label="Admin sections">
            <SidebarMenu>
              {adminNav.map(({ title, icon: Icon, href }) => (
                <SidebarMenuItem key={title}>
                  {href ? (
                    <SidebarMenuButton isActive asChild>
                      <Link href={href} aria-current="page">
                        <Icon aria-hidden />
                        <span>{title}</span>
                      </Link>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton disabled>
                      <Icon aria-hidden />
                      <span>{title}</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </nav>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
