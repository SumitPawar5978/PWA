import React, { useEffect, useState } from "react";
import { Box, Container, Button, Grid, Typography, Stack } from "@mui/material";
import {
  poppins_400,
  poppins_500,
  poppins_600,
  roboto_400,
} from "@/src/components/common/font";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/src/utils/theme";
import RectangleIcon from "@mui/icons-material/Rectangle";
import Divider from "@mui/material/Divider";
import LightLogo from "@/public/assets/images/logoLight.png";
import Image from "next/image";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "@/src/app/reducer";
import { getContactDetail } from "@/src/utils/axios";
const Footer = () => {
  const dispatch = useDispatch();
  const loginUserDetails = useSelector((state) => state.reducer.userDetails);
  const agentUserDetails = useSelector((state) => state.reducer.agentUserDetails);
  const selectedCityName = useSelector((state) => state.reducer.selectCity);
  const handleUserRole = (role) => {
    dispatch(setRole(role));
  };

  const [contactDetails, setContactDetails] = useState();
  const getContactDetails = async () => {
    let res = await getContactDetail({ district: selectedCityName });

    setContactDetails(res?.data?.data);
  };
  useEffect(() => {
    getContactDetails();
  }, [selectedCityName]);
  return (
    <>
      <Box sx={{ backgroundColor: "maastricht.main" }}>
        <Container sx={{ py: 5 }}>
          <Box textAlign={"center"}>
            <Typography
              variant="poppins_600"
              component={"p"}
              sx={{fontSize: { md: "50px", sm: "50px", xs: "30px" }}}
              color={"flash.main"}
              letterSpacing={"1.44px"}
            >
              Be{" "}
              <Typography
                variant="poppins_600"
                sx={{fontSize: { md: "50px", sm: "50px", xs: "30px" }}}
                color={"gold.main"}
                component="span"
              >
                A
              </Typography>{" "}
              Part Of Our Real Estate Agents
            </Typography>
            <Typography
              variant="poppins_600"
              component={"p"}
              sx={{fontSize: {sm: "20px", xs: "15px" }}}
              color={"flash.main"}
              letterSpacing={"1.44px"}
            >
              Work With The Best In The Business And Earn Competitive
              Commissions.
            </Typography>
            <Link href={"/registration"}>
              {" "}
              <Button
                onClick={() => handleUserRole("Agent")}
                className={styles.poppins_600}
                fullWidth
                variant="contained"
                sx={{
                  border: "3px solid #B58A44",
                  borderRadius: "75px",
                  backgroundColor: "gold.main",
                  padding: "7px",
                  color: "space.main",
                  fontSize: "18px",
                  fontWeight: "bold",
                  width: "fit-content",
                  px: 3,
                  my: 3,
                }}
              >
                Apply For Real Estate Agent
              </Button>
            </Link>
          </Box>

          <Grid container justifyContent={'center'}>
            <Grid
              item
              md
              xs={12}
              sx={{
                pr: { md: 5, xs: 0 },
                textAlign: { md: "left", xs: "center" },
                py: { md: 0, xs: 2 },
              }}
            >
              <Typography
                variant="poppins_600"
                component={"p"}
                color={"#fff"}
                fontSize={"22px"}
              >
                <RectangleIcon
                  sx={{ verticalAlign: "sub", color: "#FDDE52", p: 0.5, mr: 1 }}
                />{" "}
                About us
              </Typography>
              <Box pt={3}>
                <Link href={"/"}>
                  <Image
                    src={LightLogo}
                    alt="DreamHome icon"
                    width={190}
                    height={81}
                  />
                </Link>
                <Typography
                  variant="roboto_400"
                  component={"p"}
                  letterSpacing={"1.44px"}
                  color={"#fff"}
                  fontSize={"14px"}
                  pt={2}
                >
                  Our App Makes It Easy To Search For Homes, Save Your
                  Favorites, And Contact Real Estate Agents.
                </Typography>
              </Box>
            </Grid>
            <Divider
              orientation="vertical"
              sx={{
                borderColor: "#454A5F",
                display: { md: "block", xs: "none" },
              }}
              flexItem
            />
            <Grid item md sm sx={{px:{sm:5,xs:0}}}>
              <Typography
                variant="poppins_600"
                component={"p"}
                color={"#fff"}
                sx={{fontSize:{sm:'22px',xs:'16px'}}}
              >
                <RectangleIcon
                  sx={{ verticalAlign: "sub", color: "#FDDE52", p: 0.5, mr: 1 }}
                />{" "}
                Contact Us
              </Typography>
              <Stack sx={{pl:2, flexDirection:{sm:'column', xs:'row'}, flexWrap:'wrap', columnGap:2}}>
                <Link href={`tel:${contactDetails?.phone_no}`} style={{ textDecoration: "none" }}>
                  <Typography
                    variant="poppins_400"
                    component={"p"}
                    sx={{fontSize:{sm:'17px',xs:'13px'}}}
                    letterSpacing={"1.44px"}
                    color={"#fff"}
                    py={1.5}
                  >
                    <CallIcon
                      sx={{
                        color: "rackley.dark",
                        verticalAlign: "middle",
                        mr:{sm:1,xs:0},
                        fontSize:{sm:'1.5rem',xs:'1rem'}
                      }}
                    />{" "}
                    {contactDetails?.phone_no}
                  </Typography>
                </Link>
                <Link
                    href={`mailto:${contactDetails?.email}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="poppins_400"
                    component={"p"}
                    sx={{fontSize:{sm:'17px',xs:'13px'}}}
                    letterSpacing={"1.44px"}
                    color={"#fff"}
                    py={1.5}
                  >
                    <MailOutlineIcon
                      sx={{
                        color: "rackley.dark",
                        verticalAlign: "middle",
                        mr:{sm:1,xs:0},
                        fontSize:{sm:'1.5rem',xs:'1rem'}
                      }}
                    />{" "}
                    {contactDetails?.email}
                  </Typography>
                </Link>
                <Link href="#" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="poppins_400"
                    component={"p"}
                    sx={{fontSize:{sm:'17px',xs:'13px'}}}
                    letterSpacing={"1.44px"}
                    color={"#fff"}
                    py={1.5}
                  >
                    <LocationOnIcon
                      sx={{
                        color: "rackley.dark",
                        verticalAlign: "middle",
                        mr:{sm:1,xs:0},
                        fontSize:{sm:'1.5rem',xs:'1rem'}
                      }}
                    />{" "}
                    {contactDetails?.address}
                  </Typography>
                </Link>
              </Stack>
            </Grid>
            <Divider
              orientation="vertical"
              sx={{ borderColor: "#454A5F",display:{sm:'block',xs:'none'} }}
              flexItem
            />
            <Grid item md sm sx={{pl:{sm:5,xs:0}}}>
              <Typography
                variant="poppins_600"
                component={"p"}
                color={"#fff"}
                sx={{fontSize:{sm:'22px',xs:'16px'}}}
              >
                <RectangleIcon
                  sx={{ verticalAlign: "sub", color: "#FDDE52", p: 0.5, mr: 1 }}
                />{" "}
                Important links
              </Typography>
              <Stack sx={{ pl:{sm:5,xs:2}, flexDirection:{sm:'column', xs:'row'}, flexWrap:'wrap', columnGap:2 }}>
                <Link  href={
              loginUserDetails
                ? (agentUserDetails.role === 'Agent' ? "https://stage.ekatta.tech/agentportal-dashboard/public/validate_login/"+btoa(`${agentUserDetails?.email} ${agentUserDetails?.password} addProperty`) : '/property/postProperty')
                : '/login'
            }
             style={{ textDecoration: "none" }}>
                  <Typography
                    variant="poppins_400"
                    component={"p"}
                    sx={{fontSize:{sm:'17px',xs:'13px'}}}
                    letterSpacing={"2.44px"}
                    color={"#fff"}
                    py={1}
                  >
                    Add property
                  </Typography>
                </Link>
                <Link href="/about-us" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="poppins_400"
                    component={"p"}
                    sx={{fontSize:{sm:'17px',xs:'13px'}}}
                    letterSpacing={"2.44px"}
                    color={"#fff"}
                    py={1}
                  >
                    About Us
                  </Typography>
                </Link>
                <Link href="/contact-us" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="poppins_400"
                    component={"p"}
                    sx={{fontSize:{sm:'17px',xs:'13px'}}}
                    letterSpacing={"2.44px"}
                    color={"#fff"}
                    py={1}
                  >
                    Contact Us
                  </Typography>
                </Link>
                <Link href="/privacy-policy" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="poppins_400"
                    component={"p"}
                    sx={{fontSize:{sm:'17px',xs:'13px'}}}
                    letterSpacing={"2.44px"}
                    color={"#fff"}
                    py={1}
                  >
                    Privacy Policy
                  </Typography>
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
