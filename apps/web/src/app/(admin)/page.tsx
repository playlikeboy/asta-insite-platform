import { Badge } from '@/components/ui/badge';

export default function OverviewPage() {
  return (
    <div className="max-w-2xl space-y-4">
      <Badge variant="secondary">Planned for M9</Badge>
      <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
      <p className="text-base leading-relaxed text-muted-foreground">
        Platform activity will appear here once sign-in and the admin tools are built. This screen
        shows no customer or provider data.
      </p>
    </div>
  );
}
