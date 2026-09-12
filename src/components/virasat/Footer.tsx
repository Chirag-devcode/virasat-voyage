import { useState } from "react";
import {
ArrowUpRight,
Check,
Instagram,
Youtube,
Facebook,
Linkedin,
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
return ( <svg
   className={className}
   viewBox="0 0 24 24"
   fill="none"
   stroke="currentColor"
   strokeWidth="1.7"
   strokeLinecap="round"
   strokeLinejoin="round"
   aria-hidden="true"
 > <path d="M5 4l14 16M19 4L5 20" /> </svg>
);
}

function LinkColumn({
heading,
links,
}: {
heading: string;
links: { label: string; href: string }[];
}) {
return ( <nav aria-label={heading}> <h3 className="mb-5 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-lamp">
{heading} </h3>

 
  <ul className="space-y-3">
    {links.map((link) => (
      <li key={link.label}>
        <a
          href={link.href}
          className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-all duration-200 hover:translate-x-0.5 hover:text-foreground"
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
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState("");

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault();

 
const trimmedEmail = email.trim();

if (!trimmedEmail) {
  setError("Please enter your email address.");
  return;
}

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
  setError("Please enter a valid email address.");
  return;
}

setError("");
setSubmitted(true);
 

}

return ( <footer className="relative overflow-hidden border-t border-border bg-background">
{/* Subtle heritage divider */} <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lamp/40 to-transparent" />

 
  <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
    {/* Heritage statement */}
    <div className="mb-12 flex flex-col gap-5 border-b border-border pb-10 sm:mb-14 sm:pb-12 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.35em] text-lamp">
          INDIA · REMEMBERED ALIVE
        </p>

        <h2 className="max-w-2xl font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
          Every tradition has a story.
          <span className="text-lamp-soft"> We help you discover it.</span>
        </h2>
      </div>

      <a
        href="#explore"
        className="group inline-flex w-fit items-center gap-2 border-b border-lamp/40 pb-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-lamp hover:text-lamp-soft"
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
          <span className="font-display text-3xl italic leading-none text-lamp-soft transition-colors duration-200 group-hover:text-lamp">
            Virasat
          </span>

          <span className="font-mono text-[9px] tracking-[0.32em] text-holo-cyan">
            A.I.
          </span>
        </a>

        <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:-translate-y-1 hover:border-lamp/50 hover:bg-lamp/5 hover:text-lamp-soft"
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
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:-translate-y-1 hover:border-lamp/50 hover:bg-lamp/5 hover:text-lamp-soft"
          >
            <XIcon className="h-4 w-4" />
          </a>
        </div>

        <p className="mt-8 max-w-xs font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">
          Stories · Traditions · Places · People
        </p>
      </div>

      {/* Explore */}
      <div className="lg:col-span-2">
        <LinkColumn heading="Explore" links={EXPLORE_LINKS} />
      </div>

      {/* Virasat AI */}
      <div className="lg:col-span-2">
        <LinkColumn heading="Virasat AI" links={VIRASAT_AI_LINKS} />
      </div>

      {/* Resources */}
      <div className="lg:col-span-2">
        <LinkColumn heading="Resources" links={RESOURCE_LINKS} />
      </div>

      {/* Newsletter */}
      <div className="sm:col-span-2 lg:col-span-2">
        <h3 className="mb-5 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-lamp">
          Stay Connected
        </h3>

        <p className="mb-5 text-sm leading-6 text-muted-foreground">
          Stay connected with India's living heritage. Get stories,
          discoveries, and cultural experiences delivered to you.
        </p>

        {submitted ? (
          <div
            role="status"
            className="flex items-start gap-3 rounded-lg border border-lamp/30 bg-lamp/5 px-4 py-3.5 text-sm text-lamp-soft"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0" />

            <div>
              <p className="font-medium">You're subscribed.</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Thank you for staying connected.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-2.5">
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
              autoComplete="email"
              aria-invalid={Boolean(error)}
              aria-describedby={
                error ? "footer-email-error" : undefined
              }
              className="h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/50 focus:border-lamp/50 focus:ring-2 focus:ring-lamp/10"
            />

            {error && (
              <p
                id="footer-email-error"
                className="px-1 text-xs text-destructive"
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-lamp/90 px-4 font-mono text-[10px] font-medium tracking-[0.2em] text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-lamp hover:shadow-lg hover:shadow-lamp/10 active:translate-y-0"
            >
              SUBSCRIBE
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </form>
        )}
      </div>
    </div>

    {/* Bottom bar */}
    <div className="mt-14 border-t border-border pt-6 sm:mt-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-muted-foreground">
          © 2026 Virasat AI. Preserving India's heritage, one story at a
          time.
        </p>

        <nav
          aria-label="Legal"
          className="flex flex-wrap items-center gap-x-5 gap-y-2"
        >
          <a
            href="#explore"
            className="text-xs text-muted-foreground transition-colors hover:text-lamp-soft"
          >
            Privacy
          </a>

          <a
            href="#explore"
            className="text-xs text-muted-foreground transition-colors hover:text-lamp-soft"
          >
            Terms
          </a>

          <a
            href="#explore"
            className="text-xs text-muted-foreground transition-colors hover:text-lamp-soft"
          >
            Contact
          </a>
        </nav>
      </div>
    </div>
  </div>
</footer>
 

);
}
