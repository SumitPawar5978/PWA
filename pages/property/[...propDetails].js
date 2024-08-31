import React from 'react'
import Head from "next/head";
import {
    Box,
  Container,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "@/src/utils/theme";
import PropertyDetails from '@/src/components/property/propDetails';
import Breadcrumb from '@/src/components/common/breadcrumb';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import { setSchedulePropId } from '@/src/app/reducer';
import { getAllPropertyDetail, getIndividualPropertyDetail } from '@/src/utils/axios';
import SeoDetails from '@/src/components/common/seoDetails';
// export const getStaticPaths = async () => {
//   try {
//     let data = await getAllPropertyDetail({
//       type: "",
//       order: "",
//       district: "Aurangabad",
//       status: "",
//       bhkType: "",
//       min_price: "",
//       max_price: "",
//       page: 1,
//     });
//     // Check if data and its nested properties exist
//     let properties = data?.data?.data?.properties;
//     if (!properties || !Array.isArray(properties)) {
//       return {
//         paths: [],
//         fallback: true,
//       };
//     }
//     // Map the paths
//     let AllPath = properties.map((item) => ({
//       // params: { id: item?.property_id?.toString() },
//       params: { propDetails: `${item.title.replace(" ","-")}-${item.property_id}` },
//     }));
// console.log(AllPath,'all path')
//     return {
//       paths: AllPath,
//       fallback: true,
//     };
//   } catch (error) {
//     console.error("Error in getStaticPaths:", error);
//     return {
//       paths: [],
//       fallback: true,
//     };
//   }
// };

export const getStaticPaths = async () => {
  try {
    let res = await fetch("https://stage.ekatta.tech/agentportal-dashboard/public/api/getAllPropertySlug");
    let data = await res.json();

    const paths = data?.propertyArr?.map((item) => ({
      params: { propDetails: [`${item.title.replace(/ /g, "-")}-${item.property_id}`] },
    })) || [];

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      paths: [],
      fallback: true,
    };
  }
};
export const getStaticProps =async (context)=>{
 try{
  let id = context.params.propDetails[0].split("-")[context.params.propDetails[0].split("-").length - 1];
  let res = await getIndividualPropertyDetail(`${id}`);
  console.log(res?.data,'ressss')
  const seoDetails={
    title: res?.data.data[0].title,
    description: res?.data.data[0].description,
    image: "favicon.ico",
    url: `https://agentportal.com${context.resolvedUrl}`,
  }
  return{
    props:{data:res?.data || null,},
    revalidate: 1,
  }
 }catch(err){
    return{
      notFound:true
    }
 }
}
const PropDetails = ({data}) => {
  const selectedCityName = useSelector((state) => state.reducer.selectCity);
    const dispatch=useDispatch()
  const router = useRouter();
  const currentPath = router.asPath;
  dispatch(setSchedulePropId(data?.data[0].property_id))
  // }
  return (
    <>
      <Breadcrumb root_page="Property" root_page_path={`property/?&district=${selectedCityName}`} page_name="Property Details" />
      <Box bgcolor={"#F3F4F9"}>
        <Container sx={{ py: 8 }}>
            <PropertyDetails  data={data} property_id={data?.data[0].property_id}/>
        </Container>
        </Box>
    </>
  )
}
export default PropDetails