import Banner from "@/components/pages/dashboard/overview/Banner";
import OverviewPanel from "@/components/pages/dashboard/overview/OverviewPanel";
import CTASection from "@/components/pages/dashboard/overview/CTASection";
import StatsCards from "@/components/pages/dashboard/overview/StatsCards";

const Overview = () => {
  return (
    <div className="p-6 space-y-6">
      <Banner />
      <StatsCards />
      <OverviewPanel />
      <CTASection />
    </div>
  );
};

export default Overview;
