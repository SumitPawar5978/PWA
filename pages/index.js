import Head from "next/head";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/src/utils/theme";
import HeroSection from "@/src/components/home/hero";
import GetStartWithUs from "@/src/components/home/getStartWithUs";
import WhyChooseUs from "@/src/components/home/whyChooseUs";
import Testimonial from "@/src/components/home/testimonial";
import DownloadApp from "@/src/components/home/downloadApp";
import Ad from "@/src/components/common/ad";
import SeoDetails from "@/src/components/common/seoDetails";
import { useRouter } from "next/router";
import AddToHomeScreen from "@/src/components/common/AddToHomeScreen";
export default function Home() {
  const router = useRouter();
  const currentPath = router.asPath;
  const seoDetails={
    title:'Home',
    description:"Dhanjee is a comprehensive platform that caters to all aspects of consumers’ needs in the real estate industry. As an online forum, it facilitates seamless information exchange among buyers, sellers, and brokers/agents. Our mission is simple: to connect people with their dream properties. Whether you’re a first-time property buyer, an experienced investor, or someone looking to sell their property, we’re here to guide you every step of the way. We combine our expertise, market knowledge, and personalized service to ensure that your real estate journey is smooth, successful, and stress-free.",
    image: "favicon.ico",
    url: `https://agentportal.com${currentPath}`,
  }

  console.log(seoDetails,'seoDetails')
  return (
    <>

<SeoDetails  seoData={seoDetails}/>   

  
        <HeroSection />
        <GetStartWithUs/>
        <Ad pageName="Home" section="Section 1"/>
        <WhyChooseUs/>
        <AddToHomeScreen />
        <Testimonial/>
                <Ad pageName="Home" section="Section 2" />
        <DownloadApp color="#F3F4F9" shadow="unset"/>
 
    </>
  );
}
