import React, { useState } from "react";
import {
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";

const EXPLORE_LINKS = [
  { label: "Heritage", href: "#explore" },
  { label: "Monuments", href: "#explore" },
  { label: "Arts & Crafts", href: "#explore" },
  { label: "Traditions", href: "#explore" },
  { label: "Festivals", href: "#explore" },
  { label: "Stories", href: "#explore" },
  { label: "Places", href: "#explore" },
  { label: "Artisans", href: "#explore" },
];

const VIRASAT_AI_LINKS = [
  { label: "About Virasat AI", href: "#explore" },
  { label: "Our Mission", href: "#explore" },
  { label: "How It Works", href: "#explore" },
  { label: "AI Heritage Guide", href: "#explore" },
  { label: "Community", href: "#explore" },
  { label: "Contribute", href: "#explore" },
  { label: "Contact Us", href: "#explore" },
];

const RESOURCE_LINKS = [
  { label: "Heritage Map", href: "#explore" },
  { label: "Statewise Heritage", href: "#explore" },
  { label: "Cultural Timeline", href: "#explore" },
  { label: "Discover India", href: "#explore" },
  { label: "FAQs", href: "#explore" },
  { label: "Privacy Policy", href: "#explore" },
  { label: "Terms & Conditions", href: "#explore" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: Youtube,
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: Facebook,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4l14 16M19 4L5 20" />
    </svg>
  );
}

function LinkColumn({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={heading}>
      <h3 className="mb-5 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-amber-300">
        {heading}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="group inline-flex items-center gap-1 text-sm text-stone-400 transition-all duration-200 hover:translate-x-0.5 hover:text-white"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-60" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black/60 backdrop-blur-md">
      {/* Subtle heritage divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        {/* Heritage statement */}
        <div className="mb-12 flex flex-col gap-5 border-b border-white/10 pb-10 sm:mb-14 sm:pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.35em] text-amber-300">
              INDIA · REMEMBERED ALIVE
            </p>

            <h2 className="max-w-2xl font-display text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
              Every tradition has a story.
              <span className="text-amber-200"> We help you discover it.</span>
            </h2>
          </div>

          <a
            href="#explore"
            className="group inline-flex w-fit items-center gap-2 border-b border-amber-400/40 pb-1 text-xs font-medium uppercase tracking-[0.18em] text-stone-300 transition-colors hover:border-amber-400 hover:text-amber-200"
          >
            Explore India
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <a
              href="/"
              aria-label="Virasat AI home"
              className="group inline-flex items-baseline gap-2"
            >
              <span className="font-display text-3xl italic leading-none text-amber-300 transition-colors duration-200 group-hover:text-amber-200">
                Virasat
              </span>
              <span className="font-mono text-[9px] tracking-[0.32em] text-cyan-400">
                A.I.
              </span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-stone-400">
              India, remembered alive. Explore, preserve, and experience
              India's living heritage through stories, traditions, crafts,
              places, and people.
            </p>

            {/* Social links */}
            <div className="mt-7 flex items-center gap-2.5">
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-stone-400 transition-all duration-200 hover:-translate-y-1 hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-amber-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-stone-400 transition-all duration-200 hover:-translate-y-1 hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-amber-300"
              >
                <XIcon className="h-4 w-4" />
              </a>
            </div>

            {/* Newsletter */}
            <div className="space-y-3 pt-6">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-300">
                JOIN OUR ARCHIVE
              </h3>
              <p className="text-sm text-stone-400">
                Get stories, updates, and cultural insights directly in your inbox.
              </p>

              <form onSubmit={handleSubmit} className="relative mt-3 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full rounded-full border border-white/15 bg-white/5 py-2.5 pl-4 pr-12 text-sm text-stone-200 placeholder-stone-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-amber-500 px-3 py-1.5 text-xs font-medium text-black transition hover:bg-amber-400"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <LinkColumn heading="Explore" links={EXPLORE_LINKS} />
          </div>

          <div className="lg:col-span-3">
            <LinkColumn heading="Virasat AI" links={VIRASAT_AI_LINKS} />
          </div>

          <div className="lg:col-span-3">
            <LinkColumn heading="Resources" links={RESOURCE_LINKS} />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} Virasat AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;