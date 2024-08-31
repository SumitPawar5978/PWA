import React from "react";
import Breadcrumb from "@/src/components/common/breadcrumb";
import { Box} from "@mui/material";
import Head from "next/head";
import Testimonial from "@/src/components/home/testimonial";
import DownloadApp from "@/src/components/home/downloadApp";
import HowWorks from "@/src/components/about/howWorks";
import WhyChooseUs from "@/src/components/about/whyChooseUs";
import AboutPpService from "@/src/components/about/aboutPpService";
import { useRouter } from "next/router";
import SeoDetails from "@/src/components/common/seoDetails";

export const getServerSideProps=async(context)=>{

   const seoDetails={
     title: "About-us",
     description: "Dhanjee is a comprehensive platform that caters to all aspects of consumers’ needs in the real estate industry. As an online forum, it facilitates seamless information exchange among buyers, sellers, and brokers/agents. Our mission is simple: to connect people with their dream properties. Whether you’re a first-time property buyer, an experienced investor, or someone looking to sell their property, we’re here to guide you every step of the way. We combine our expertise, market knowledge, and personalized service to ensure that your real estate journey is smooth, successful, and stress-free.",
     image: "favicon.ico",
     url: `https://agentportal.com${context.resolvedUrl}`,
   }
   return{
     props:{seoDetails:seoDetails}
   }
 
 }
const Index = () => {

  return (
    <>      

      <Box>
        <Breadcrumb page_name="About Us" />
        <AboutPpService />
        <WhyChooseUs />
        <HowWorks />
        <Testimonial />
        <Box>
          <DownloadApp
            color="#fff"
            shadow="drop-shadow(1px 1px 5px #00000040)"
          />
        </Box>
      </Box>
    </>
  );
};

export default Index;
