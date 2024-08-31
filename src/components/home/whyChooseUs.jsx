import React from "react";
import WhyChoose from "@/public/assets/images/whychooseus.png";
import FindHome from "@/public/assets/images/icon/findHome.png";
import RentHome from "@/public/assets/images/icon/rentHome.png";
import ExpAgent from "@/public/assets/images/icon/expAgent.png";
import PropList from "@/public/assets/images/icon/propList.png";
import { Box, Container, Grid, Typography } from "@mui/material";

import Image from "next/image";

const WhyChooseUs = () => {
  const chooseusArr = [
    {
      img: FindHome,
      title: "Find Your Future Home",
      desc: "Explore a vast selection of properties and find your perfect home with our user-friendly search tool. From cozy apartments to sprawling estates, we offer diverse options to match your preferences. Browse listings in your desired location and discover a place to call your own.",
    },
    {
      img: RentHome,
      title: "Buy Or Rent Homes",
      desc: "Your perfect property is just a click away. Whether you’re in the market to buy or rent, we offer a curated selection of homes to fit every lifestyle and budget. From urban condos to suburban houses, find your ideal living space with ease.",
    },
    {
      img: ExpAgent,
      title: "Experienced Agents",
      desc: "Connect with our seasoned real estate professionals who are dedicated to guiding you through every step of the buying or renting process. Our agents bring a wealth of knowledge and expertise to ensure a smooth and successful transaction.",
    },
    {
      img: PropList,
      title: "List Your Own Property",
      desc: "List your property with us to enhance its visibility. Our tailored marketing techniques will connect you to a wide range of potential buyers or tenants, while we offer the necessary tools and assistance to present your property in the best light.",
    },
  ];
  return (
    <>
      <Box
        sx={{
          mt: 4,
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "430px",
          backgroundImage: `url(${WhyChoose.src})`,
          boxShadow: "inset 0 0 0 2000px #0d1f37cc;",
        }}
      >
        <Container sx={{ py: 5 }}>
          <Typography
            textAlign={"center"}
            variant="poppins_600"
            component={"p"}
            sx={{fontSize: { md: "50px", sm: "50px", xs: "30px" }}}
            color={"flash.main"}
            letterSpacing={"1.44px"}
          >
            Why{" "}
            <Typography
              variant="poppins_600"
              sx={{fontSize: { md: "50px", sm: "50px", xs: "30px" }}}
              color={"gold.main"}
              component="span"
            >
              Choose
            </Typography>{" "}
            Us
          </Typography>
          <Typography
            textAlign={"center"}
            variant="poppins_600"
            component={"p"}
            sx={{fontSize: { sm: "20px", xs: "15px" }}}
            color={"flash.main"}
            letterSpacing={"1.44px"}
          >
            We Have A Team Of Experienced Real Estate Agents Who Can Help You
            Every Step Of The Way.
          </Typography>
          <Grid container py={5}>
            {chooseusArr.map((item, index) => (
              <Grid key={index} item md={3} sm={6} py={1}>
                <Box px={5} sx={{display:{xs:'flex',sm:'unset'}, alignItems:'center'}}>
                  <Image
                    src={item.img}
                    alt="FindHome icon"
                    width={65}
                    height={65}
                  />
                 <Box sx={{mx:{sm:1,xs:1}}}>
                 <Typography
                    variant="poppins_500"
                    component={"p"}
                    fontSize={"14px"}
                    color={"flash.main"}
                    py={1.5}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="roboto_400"
                    component={"p"}
                    fontSize={"12px"}
                    color={"crayola.main"}
                    lineHeight={"20px"}
                    letterSpacing={"0.5px"}
                  >
                    {item.desc}
                  </Typography>
                 </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default WhyChooseUs;
