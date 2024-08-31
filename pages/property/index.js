import Head from "next/head";
import {
  Box,
  Container,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { theme } from "@/src/utils/theme";

import PropertyList from "@/src/components/property/propertyList";
import PropListSidebar from "@/src/components/property/propListSidebar";
import Breadcrumb from "@/src/components/common/breadcrumb";
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SeoDetails from "@/src/components/common/seoDetails";
export default function Index() {

  const searchParams = useSearchParams()
const [filter, setFilter] = useState({})
  useEffect(() => {
    const paramsObj={}
    const range=[]
  for (const p of searchParams) {
    console.log(p,'searchparam')
    if(p[0]==='minMax'){
      range.push(p[1])
    }
    paramsObj[p[0]]=p[1]
   
  }
 if(range.length>0){
  paramsObj['minMax']=range
 }
  setFilter({...paramsObj})
  }, [searchParams])
  
  const router = useRouter();
  const currentPath = router.asPath;
  const seoDetails={
    title:'Property-List',
    description:"Dhanjee is a comprehensive platform that caters to all aspects of consumers’ needs in the real estate industry. As an online forum, it facilitates seamless information exchange among buyers, sellers, and brokers/agents. Our mission is simple: to connect people with their dream properties. Whether you’re a first-time property buyer, an experienced investor, or someone looking to sell their property, we’re here to guide you every step of the way. We combine our expertise, market knowledge, and personalized service to ensure that your real estate journey is smooth, successful, and stress-free.",
    image: "favicon.ico",
    url: `https://agentportal.com${currentPath}`,
  }
  return (
    <>
    <SeoDetails  seoData={seoDetails}/>   
   
      <Breadcrumb page_name="Property List" />
        <Box bgcolor={"#F3F4F9"}>
          <Container sx={{ py: 8 }} >
            <Grid container>
              <Grid item md={4} xs={12} sx={{order:{xs:1,md:0}}}>
              <PropListSidebar/>
              </Grid>
              <Grid item md={8} xs={12} sx={{pl:{md:3, order:{xs:0,md:1}}}}>
                <PropertyList filters={filter}/>
              </Grid>
            </Grid>
          </Container>
        </Box>
    </>
  );
}
