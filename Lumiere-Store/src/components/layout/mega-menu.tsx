"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { MegaMenu } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * Desktop mega panel.
 *
 * Two shapes, on purpose:
 * - `directory` (Shop): a counted index of the catalogue. Rows, numbers, one exit.
 * - `gallery` (Collections): large image tiles. Editorial, no numbers.
 *
 * Kept mounted so both the open and close transitions can play. While closed it
 * is `invisible` + `aria-hidden` + `pointer-events-none`, so it stays out of the
 * tab order and the accessibility tree.
 */
export function MegaPanel({ menu, open }: { menu: MegaMenu; open: boolean }) {
  return (
    <div
      id={`mega-${menu.id}`}
      aria-hidden={!open}
      className={cn(
        "absolute inset-x-0 top-full hidden border-b border-border bg-background lg:block",
        "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
        open
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-2 opacity-0"
      )}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-9">
        <p className={cn("label-xs mb-6", open && "mega-col")} style={open ? { animationDelay: "0ms" } : undefined}>
          {menu.intro}
        </p>

        {menu.kind === "directory" && menu.directory ? (
          <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
            <ul className="border-t border-border">
              {menu.directory.rows?.map((row, index) => (
                <li key={row.href} className={cn(open && "mega-col")} style={open ? { animationDelay: `${80 + index * 60}ms` } : undefined}>
                  <Link
                    href={row.href}
                    className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 border-b border-border py-4 transition-colors hover:bg-mist"
                  >
                    <span
                      aria-hidden
                      className="font-serif text-3xl leading-none text-gold-ink tabular-nums"
                    >
                      {row.count}
                    </span>
                    <span>
                      <span className="block font-serif text-2xl text-foreground transition-transform duration-300 group-hover:translate-x-1">
                        {row.label}
                      </span>
                      <span className="mt-0.5 block text-sm text-slate-500">
                        from ${row.low.toLocaleString()}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 self-center text-slate-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-ink"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <aside className={cn("flex flex-col justify-between border-t border-border pt-6", open && "mega-col")} style={open ? { animationDelay: "320ms" } : undefined}>
              <div>
                <p className="font-serif text-xl text-foreground">{menu.feature.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{menu.feature.note}</p>
              </div>
              <Link
                href={menu.feature.href}
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 bg-foreground px-6 text-xs font-medium uppercase tracking-[0.14em] text-background transition-colors hover:bg-gold-ink"
              >
                View everything
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </aside>
          </div>
        ) : null}

        {menu.kind === "gallery" && menu.tiles ? (
          <div className="grid gap-5 lg:grid-cols-[repeat(3,1fr)_18rem]">
            {menu.tiles.slice(0, 6).map((tile, index) => (
              <Link
                key={tile.href}
                href={tile.href}
                className={cn("group block", open && "mega-col")}
                style={open ? { animationDelay: `${80 + index * 55}ms` } : undefined}
              >
                <div className="overflow-hidden bg-mist">
                <Image
                  src={tile.image}
                  alt=""
                  width={180}
                  height={225}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  unoptimized
                />
                </div>
                <p className="label-xs mt-3">{tile.tagline}</p>
                <p className="mt-1 font-serif text-lg leading-snug text-foreground">{tile.label}</p>
              </Link>
            ))}

            <aside
              className={cn("flex flex-col justify-between border-t border-border pt-6", open && "mega-col")}
              style={open ? { animationDelay: "420ms" } : undefined}
            >
              <div>
                <p className="font-serif text-xl text-foreground">{menu.feature.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{menu.feature.note}</p>
              </div>
              <Link
                href={menu.feature.href}
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 border border-foreground px-6 text-xs font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Browse collections
              </Link>
            </aside>
          </div>
        ) : null}
      </div>
    </div>
  );
}
