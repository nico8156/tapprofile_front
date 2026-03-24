import { Stat } from "@/app/components/ui/Stat";

type Props = {
  scans: number;
  connections: number;
};

export function DashboardStats({ scans, connections }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Stat label="Scans" value={scans} />
      <Stat label="Connexions" value={connections} />
    </div>
  );
}
