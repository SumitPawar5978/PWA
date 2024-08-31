import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import FeatureCard from "@/src/components/common/featureCard";
import DreamHome from '@/public/assets/images/icon/dreamHome.png'
import CommercialSpace from '@/public/assets/images/icon/commercialSpace.png'
import DreamPlot from '@/public/assets/images/icon/dreamPlot.png'
import DreamLand from '@/public/assets/images/icon/dreamLand.png'
import styles from "@/styles/Home.module.css";
const WhyChooseUs = () => {
    const whyChooseArr=[
        {
            img:DreamHome,
            title:'Find Dream Property',
            desc:'Find your dream home from our wide range of properties. Whether you prefer a cozy apartment or a spacious estate, we offer diverse options to match your preferences and budget in any location. Begin your search today and make your dream home a reality.',
        },
        {
            img:CommercialSpace,
            title:'Verified Property’s',
            desc:'Trust and transparency are at the heart of our listings. Every property featured on our site undergoes a thorough verification process to ensure accuracy and peace of mind. Browse our verified properties to find a place you can call home without any doubts.',
        },
        {
            img:DreamPlot,
            title:'Schedule Property Visit',
            desc:'Believe it when you see it. Schedule property visits effortlessly, at your convenience. Our user-friendly scheduling tool allows you to plan viewings according to your busy life, guaranteeing you never miss the chance to explore a potential home.',
        },
        {
            img:DreamLand,
            title:'List Your Property',
            desc:'Reach the right audience by listing your property with us. Our platform connects sellers with serious buyers, making the process of selling your home as smooth as possible. Benefit from our market expertise and list your property today to start receiving offers.',
        },
    ]
  return (
    <>
      <Box bgcolor={"#F3F4F999"} textAlign={"center"} py={5}>
          <Container>
            <Typography
               className={styles.poppins_600}
               sx={{fontSize: { md: "50px", sm: "50px", xs: "30px" }}}
              letterSpacing={"1.44px"}
              color={"space.main"}
            >
              Why{" "}
              <Typography variant="span" color={"gold.main"}>
                Choose{" "}
              </Typography>{" "}
              Us
            </Typography>
            <Typography
               className={styles.poppins_600}
               sx={{fontSize: {sm: "20px", xs: "15px" }}}
              letterSpacing={"1.44px"}
              color={"space.main"}
            >
              We have a team of experienced real estate agents who can help you
              every step of the way.
            </Typography>

            <Grid container py={5} textAlign={'left'}>
            {
              whyChooseArr.map((item,index)=>(
               <Grid key={index} item md={3} sm={6} px={1}>
                 <FeatureCard
                icon={item.img}
                title={item.title}
                desc={item.desc}
                bgcolor="#fff"
                isCursor={false}
                />
               </Grid>
              ))
            }
            </Grid>
          </Container>
        </Box>
    </>
  )
}

export default WhyChooseUs