"use client";

import { useCreateProfileVM } from "@/app/adapters/secondary/view-model/useCreateProfileVM";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { useRouter, useSearchParams } from "next/navigation";

export function CreateProfilePage() {
  const vm = useCreateProfileVM();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await vm.submit(searchParams.get("returnTo"));

    if (result?.ok) {
      router.push(result.value.redirectTo);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4 p-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Creer mon badge</h1>
        <p className="text-sm text-neutral-600">
          Renseignez juste le minimum pour commencer a scanner et partager votre badge.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <Input
          placeholder="Nom affiche"
          value={vm.displayName}
          onChange={(e) => vm.setDisplayName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={vm.email}
          onChange={(e) => vm.setEmail(e.target.value)}
          required
        />
        <Input
          placeholder="Headline (optionnel)"
          value={vm.headline}
          onChange={(e) => vm.setHeadline(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            className={vm.role === "VISITOR" ? "w-full" : "w-full border-neutral-300 bg-white text-black"}
            onClick={() => vm.setRole("VISITOR")}
          >
            Visiteur
          </Button>
          <Button
            type="button"
            className={vm.role === "EXHIBITOR" ? "w-full" : "w-full border-neutral-300 bg-white text-black"}
            onClick={() => vm.setRole("EXHIBITOR")}
          >
            Exposant
          </Button>
        </div>
        <Input
          placeholder="Slug (optionnel)"
          value={vm.slug}
          onChange={(e) => vm.setSlug(e.target.value)}
        />

        <Button className="w-full" disabled={vm.submitting} type="submit">
          {vm.submitting ? "Creation..." : "Creer mon badge"}
        </Button>

        {vm.error && <p className="text-red-500 text-sm">{vm.error}</p>}
      </form>
    </main>
  );
}
