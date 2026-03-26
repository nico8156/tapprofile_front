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

const roleStyles: Record<Props["role"], string> = {
  VISITOR: "border-neutral-300 bg-neutral-100 text-neutral-800",
  EXHIBITOR: "border-amber-300 bg-amber-100 text-amber-900",
  STAFF: "border-sky-300 bg-sky-100 text-sky-900",
};

export function Badge({ displayName, organization, role, eventName, qrValue }: Props) {
  const [src, setSrc] = useState("");

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
    <article className="w-full max-w-sm rounded-[2rem] border border-neutral-200 bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-10">
      <div className="flex flex-col items-center text-center">
        {eventName ? (
          <p className="text-sm font-medium tracking-[0.08em] text-neutral-500">{eventName}</p>
        ) : null}

        <div className={`${eventName ? "mt-5" : ""}`}>
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.18em] ${roleStyles[role]}`}
          >
            {role}
          </span>
        </div>

        <h1 className="mt-6 max-w-[11ch] text-balance text-4xl font-bold leading-tight text-neutral-950 sm:text-[2.75rem]">
          {displayName}
        </h1>

        {organization ? (
          <p className="mt-3 text-base font-medium text-neutral-600">{organization}</p>
        ) : null}

        <div className="mt-8 w-full rounded-[1.75rem] bg-white p-4 sm:p-5">
          <div className="flex justify-center rounded-[1.5rem] bg-white p-3">
            {src ? (
              <img
                src={src}
                alt={`QR code pour ${displayName}`}
                className="h-44 w-44 rounded-2xl bg-white object-contain sm:h-48 sm:w-48"
              />
            ) : (
              <div className="flex h-44 w-44 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm text-neutral-500 sm:h-48 sm:w-48">
                QR code...
              </div>
            )}
          </div>
        </div>

        <p className="mt-6 text-sm font-medium text-neutral-700">Scannez pour garder le contact</p>
      </div>
    </article>
  );
}
