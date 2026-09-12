import React, { useState } from "react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

 
const trimmedEmail = email.trim();

          <p className="text-sm text-stone-600 leading-relaxed">
            Blending tradition with modern trends, Indian Virasat celebrates the essence of today's woman through timeless ethnic, fusion, and western styles crafted with elegance and detail.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 pt-1">
            {/* Facebook */}
            <a href="#" className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-700 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            {/* Instagram */}
            <a href="#" className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-700 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            {/* YouTube */}
            <a href="#" className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-700 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            {/* X / Twitter */}
            <a href="#" className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-700 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            {/* Pinterest */}
            <a href="#" className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-700 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>

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

        {/* Join Our Email List */}
        <div className="space-y-3 pt-2">
          <h3 className="font-serif italic font-semibold text-base tracking-wider text-stone-900 uppercase">
            JOIN OUR EMAIL LIST
          </h3>
          <p className="text-sm text-stone-600">
            Get exclusive deals and early access to new products.
          </p>

          <form onSubmit={handleSubmit} className="relative mt-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full py-3.5 pl-6 pr-14 rounded-full border border-stone-300 text-sm text-stone-800 bg-white placeholder-stone-400 focus:outline-none focus:border-stone-500 shadow-sm"
            />
            {/* Floating WhatsApp Button */}
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md hover:bg-emerald-600 transition"
              title="Chat on WhatsApp"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>
          </form>
        </div>

        {/* Copyright Footer */}
        <div className="pt-6 text-center text-xs text-stone-500 font-sans tracking-wide">
          © 2026 Indianvirasat
        </div>

      </div>
    </div>
  </div>
</footer>
 

);
}

export default Footer;