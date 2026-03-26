import type { Metadata } from "next";
import { Badge } from "@/app/components/badge/Badge";

export const metadata: Metadata = {
  title: "Badge Preview | TapProfile",
  description: "Preview mobile-first du badge evenementiel TapProfile.",
};

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-8">
      <div className="w-full max-w-md">
        <Badge
          displayName="Nicolas Maldiney"
          organization="Freelance"
          role="VISITOR"
          eventName="TapProfile Meetup"
          qrValue="https://tapprofile.com/p/demo"
        />
      </div>
    </main>
  );
}
