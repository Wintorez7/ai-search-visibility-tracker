import Hero from "@/components/sections/Hero";
import TrustedLogos from "@/components/sections/TrustedLogos";
import Features from "@/components/sections/Features";
import MultiCurrency from "@/components/sections/MultiCurrency";
import Integrations from "@/components/sections/Integrations";
import Testimonials from "@/components/sections/Testimonials";
import CTAFooter from "@/components/sections/CTAFooter";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  //  If logged in, go to dashboard
  if (user) redirect("/dashboard");

  return (
    <main className="min-h-screen">
      <Hero />
      <TrustedLogos />
      <Features />
      <Integrations />
      <Testimonials />
      <CTAFooter />
    </main>
  );
}
