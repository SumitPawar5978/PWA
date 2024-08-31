import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import styles from "@/styles/Home.module.css";
import { getContactDetail } from '@/src/utils/axios';
import { useSelector } from 'react-redux';
const ContactDetail = () => {

  const selectedCityName = useSelector((state) => state.reducer.selectCity);
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
          <Typography
                className={styles.poppins_600}
                fontSize={"39px"}
                lineHeight={"48px"}
                color={"space.main"}
                marginBottom={"20px"}
              >
                Contact{" "}
                <Typography variant="span" color={"gold.main"}>
                  Details
                </Typography>
              </Typography>
              <Typography fontSize={"14px"} color={"#9A9A9A"}>
                If you have any questions, just fill in the contact form, and we
                will answer you shortly. If you are living nearby, come visit
                our office.
              </Typography>
              <Box marginTop={"25px"}>
                <Typography
                  className={styles.poppins_600}
                  fontSize={"13px"}
                  color={"#0D0D0D"}
                >
                  Client Support:
                </Typography>
                <Link
                  variant="poppins_400"
                  fontSize={"18px"}
                  letterSpacing={"1.44px"}
                  color={"#151515"}
                  py={2}
                  href={`tel:${contactDetails?.phone_no}`}
                  
                  underline="hover"
                >
                  <CallIcon
                    sx={{
                      color: "rackley.dark",
                      verticalAlign: "middle",
                      mr: 1,
                      fontSize: "25px",
                    }}
                  />{" "}
                  {contactDetails?.phone_no}
                </Link>
                <Divider />
              </Box>
              <Box marginTop={"25px"}>
                <Typography
                  className={styles.poppins_600}
                  fontSize={"13px"}
                  color={"#0D0D0D"}
                >
                  E-mail:
                </Typography>
                <Link
                  variant="poppins_400"
                  fontSize={"18px"}
                  letterSpacing={"1.44px"}
                  color={"#151515"}
                  py={2}
                  href={`mailto:${contactDetails?.email}`}
                  underline="hover"
                >
                  <MailOutlineIcon
                    sx={{
                      color: "rackley.dark",
                      verticalAlign: "middle",
                      mr: 1,
                      fontSize: "25px",
                    }}
                  />{" "}
                  {contactDetails?.email}
                </Link>
                <Divider />
              </Box>
              <Box marginTop={"25px"}>
                <Typography
                  className={styles.poppins_600}
                  fontSize={"13px"}
                  color={"#0D0D0D"}
                >
                  Main Office:
                </Typography>
                <Typography
                  variant="poppins_400"
                  component={"p"}
                  fontSize={"18px"}
                  letterSpacing={"1.44px"}
                  color={"#151515"}
                  py={2}
                >
                  <LocationOnIcon
                    sx={{
                      color: "rackley.dark",
                      verticalAlign: "middle",
                      mr: 1,
                      fontSize: "25px",
                    }}
                  />{" "}
                {contactDetails?.address}
                </Typography>
              </Box>
    </>
  )
}

export default ContactDetail