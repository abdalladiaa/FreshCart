
import FeaturesSection from "@/components/FeaturesSection/FeaturesSection";
import Homeslider from "@/components/Slider/HomeSlider";

export default function Home() {
  return <>
  {/* Slider */}
  <div className="relative">
<Homeslider />
  </div>
  <FeaturesSection/>
  </>
}
