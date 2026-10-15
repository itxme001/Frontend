"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Curtain image reveal.
 *
 * The frame clips, the image starts overscaled and settles to 1 — so the
 * photograph appears to be uncovered rather than simply faded in. Reads far
 * more expensive than a fade, and costs one transform + one clip-path.
 *
 * Reduced motion renders the final state immediately. `data-anim` is set so the
 * `@media (scripting: none)` rule can neutralise the clip if JS never runs.
 */
export function CurtainImage({
  src,
  alt,
  className,
  imgClassName,
  ratio = "4/5",
  delay = 0,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: "4/5" | "3/4" | "1/1" | "16/9" | "3/2";
  delay?: number;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();

  const ratioClass = {
    "4/5": "aspect-[4/5]",
    "3/4": "aspect-[3/4]",
    "1/1": "aspect-square",
    "16/9": "aspect-[16/9]",
    "3/2": "aspect-[3/2]",
  }[ratio];

  if (reduce) {
    return (
      <div className={cn("overflow-hidden bg-mist", ratioClass, className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className={cn("object-cover", imgClassName)}
          priority={priority}
        />
      </div>
    );
  }

  return (
    <motion.div
      data-anim
      className={cn("relative overflow-hidden bg-mist", ratioClass, className)}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className={cn("object-cover", imgClassName)}
        priority={priority}
        style={{ transform: "scale(1.18)", transition: "transform 1.25s cubic-bezier(0.16,1,0.3,1)" }}
        // eslint-disable-next-line react-hooks/rules-of-hooks
      />
      {/* Scale animation handled via CSS for SSR compatibility */}
      <style dangerouslySetInnerHTML={{ __html: `
        [data-anim] > img { transform: scale(1.18); transition: transform 1.25s cubic-bezier(0.16,1,0.3,1); }
        [data-anim].animate-scale > img { transform: scale(1); }
      `}} />
    </motion.div>
  );
}

/**
 * Text that rises out of a clipping mask. The accessible text stays a single
 * node — only the wrapper animates — so screen readers and crawlers see plain
 * copy.
 */
export function LineReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={cn("block", className)}>{children}</span>;

  return (
    <span className={cn("block overflow-hidden pb-[0.08em]", className)}>
      <motion.span
        data-anim
        className="block"
        initial={{ y: "115%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
