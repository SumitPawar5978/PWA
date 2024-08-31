import React from "react";
import PropertyCard from "@/src/components/common/propertyCard";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Propimg1 from "@/public/assets/images/property/prop-list1.png";
import Propimg2 from "@/public/assets/images/property/prop-list2.png";
import Propimg3 from "@/public/assets/images/property/prop-list3.png";
import { poppins_400, roboto_400 } from "@/src/components/common/font";
import { useSelector } from "react-redux";
const ScheduleProperty = () => {
  const selectedProperty = useSelector(
    (state) => state.reducer.selectedProperty
  );
  const cardArr = [
    {
      img: [Propimg1, Propimg2, Propimg3],
      title: "401 Biscayne Boulevard, Miami",
      area: "480 Sq Ft",
      bathroom: "2 Bathrooms",
      bedroom: "2 Bedrooms",
      price: "15,2500",
    },
  ];


  return (
    <>
    <Grid container>
    <Grid item md={12} sm={6} xs={12}>
    {selectedProperty?.data.map((item, index) => (
        <Box key={index}>
          <PropertyCard
          status={item.status}
            property_id={item.property_id}
            imgUrl={item.property_images_arr}
            title={item.title}
            area={item.sqFtarea}
            bathroom={item.bathroomCount}
            bedroom={item.bhkType}
            max_price={item.max_price}
            isCheckBoxTrue={false}
            isCheckedTrue={false}
            isAmenities={true}
            routingUrl={
              "/property/" +
              item.title.replace(/\s+/g, "-") +
              "-" +
              item.property_id
            }
            verified_flag={item.verified_flag}
          />
        </Box>
      ))}
    </Grid>
    <Grid item md={12} sm={6} xs={12} sx={{paddingLeft:{md:'0',sm:'20px'}}}>
      
    <Box bgcolor={"#fff"} mt={2}>
        <Typography className={poppins_400.className} p={3} fontSize={"18px"}>
          Address
        </Typography>
        <Divider />
        <Box p={3}>
          <Typography
            className={roboto_400.className}
            fontSize={"14px"}
            lineHeight={"24px"}
            color={"#9B9B9B"}
          >
            Plot No/House No. :{" "}
            <Typography color={"#151515"} variant={"span"}>
              {" "}
              {selectedProperty?.data[0]?.house_no}
            </Typography>
          </Typography>
          <Typography
            className={roboto_400.className}
            fontSize={"14px"}
            lineHeight={"24px"}
            color={"#9B9B9B"}
          >
            Area :
            <Typography color={"#151515"} variant={"span"}>
              {" "}
              {selectedProperty?.data[0]?.area}
            </Typography>
          </Typography>
          <Typography
            className={roboto_400.className}
            fontSize={"14px"}
            lineHeight={"24px"}
            color={"#9B9B9B"}
          >
            Landmark :
            <Typography color={"#151515"} variant={"span"}>
              {" "}
              {selectedProperty?.data[0]?.landmark}
            </Typography>
          </Typography>
          <Typography
            className={roboto_400.className}
            fontSize={"14px"}
            lineHeight={"24px"}
            color={"#9B9B9B"}
          >
            City:
            <Typography color={"#151515"} variant={"span"}>
              {" "}
              {selectedProperty?.data[0]?.city}
            </Typography>
          </Typography>
          <Typography
            className={roboto_400.className}
            fontSize={"14px"}
            lineHeight={"24px"}
            color={"#9B9B9B"}
          >
            District :
            <Typography color={"#151515"} variant={"span"}>
              {" "}
              {selectedProperty?.data[0]?.district}
            </Typography>
          </Typography>
          <Typography
            className={roboto_400.className}
            fontSize={"14px"}
            lineHeight={"24px"}
            color={"#9B9B9B"}
          >
            Zip Code :
            <Typography color={"#151515"} variant={"span"}>
              {" "}
              {selectedProperty?.data[0]?.zip_code}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Grid>
    </Grid>
     

    </>
  );
};

export default ScheduleProperty;
