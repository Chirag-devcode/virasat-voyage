import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

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
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "YouTube", href: "https://youtube.com", icon: YouTubeIcon },
  { label: "X / Twitter", href: "https://x.com", icon: XIcon },
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 8.5a3 3 0 0 0-2.1-2.1C18 6 12 6 12 6s-6 0-7.9.4A3 3 0 0 0 2 8.5 31 31 0 0 0 2 12a31 31 0 0 0 .1 3.5 3 3 0 0 0 2.1 2.1C6 18 12 18 12 18s6 0 7.9-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.1-3.5Z" />
      <path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4l16 16M20 4 4 20" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h-3a4 4 0 0 0-4 4v3H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7" />
    </svg>
  );
}

function LinkColumn({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={heading}>
      <h3 className="mb-4 font-mono text-[10px] tracking-[0.3em] uppercase text-lamp">{heading}</h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-lamp-soft"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-14">
        {/* Top section: brand + link columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-12 md:gap-6">
          {/* Brand / intro */}
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl italic leading-none text-lamp-soft">Virasat</span>
              <span className="font-mono text-[9px] tracking-[0.32em] text-holo-cyan">A.I.</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              India, remembered alive. Explore, preserve, and experience India's living heritage through stories, traditions, crafts, places, and people.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-lamp/50 hover:text-lamp-soft"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            <LinkColumn heading="Explore" links={EXPLORE_LINKS} />
          </div>

          {/* Virasat AI */}
          <div className="md:col-span-2">
            <LinkColumn heading="Virasat AI" links={VIRASAT_AI_LINKS} />
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <LinkColumn heading="Resources" links={RESOURCE_LINKS} />
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-2">
            <h3 className="mb-4 font-mono text-[10px] tracking-[0.3em] uppercase text-lamp">Stay Connected</h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Stay connected with India's living heritage. Get stories, discoveries, and cultural experiences delivered to you.
            </p>
            {submitted ? (
              <div className="flex items-center gap-2 rounded-md border border-lamp/30 bg-lamp/5 px-3 py-2.5 text-sm text-lamp-soft">
                <Check className="h-4 w-4 shrink-0" />
                <span>You're subscribed. Thank you!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2" noValidate>
                <label htmlFor="footer-email" className="sr-only">
                  Enter your email
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your email"
                  className="h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-lamp/50 focus:outline-none focus:ring-1 focus:ring-lamp/30"
                  aria-invalid={!!error}
                  aria-describedby={error ? "footer-email-error" : undefined}
                />
                {error && (
                  <p id="footer-email-error" className="text-xs text-destructive">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="group flex h-10 w-full items-center justify-center gap-2 rounded-md bg-lamp/90 px-4 font-mono text-[11px] tracking-[0.18em] text-primary-foreground transition-all duration-200 hover:bg-lamp"
                >
                  SUBSCRIBE
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border pt-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; 2026 Virasat AI. Preserving India's heritage, one story at a time.
            </p>
            <nav aria-label="Legal" className="flex items-center gap-5">
              <a href="#explore" className="text-xs text-muted-foreground transition-colors duration-200 hover:text-lamp-soft">
                Privacy
              </a>
              <a href="#explore" className="text-xs text-muted-foreground transition-colors duration-200 hover:text-lamp-soft">
                Terms
              </a>
              <a href="#explore" className="text-xs text-muted-foreground transition-colors duration-200 hover:text-lamp-soft">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
