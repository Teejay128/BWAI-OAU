"use client";

import Image from "next/image";
import { motion } from "motion/react";

type BuildWithAiShowcaseCardProps = {
  title: string;
  backgroundClassName: string;
  titleClassName: string;
  gridClassName: string;
  minHeightClassName: string;
  imageAlt: string;
  imageSrc?: string;
  delay: number;
};

const GRADIENT_OVERLAY_BY_BACKGROUND_CLASS: Record<string, string> = {
  "bg-pastelPink": "bg-linear-to-t from-pastelPink/95 via-pastelPink/72 to-transparent",
  "bg-pastelYellow": "bg-linear-to-t from-pastelYellow/95 via-pastelYellow/72 to-transparent",
  "bg-pastelGreen": "bg-linear-to-t from-pastelGreen/95 via-pastelGreen/72 to-transparent",
  "bg-pastelBlue": "bg-linear-to-t from-pastelBlue/95 via-pastelBlue/72 to-transparent",
};

function CornerMark({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const positionClassName = {
    "top-left": "-left-2.5 -top-2.5",
    "top-right": "-right-2.5 -top-2.5",
    "bottom-left": "-bottom-2.5 -left-2.5",
    "bottom-right": "-bottom-2.5 -right-2.5",
  }[position];

  return <span aria-hidden="true" className={`absolute z-20 h-4 w-4 border-2 border-ink bg-white ${positionClassName}`} />;
}

export default function BuildWithAiShowcaseCard({
  title,
  backgroundClassName,
  titleClassName,
  gridClassName,
  minHeightClassName,
  imageAlt,
  imageSrc,
  delay,
}: BuildWithAiShowcaseCardProps) {
  const hasImage = Boolean(imageSrc);

  return (
    <motion.article
      className={`group relative isolate flex h-full flex-col overflow-visible border-2 border-ink ${backgroundClassName} ${minHeightClassName} ${gridClassName}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      <CornerMark position="top-left" />
      <CornerMark position="top-right" />
      <CornerMark position="bottom-left" />
      <CornerMark position="bottom-right" />

      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        {hasImage ? (
          <>
            <Image
              src={imageSrc as string}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className={`absolute inset-0 ${GRADIENT_OVERLAY_BY_BACKGROUND_CLASS[backgroundClassName] ?? "bg-linear-to-t from-white/85 via-white/50 to-transparent"}`} />
            <div className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-black/15" />
          </>
        ) : (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.55),transparent_24%),radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.3),transparent_20%),radial-gradient(circle_at_56%_74%,rgba(255,255,255,0.26),transparent_24%)]" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-white/40 to-transparent" />
          </div>
        )}

        <div className="relative z-10 flex items-start px-5 pt-5 sm:px-6 sm:pt-6">
          <Image
            src="/event-header.svg"
            alt=""
            width={256}
            height={29}
            className="h-5 w-auto opacity-55 sm:h-6"
            aria-hidden="true"
          />
        </div>

        <div className="relative mt-auto px-5 pb-5 pt-6 sm:px-6 sm:pb-6 sm:pt-8">
          <h3
            className={`whitespace-pre-line font-sans font-bold leading-[0.88] tracking-tight ${titleClassName}`}
            style={{
              fontFamily: "Google Sans, var(--font-google-sans), sans-serif",
              WebkitTextStroke: "1.5px #100f10",
              textShadow: "0 2px 0 rgba(16,15,16,0.12)",
            }}
          >
            <span className="block text-4xl sm:text-5xl lg:text-6xl">
              {title}
            </span>
          </h3>
        </div>
      </div>
    </motion.article>
  );
}