import DonateForm from "./donate-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate | HopeBridge Foundation",
  description: "Make a secure donation to support education, healthcare, food security, and emergency relief for those who need it most.",
};

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-muted/20 py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Emotional Content */}
          <div className="space-y-8 sticky top-24">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                Every rupee creates impact
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-heading mb-4 leading-tight">
                Your Support <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-500 to-teal-500">
                  Saves Lives
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join our community of 12,000+ donors and make a lasting impact. Your donation goes directly to those who need it most — providing food, education, and medical care to families across India.
              </p>
            </div>

            {/* Trust Card */}
            <div className="bg-background rounded-[2rem] p-8 border border-border shadow-sm">
              <h3 className="text-xl font-bold font-heading mb-6">Why give to HopeBridge?</h3>
              <ul className="space-y-5">
                {[
                  { text: "100% of your donation funds our programs directly.", highlight: "100%" },
                  { text: "We provide transparent monthly financial reports.", highlight: "transparent" },
                  { text: "Your donation is tax-deductible under Section 80G.", highlight: "tax-deductible" },
                  { text: "We work with local communities for sustainable impact.", highlight: "sustainable" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-muted-foreground group">
                    <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full text-primary shrink-0 group-hover:scale-110 transition-transform">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Proof */}
            <div className="bg-gradient-to-r from-primary/5 to-emerald-500/5 rounded-[2rem] p-6 border border-primary/10">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex -space-x-2">
                  {[15, 22, 33, 41].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/60?img=${i}`}
                      alt="Donor"
                      className="w-8 h-8 rounded-full border-2 border-background object-cover"
                    />
                  ))}
                </div>
                <p className="text-sm font-medium text-foreground/80">
                  <span className="font-bold text-primary">127 people</span> donated in the last 24 hours
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-background rounded-[2.5rem] p-6 sm:p-8 md:p-10 border border-border shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -z-10 rounded-full" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 blur-3xl -z-10 rounded-full" />
            <DonateForm />
          </div>
        </div>
      </div>
    </div>
  );
}
