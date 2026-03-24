"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCreateProfileVM } from "@/app/adapters/secondary/view-model/useCreateProfileVM";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { getActivationContext, getActivationIntroSteps, isActivationFieldsValid, validateActivationFields, type ActivationFields } from "./createProfileOnboarding";

export function CreateProfilePage() {
  const vm = useCreateProfileVM();
  const router = useRouter();
  const searchParams = useSearchParams();
  const context = useMemo(() => getActivationContext(searchParams), [searchParams]);
  const introSteps = useMemo(() => getActivationIntroSteps(context.eventName), [context.eventName]);
  const [step, setStep] = useState(0);
  const [fields, setFields] = useState<ActivationFields>({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    role: context.role,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ActivationFields, string>>>({});
  const [showValidation, setShowValidation] = useState(false);
  const [activationComplete, setActivationComplete] = useState(false);
  const [redirectTo, setRedirectTo] = useState("");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const organizationRef = useRef<HTMLInputElement>(null);
  const touchStartX = useRef<number | null>(null);
  const validationContext = useMemo(
    () => ({
      organizationRequired: context.organizationRequired || fields.role === "EXHIBITOR",
    }),
    [context.organizationRequired, fields.role],
  );

  useEffect(() => {
    if (context.roleLocked) {
      setFields((current) => ({ ...current, role: context.role }));
    }
  }, [context.role, context.roleLocked]);

  useEffect(() => {
    if (step !== introSteps.length) return;

    if (!fields.firstName) {
      firstNameRef.current?.focus();
      return;
    }

    if (!fields.lastName) {
      lastNameRef.current?.focus();
      return;
    }

    if (!fields.email) {
      emailRef.current?.focus();
      return;
    }

    if (validationContext.organizationRequired && !fields.organization) {
      organizationRef.current?.focus();
      return;
    }
  }, [fields.email, fields.firstName, fields.lastName, fields.organization, introSteps.length, step, validationContext.organizationRequired]);

  useEffect(() => {
    if (!activationComplete || !redirectTo) return;

    const timeout = window.setTimeout(() => {
      router.push(redirectTo);
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [activationComplete, redirectTo, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validateActivationFields(fields, validationContext);
    setErrors(nextErrors);
    setShowValidation(true);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const result = await vm.submit(fields, searchParams.get("returnTo"));

    if (result?.ok) {
      setRedirectTo(result.value.redirectTo);
      setActivationComplete(true);
    }
  };

  const handleFieldChange = <K extends keyof ActivationFields>(key: K, value: ActivationFields[K]) => {
    const nextFields = {
      ...fields,
      [key]: value,
    };

    setFields(nextFields);

    if (showValidation) {
      setErrors(validateActivationFields(nextFields, {
        organizationRequired: context.organizationRequired || nextFields.role === "EXHIBITOR",
      }));
    }
  };

  const canSubmit = isActivationFieldsValid(fields, validationContext) && !vm.submitting;
  const currentStep = introSteps[step];
  const isFormStep = step === introSteps.length;

  const goNext = () => {
    setStep((current) => Math.min(current + 1, introSteps.length));
  };

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 0));
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX ?? null;

    if (startX === null || endX === null) return;

    const deltaX = endX - startX;
    if (deltaX <= -40 && !isFormStep) {
      goNext();
    }

    if (deltaX >= 40 && step > 0) {
      goBack();
    }

    touchStartX.current = null;
  };

  if (activationComplete) {
    return (
      <main
        className="min-h-screen bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#f8fafc_48%,_#e0f2fe_100%)] px-4 py-6 text-neutral-950"
        style={{ fontFamily: "\"Avenir Next\", \"Segoe UI\", sans-serif" }}
      >
        <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-md items-center">
          <section className="animate-enter w-full text-center">
            <h1 className="text-4xl font-bold tracking-[-0.06em]">C&apos;est pret</h1>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#f8fafc_48%,_#e0f2fe_100%)] px-4 py-4 text-neutral-950"
      style={{ fontFamily: "\"Avenir Next\", \"Segoe UI\", sans-serif" }}
    >
      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        <div className="flex items-center justify-center gap-2 py-3">
          {introSteps.concat({ title: "form", ctaLabel: "", visual: "none" as const }).map((introStep, index) => (
            <div
              key={introStep.title}
              className={index === step ? "h-1.5 w-6 rounded-full bg-neutral-950" : "h-1.5 w-1.5 rounded-full bg-neutral-300"}
            />
          ))}
        </div>

        <div className="flex flex-1 flex-col justify-center">
          {!isFormStep ? (
            <section
              className="animate-enter flex flex-1 flex-col justify-center py-6 text-center"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-[-0.07em] text-balance">{currentStep.title}</h1>
                {currentStep.subtitle ? <p className="text-lg text-neutral-500">{currentStep.subtitle}</p> : null}
              </div>

              <div className="my-12 flex justify-center">
                <StepVisual visual={currentStep.visual} />
              </div>
            </section>
          ) : (
            <section className="animate-enter py-4">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold tracking-[-0.05em]">Creez votre badge</h1>
                  <p className="text-sm text-neutral-500">Juste ce qu&apos;il faut pour etre reconnu</p>
                </div>

                {!context.roleLocked ? (
                  <div className="inline-flex rounded-full border border-neutral-200 bg-white p-1 text-sm shadow-sm">
                    <button
                      type="button"
                      className={fields.role === "VISITOR" ? "rounded-full bg-neutral-950 px-3 py-1.5 font-medium text-white" : "rounded-full px-3 py-1.5 text-neutral-500"}
                      onClick={() => handleFieldChange("role", "VISITOR")}
                    >
                      Visiteur
                    </button>
                    <button
                      type="button"
                      className={fields.role === "EXHIBITOR" ? "rounded-full bg-neutral-950 px-3 py-1.5 font-medium text-white" : "rounded-full px-3 py-1.5 text-neutral-500"}
                      onClick={() => handleFieldChange("role", "EXHIBITOR")}
                    >
                      Exposant
                    </button>
                  </div>
                ) : null}

                <form
                  id="create-profile-form"
                  className="space-y-3 rounded-[1.75rem] border border-white/80 bg-white/92 p-4 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="grid grid-cols-2 gap-3">
                    <FieldBlock label="Prenom" error={errors.firstName}>
                      <Input
                        ref={firstNameRef}
                        autoComplete="given-name"
                        placeholder="Lea"
                        value={fields.firstName}
                        onChange={(e) => handleFieldChange("firstName", e.target.value)}
                        onBlur={() => setErrors(validateActivationFields(fields, validationContext))}
                      />
                    </FieldBlock>
                    <FieldBlock label="Nom" error={errors.lastName}>
                      <Input
                        ref={lastNameRef}
                        autoComplete="family-name"
                        placeholder="Martin"
                        value={fields.lastName}
                        onChange={(e) => handleFieldChange("lastName", e.target.value)}
                      />
                    </FieldBlock>
                  </div>

                  <FieldBlock label="Email" error={errors.email} hint="pour retrouver vos contacts">
                    <Input
                      ref={emailRef}
                      autoComplete="email"
                      inputMode="email"
                      type="email"
                      placeholder="vous@entreprise.com"
                      value={fields.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                    />
                  </FieldBlock>

                  {validationContext.organizationRequired ? (
                    <FieldBlock label={context.organizationLabel} error={errors.organization}>
                      <Input
                        ref={organizationRef}
                        autoComplete="organization"
                        placeholder={context.organizationPlaceholder}
                        value={fields.organization}
                        onChange={(e) => handleFieldChange("organization", e.target.value)}
                      />
                    </FieldBlock>
                  ) : (
                    <FieldBlock label={context.organizationLabel} hint="optionnel">
                      <Input
                        ref={organizationRef}
                        autoComplete="organization"
                        placeholder={context.organizationPlaceholder}
                        value={fields.organization}
                        onChange={(e) => handleFieldChange("organization", e.target.value)}
                      />
                    </FieldBlock>
                  )}
                </form>
              </div>
            </section>
          )}
        </div>

        <div className="sticky bottom-0 z-10 -mx-4 bg-[linear-gradient(180deg,_rgba(248,250,252,0)_0%,_rgba(248,250,252,0.84)_16%,_rgba(255,255,255,0.98)_44%)] px-4 pb-4 pt-6 backdrop-blur">
          <div className="mx-auto flex max-w-md gap-3 rounded-[1.7rem] border border-neutral-200/80 bg-white px-3 py-3 shadow-[0_-14px_40px_rgba(15,23,42,0.10)]">
            {step > 0 ? (
              <Button
                type="button"
                className="min-h-14 border-neutral-200 bg-white px-4 text-neutral-900"
                onClick={goBack}
              >
                Retour
              </Button>
            ) : null}

            {!isFormStep ? (
              <Button
                type="button"
                className="min-h-14 flex-1 rounded-2xl border-neutral-950 bg-neutral-950 px-6 text-base font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.20)]"
                onClick={goNext}
              >
                {currentStep.ctaLabel}
              </Button>
            ) : (
              <div className="flex flex-1 flex-col gap-2">
                {vm.error ? <p className="text-sm text-red-600">Impossible de creer votre badge. Reessayez.</p> : null}
                <Button
                  type="submit"
                  form="create-profile-form"
                  className="min-h-14 w-full rounded-2xl border-neutral-950 bg-neutral-950 px-6 text-base font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.24)] disabled:border-neutral-200 disabled:bg-neutral-200 disabled:text-neutral-500 disabled:opacity-100"
                  disabled={!canSubmit}
                  onClick={() => setShowValidation(true)}
                >
                  {vm.submitting ? "Activation..." : "Activer mon badge"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function StepVisual({ visual }: { visual: "none" | "connect" | "contact" }) {
  if (visual === "none") {
    return <div className="h-16" aria-hidden="true" />;
  }

  if (visual === "connect") {
    return (
      <div className="relative flex items-center gap-3" aria-hidden="true">
        <div className="h-16 w-16 rounded-[1.6rem] bg-neutral-950" />
        <div className="h-1.5 w-10 rounded-full bg-sky-400" />
        <div className="grid h-16 w-16 grid-cols-2 gap-1 rounded-[1.6rem] bg-white p-2 ring-2 ring-neutral-950">
          <div className="rounded-sm bg-neutral-950" />
          <div className="rounded-sm bg-neutral-200" />
          <div className="rounded-sm bg-neutral-200" />
          <div className="rounded-sm bg-neutral-950" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <div className="h-16 w-16 rounded-full bg-neutral-950" />
      <div className="h-1 w-12 rounded-full bg-neutral-300" />
      <div className="h-16 w-16 rounded-full bg-sky-100" />
    </div>
  );
}

type FieldBlockProps = {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
};

function FieldBlock({ label, hint, error, children }: FieldBlockProps) {
  return (
    <label className="block space-y-2">
      <div className="flex items-end justify-between gap-3">
        <span className="text-sm font-medium text-neutral-900">{label}</span>
        {hint ? <span className="text-xs text-neutral-500">{hint}</span> : null}
      </div>
      {children}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </label>
  );
}
