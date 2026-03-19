import { Stat } from "@/app/components/ui/Stat";

type Props = {
  views: number;
  leads: number;
  conversionRate: number;
};

export function DashboardStats({ views, leads, conversionRate }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Stat label="Views" value={views} />
      <Stat label="Leads" value={leads} />
      <Stat label="Conv." value={`${conversionRate}%`} />
    </div>
  );
}
