"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

type Props = {
  displayName: string;
  organization?: string;
  role: "VISITOR" | "EXHIBITOR" | "STAFF";
  eventName?: string;
  qrValue: string;
};

const roleStyles: Record<
  Props["role"],
  {
    badge: string;
    dot: string;
  }
> = {
  VISITOR: {
    badge: "border-neutral-900/10 bg-neutral-950 text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)]",
    dot: "bg-white/90",
  },
  EXHIBITOR: {
    badge: "border-amber-300/80 bg-amber-400 text-amber-950 shadow-[0_10px_24px_rgba(217,119,6,0.22)]",
    dot: "bg-amber-950",
  },
  STAFF: {
    badge: "border-sky-300/80 bg-sky-500 text-white shadow-[0_10px_24px_rgba(14,165,233,0.24)]",
    dot: "bg-white/90",
  },
};

export function Badge({ displayName, organization, role, eventName, qrValue }: Props) {
  const [src, setSrc] = useState("");
  const roleStyle = roleStyles[role];

  useEffect(() => {
    let isActive = true;

    QRCode.toDataURL(qrValue, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 400,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    })
      .then((nextSrc) => {
        if (isActive) {
          setSrc(nextSrc);
        }
      })
      .catch(() => {
        if (isActive) {
          setSrc("");
        }
      });

    return () => {
      isActive = false;
    };
  }, [qrValue]);

  return (
    <article className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-neutral-200/90 bg-[linear-gradient(180deg,_#ffffff_0%,_#fafaf9_100%)] px-6 py-6 shadow-[0_24px_60px_rgba(15,23,42,0.10)] sm:px-8 sm:py-7">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-neutral-950" />

      <div className="flex flex-col items-center text-center">
        {eventName ? (
          <p className="text-sm font-semibold tracking-[0.14em] text-neutral-500 uppercase">{eventName}</p>
        ) : null}

        <div className={`${eventName ? "mt-4" : ""}`}>
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-bold tracking-[0.22em] ${roleStyle.badge}`}
          >
            <span className={`h-2 w-2 rounded-full ${roleStyle.dot}`} />
            {role}
          </span>
        </div>

        <div className="mt-5 flex w-full flex-col items-center">
          <h1 className="max-w-[10ch] text-balance text-[2.9rem] font-black leading-[0.92] tracking-[-0.07em] text-neutral-950 sm:text-[3.2rem]">
            {displayName}
          </h1>

          {organization ? (
            <p className="mt-3 max-w-[20ch] text-sm font-semibold tracking-[0.04em] text-neutral-600 sm:text-base">
              {organization}
            </p>
          ) : null}
        </div>

        <div className="mt-6 w-full rounded-[1.9rem] border border-neutral-200 bg-neutral-950 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:px-5 sm:py-5">
          <div className="mb-3 flex items-center justify-between gap-3 text-left">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/55">Code contact</p>
              <p className="mt-1 text-sm font-medium text-white/80">Montrez ce QR pour echanger vite</p>
            </div>
            <div className="h-px flex-1 bg-white/12" />
          </div>

          <div className="rounded-[1.6rem] bg-white p-3 shadow-[0_14px_30px_rgba(15,23,42,0.22)] sm:p-4">
            <div className="flex justify-center rounded-[1.35rem] bg-white">
              {src ? (
                <img
                  src={src}
                  alt={`QR code pour ${displayName}`}
                  className="h-52 w-52 rounded-[1.2rem] bg-white object-contain sm:h-56 sm:w-56"
                />
              ) : (
                <div className="flex h-52 w-52 items-center justify-center rounded-[1.2rem] border border-neutral-200 bg-white text-sm text-neutral-500 sm:h-56 sm:w-56">
                  QR code...
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 flex w-full items-center justify-center gap-3">
          <div className="h-px w-10 bg-neutral-300" />
          <p className="text-sm font-semibold tracking-[0.02em] text-neutral-800">
            Scannez pour echanger
          </p>
          <div className="h-px w-10 bg-neutral-300" />
        </div>
      </div>
    </article>
  );
}
