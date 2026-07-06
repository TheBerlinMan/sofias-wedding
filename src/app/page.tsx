import HeroFrame from "@/components/HeroFrame";
import HeroStage from "@/components/HeroStage";

export default function Home() {
  return (
    <HeroFrame
      className="fixed inset-0 flex flex-col overflow-hidden bg-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/website-background.webp')" }}
    >
      <HeroStage />
    </HeroFrame>
  );
}
