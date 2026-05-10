"use client";
import Link from "next/link";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Translate } from "@/components/translate";
import { useLanguage } from "@/lib/language-provider";
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-muted/50 border-t pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-xl">
                <Heart className="h-6 w-6 text-primary" fill="currentColor" />
              </div>
              <span className="font-heading font-bold text-xl">HopeBridge</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              <Translate>footer_mission</Translate>
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <XIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <InstagramIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <LinkedinIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
          {}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground"><Translate>Quick Links</Translate></h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">{t("nav_about")}</Link>
              </li>
              <li>
                <Link href="/programs" className="text-muted-foreground hover:text-primary transition-colors">{t("nav_programs")}</Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-muted-foreground hover:text-primary transition-colors"><Translate>volunteer</Translate></Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">{t("nav_contact")}</Link>
              </li>
            </ul>
          </div>
          {}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground"><Translate>contact_us</Translate></h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span><Translate>123 Hope Avenue, Impact City, 10012, India</Translate></span>
              </li>
              <li className="flex gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <span>+91 (555) 123-4567</span>
              </li>
              <li className="flex gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span>hello@hopebridge.org</span>
              </li>
            </ul>
          </div>
          {}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground"><Translate>Newsletter</Translate></h3>
            <p className="text-sm text-muted-foreground">
              <Translate>Subscribe to get the latest news and updates on our impact.</Translate>
            </p>
            <form className="flex flex-col gap-2">
              <Input 
                type="email" 
                placeholder={t("Email address")} 
                className="bg-background rounded-xl"
                required
              />
              <Button type="submit" className="w-full rounded-xl">
                <Translate>Subscribe</Translate>
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} HopeBridge Foundation. <Translate>all_rights_reserved</Translate></p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors"><Translate>Privacy Policy</Translate></Link>
            <Link href="/terms" className="hover:text-primary transition-colors"><Translate>Terms of Service</Translate></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
