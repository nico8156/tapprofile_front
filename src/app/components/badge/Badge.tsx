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
    badge: "border-neutral-900/12 bg-neutral-900 text-white shadow-[0_8px_20px_rgba(15,23,42,0.14)]",
    dot: "bg-white/90",
  },
  EXHIBITOR: {
    badge: "border-amber-300/80 bg-amber-300 text-amber-950 shadow-[0_8px_20px_rgba(217,119,6,0.16)]",
    dot: "bg-amber-950",
  },
  STAFF: {
    badge: "border-sky-300/80 bg-sky-500 text-white shadow-[0_8px_20px_rgba(14,165,233,0.18)]",
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
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500">{eventName}</p>
        ) : null}

        <div className={eventName ? "mt-3" : ""}>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold tracking-[0.18em] ${roleStyle.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${roleStyle.dot}`} />
            {role}
          </span>
        </div>

        <div className="mt-4 flex w-full flex-col items-center">
          <h1 className="max-w-[10ch] text-balance text-[2.9rem] font-black leading-[0.95] tracking-[-0.06em] text-neutral-950 sm:text-[3.2rem]">
            {displayName}
          </h1>

          {organization ? (
            <p className="mt-2.5 max-w-[20ch] text-sm font-semibold tracking-[0.04em] text-neutral-600 sm:text-base">
              {organization}
            </p>
          ) : null}
        </div>

        <div className="mt-5 w-full rounded-[1.7rem] border border-neutral-200 bg-[#111111] px-3.5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:px-4 sm:py-4">
          <div className="mb-2.5 text-left">
            <p className="text-sm font-medium text-white/82">Scannez pour echanger</p>
          </div>

          <div className="rounded-[1.45rem] bg-white p-3 shadow-[0_12px_26px_rgba(15,23,42,0.18)] sm:p-3.5">
            <div className="flex justify-center rounded-[1.2rem] bg-white">
              {src ? (
                <img
                  src={src}
                  alt={`QR code pour ${displayName}`}
                  className="h-52 w-52 rounded-[1.1rem] bg-white object-contain sm:h-56 sm:w-56"
                />
              ) : (
                <div className="flex h-52 w-52 items-center justify-center rounded-[1.1rem] border border-neutral-200 bg-white text-sm text-neutral-500 sm:h-56 sm:w-56">
                  QR code...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
