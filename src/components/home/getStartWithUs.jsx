import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import DreamHome from "@/public/assets/images/icon/dreamHome.png";
import CommercialSpace from "@/public/assets/images/icon/commercialSpace.png";
import DreamPlot from "@/public/assets/images/icon/dreamPlot.png";
import DreamLand from "@/public/assets/images/icon/dreamLand.png";
import FeatureCard from "../common/featureCard";

const GetStartWithUs = () => {

  const getstartArr = [
    {
      img: DreamHome,
      title: "Dream Home",
      desc: "Discover your perfect residence from our extensive collection of properties. Whether you're looking for a cozy suburban retreat or a luxurious city dwelling, we have options to suit every dream and budget.",
      type:'Residential'
    },
    {
      img: CommercialSpace,
      title: "Commercial Space",
      desc: "Elevate your business with our prime commercial spaces. From high-traffic retail locations to modern office suites, find the ideal spot that aligns with your company's vision and growth.",
      type:'Commercial'
    },
    {
      img: DreamPlot,
      title: "Dream Plot",
      desc: "Shape your future with the freedom to choose. Explore our collection of residential plots that provide a blank canvas for you to bring your dream home to life in the community you desire.",
      type:'Plot'
    },
    {
      img: DreamLand,
      title: "Dream Land",
      desc: "Invest in potential with our diverse range of land parcels. Whether for agriculture, development, or long-term investment, our lands promise opportunity and prosperity.",
      type:'Land'
    },
  ];

  return (
    <>
      <Container sx={{ pt: 5 }}>
        <Typography
          variant="poppins_600"
          component={"p"}
          textAlign={"center"}
          color={"space.main"}
          letterSpacing={"1.44px"}
          sx={{fontSize: { md: "50px", sm: "50px", xs: "30px" }}}
        >
          Get{" "}
          <Typography
            variant="poppins_600"
            sx={{fontSize: { md: "50px", sm: "50px", xs: "30px" }}}
            color={"gold.main"}
            component="span"
          >
            Started
          </Typography>{" "}
          With Us
        </Typography>
        <Typography
          textAlign={"center"}
          variant="poppins_600"
          component={"p"}
          color={"space.main"}
          letterSpacing={"1.44px"}
          sx={{fontSize: {sm: "20px", xs: "15px" }}}
        >
          Let Us Help You Make The Move To Your Dream Property.
        </Typography>
        <Grid container py={5}>
          {getstartArr.map((item, index) => (
            <Grid key={index} item md={3} sm={6} p={1}>
              <FeatureCard
                icon={item.img}
                title={item.title}
                desc={item.desc}
                type={item.type}
                isCursor={true}
                bgcolor="#fff"
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box pb={5}></Box>
    </>
  );
};

export default GetStartWithUs;
