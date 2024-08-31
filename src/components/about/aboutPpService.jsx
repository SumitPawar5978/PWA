import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import logoXl from "@/public/assets/images/logo_xl.svg";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
const AboutPpService = () => {
  return (
    <>
      <Container>
        <Grid container alignItems={"center"} py={5}>
          <Grid item md={5} xs={12} px={8}>
          <Image
              src={logoXl}
              alt="logo xl"
              width={500}
              height={500}
              sizes="100vw"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Grid>
          <Grid item md={7} xs={12}>
            <Typography
              className={styles.poppins_600}
              sx={{ fontSize: { md: "50px", sm: "50px", xs: "30px" } }}
              letterSpacing={"1.44px"}
              color={"space.main"}
            >
              About{" "}
              <Typography variant="span" color={"gold.main"}>
                Dhanjee{" "}
              </Typography>{" "}
            </Typography>
            <Typography
              className={styles.poppins_600}
              sx={{ fontSize: { sm: "20px", xs: "15px" } }}
              letterSpacing={"1.44px"}
              color={"space.main"}
            >
              Let us help you make the move to your dream property.
            </Typography>
            <Typography
              className={styles.poppins_600}
              fontSize={"16px"}
              // letterSpacing={"1.44px"}
              color={"#1A2B5699"}
              lineHeight={"30px"}
              paddingTop={"20px"}
              textAlign={"justify"}
            >
              Dhanjee is a comprehensive platform that caters to all aspects of
              consumers’ needs in the real estate industry. As an online forum,
              it facilitates seamless information exchange among buyers,
              sellers, and brokers/agents.
            </Typography>
            <Typography
              className={styles.poppins_600}
              fontSize={"16px"}
              // letterSpacing={"1.44px"}
              color={"#1A2B5699"}
              lineHeight={"30px"}
              paddingTop={"10px"}
              textAlign={"justify"}
            >
              Our mission is simple: to connect people with their dream properties.
              Whether you’re a first-time property buyer, an experienced investor, or
              someone looking to sell their property, we’re here to guide you
              every step of the way. We combine our expertise, market knowledge,
              and personalized service to ensure that your real estate journey
              is smooth, successful, and stress-free.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AboutPpService;
