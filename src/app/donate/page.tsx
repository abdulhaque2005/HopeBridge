import DonateForm from "./donate-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate | HopeBridge Foundation",
  description: "Make a donation to support our causes.",
};

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-muted/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 sticky top-24">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4">
                Your Support <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                  Saves Lives
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join our community of donors and make a lasting impact. Your donation goes directly to those who need it most, providing food, education, and medical care.
              </p>
            </div>

            <div className="bg-background rounded-3xl p-8 border border-border shadow-sm">
              <h3 className="text-xl font-bold font-heading mb-6">Why give to HopeBridge?</h3>
              <ul className="space-y-4">
                {[
                  "100% of your donation funds our programs directly.",
                  "We provide transparent monthly financial reports.",
                  "Your donation is tax-deductible.",
                  "We work with local communities to ensure sustainable impact."
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <div className="mt-1 bg-primary/10 p-1 rounded-full text-primary shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-background rounded-[2.5rem] p-6 sm:p-8 md:p-10 border border-border shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -z-10 rounded-full" />
            <DonateForm />
          </div>
        </div>
      </div>
    </div>
  );
}
