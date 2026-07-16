import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AmbientBackground } from "@/components/background/AmbientBackground";
import { HeroSection } from "@/components/hero/HeroSection";
import { TechMarquee } from "@/components/hero/TechMarquee";
import { UploadPanel } from "@/components/upload/UploadPanel";
import { ClassesSection } from "@/components/classes/ClassesSection";
import { ModelInfoSection } from "@/components/model/ModelInfoSection";
import { AchievementsSection } from "@/components/results/AchievementsSection";
import { VisualizationsSection } from "@/components/charts/VisualizationsSection";
import { PredictionHistoryPanel } from "@/components/history/PredictionHistoryPanel";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main>
        <HeroSection />
        <TechMarquee />
        <UploadPanel />
        <ClassesSection />
        <ModelInfoSection />
        <AchievementsSection />
        <VisualizationsSection />
        <PredictionHistoryPanel />
      </main>
      <Footer />
    </>
  );
}
