"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_LINKS, QUOTE_CTA } from "@/lib/nav";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) =>
            "children" in link ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-[18px] font-bold text-white/95 hover:text-white"
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                {servicesOpen && (
                  <div className="absolute left-1/2 top-full w-48 -translate-x-1/2 pt-3">
                    <div className="overflow-hidden rounded-xl border border-black/5 bg-white py-1.5 shadow-xl">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-[16.8px] font-medium text-ink hover:bg-primary/5 hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-[18px] font-bold text-white/95 hover:text-white"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:block">
          <Link
            href={QUOTE_CTA.href}
            className="rounded-full bg-secondary px-5 py-2.5 text-[16.8px] font-bold text-white shadow-sm transition-colors hover:bg-secondary-dark"
          >
            {QUOTE_CTA.label}
          </Link>
        </div>

        <button
          type="button"
          className="p-2 text-white lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="메뉴 열기"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/15 bg-primary lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block py-2.5 text-[18px] font-bold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {"children" in link && (
                  <div className="ml-3 flex flex-col border-l border-white/20 pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="py-2 text-[16.8px] text-white/85"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href={QUOTE_CTA.href}
              className="mt-2 rounded-full bg-secondary px-5 py-3 text-center text-[16.8px] font-bold text-white"
              onClick={() => setMobileOpen(false)}
            >
              {QUOTE_CTA.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
