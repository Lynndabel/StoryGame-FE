import { Header } from "@/components/LandingPage";
import AboutUs from "@/components/About/AboutUS";

const AboutPage = () => {
  return (
    <main className="w-screen min-h-screen overflow-x-hidden bg-[#333333] text-white">
      {/* Re-use the landing page header for consistent navigation */}
      <Header />
      {/* Main about content */}
      <AboutUs />
    </main>
  );
};

export default AboutPage;
