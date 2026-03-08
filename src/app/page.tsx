import NavbarDemo from "@/components/resizable-navbar-demo";
import { ShaderHero } from "@/components/ui/shader-hero";
import { DeviceShowcaseSection } from "@/components/device-showcase-section";
import { AboutSection } from "@/components/about-section";
import { CollaborationSection } from "@/components/collaboration-section";
import { FooterSection } from "@/components/footer-section";
import { Highlighter } from "@/components/ui/highlighter";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <NavbarDemo />
      <ShaderHero
        title={
          <>
            Your{" "}
            <Highlighter action="highlight" color="#44c4ee" isView>
              AI Computer
            </Highlighter>{" "}
            <Highlighter action="underline" color="#237996" isView>
              Automation Assistant
            </Highlighter>
          </>
        }
        subtitle="Control your computer with natural language. Just say what you want, and ALFRED handles the clicks, keystrokes, and navigation for you."
        eyebrow="AI-Powered Automation"
        ctaLabel="Test Drive Alfred"
        ctaHref="#download"
      />
      <DeviceShowcaseSection />
      <AboutSection />
      <CollaborationSection />
      <FooterSection />
    </main>
  );
}
