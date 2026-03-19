"use client";

import { LeadForm } from "@/app/adapters/primary/react/public/components/LeadForm";
import { ProfileHero } from "@/app/adapters/primary/react/public/components/ProfileHero";
import { Card } from "@/app/components/ui/Card";
import { usePublicProfileVM } from "@/app/adapters/secondary/view-model/usePublicProfileVM";

type Props = {
  slug: string;
};

export function PublicProfilePage({ slug }: Props) {
  const vm = usePublicProfileVM(slug);

  if (vm.loading) {
    return <main className="mx-auto max-w-md p-4">Chargement...</main>;
  }

  if (vm.error || !vm.profile) {
    return <main className="mx-auto max-w-md p-4">{vm.error || "Profil introuvable."}</main>;
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-4 p-4">
      <Card>
        <ProfileHero
          displayName={vm.profile.displayName}
          headline={vm.profile.headline}
          bio={vm.profile.bio}
        />
      </Card>

      <Card>
        <LeadForm
          onSubmit={vm.submitLead}
          success={vm.leadSuccess}
          error={vm.leadError}
        />
      </Card>
    </main>
  );
}
