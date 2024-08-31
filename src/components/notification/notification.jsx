import React, { useEffect, useState } from "react";
import PropListSidebar from "@/src/components/property/propListSidebar";
import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Head from "next/head";
import {
  poppins_400,
  poppins_500,
  poppins_600,
  roboto_400,
} from "@/src/components/common/font";
import styles from "@/styles/Home.module.css";
import Breadcrumb from "@/src/components/common/breadcrumb";
import { notificationList } from "@/src/utils/axios";

const Notification = () => {
  const [userNotification, setUserNotification] = useState();
  const [commonNotification, setCommonNotification] = useState();
  const [OtherNotification, setOtherNotification] = useState();

  const getAllProperty = async () => {
    try {
      let res = await notificationList();
 
      setUserNotification(res?.data?.notificationData?.userNotification);
      setCommonNotification(res?.data?.notificationData?.commanNotification.commanNotification);
      setOtherNotification(res?.data?.notificationData?.commanNotification.OtherUserAddedFavorite);
      console.log(res?.data?.notificationData?.commanNotification,'res?.data?.notificationData?.userNotification')
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);
  return (
    <div>
      <Box bgcolor={"#F3F4F9"}>
        <Container sx={{ py: 8 }}>
          <Grid container>
            <Grid item xs={12} md={8} sx={{pr:{md:2},my:{md:0,xs:2}}}>
              <Box bgcolor={"#fff"} sx={{p:{md:4,xs:1}}}>
                <Typography
                  textAlign={"center"}
                  variant="poppins_600"
                  component={"p"}
                           sx={{fontSize:{sm:'50px',xs:'30px'}}}
                  color={"space.main"}
                  letterSpacing={"1.44px"}
                >
                  Notification{" "}
                  <Typography
                    variant="poppins_600"
                             sx={{fontSize:{sm:'50px',xs:'30px'}}}
                    color={"gold.main"}
                    component="span"
                  >
                    !
                  </Typography>
                </Typography>
                <Typography
                  textAlign={"center"}
                  variant="poppins_600"
                  component={"p"}
                  sx={{fontSize:{sm:'20px',xs:'15px'}}}
                  color={"space.main"}
                  letterSpacing={"1.44px"}
                  mb={3}
                >
                  Stay in the loop with your latest notifications.
                </Typography>
                <Typography variant="poppins_600" fontSize={"14px"} py={3}>
                  Your Notifications
                </Typography>
                <Divider />
                <Box sx={{ maxHeight: "600px", overflowY: "auto", my: 3 }}>
                  {userNotification?.map((item, index) => (
                    <Stack
                      key={item.notification_id}
                      direction={"row"}
                      justifyContent={"space-between"}
                      bgcolor={"#F3F4F9"}
                      py={2}                   
                      my={1}
                      sx={{px:{md:4,xs:1}}}
                    >
                      <Typography
                        className={styles.roboto_400}
                        fontSize={"14px"}
                      >
                        {index + 1}
                        {")"} {item.type}
                      </Typography>
                      <Typography
                        className={roboto_400.className}
                        fontSize={"14px"}
                        color={"gold.main"}
                        underline="always"
                      >
                        {/* {item.created_at} */}
                        <DateTimeFormatter dateTime={item.created_at} />
                      </Typography>
                    </Stack>
                  ))}
                </Box>
                <Typography variant="poppins_600" fontSize={"14px"} py={3}>
                  Common Notifications
                </Typography>
                <Divider />
                <Box sx={{ maxHeight: "500px", overflowY: "auto", my: 3 }}>
                  {commonNotification?.map((item, index) => (
                    <Stack
                      key={item.notification_id}
                      direction={"row"}
                      justifyContent={"space-between"}
                      bgcolor={"#F3F4F9"}
                      py={2}
                      px={4}
                      my={1}
                    >
                      <Typography
                        className={styles.roboto_400}
                        fontSize={"14px"}
                      >
                        {index + 1}
                        {")"} {item.type}
                      </Typography>
                      <Typography
                        className={roboto_400.className}
                        fontSize={"14px"}
                        color={"gold.main"}
                        underline="always"
                      >
                        {/* {item.created_at} */}
                        <DateTimeFormatter dateTime={item.created_at} />
                      </Typography>
                    </Stack>
                  ))}
                </Box>
                <Typography variant="poppins_600" fontSize={"14px"} py={3}>
                  Other Notifications
                </Typography>
                <Divider />
                <Box sx={{ maxHeight: "500px", overflowY: "auto", my: 3 }}>
                  {OtherNotification?.map((item, index) => (
                    <Stack
                      key={item.notification_id}
                      direction={"row"}
                      justifyContent={"space-between"}
                      bgcolor={"#F3F4F9"}
                      py={2}
                      px={4}
                      my={1}
                    >
                      <Typography
                        className={styles.roboto_400}
                        fontSize={"14px"}
                      >
                        {index + 1}
                        {")"} {item.type}
                      </Typography>
                      <Typography
                        className={roboto_400.className}
                        fontSize={"14px"}
                        color={"gold.main"}
                        underline="always"
                      >
                        {/* {item.created_at} */}
                        <DateTimeFormatter dateTime={item.created_at} />
                      </Typography>
                    </Stack>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} >
              <PropListSidebar />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Notification;

export const DateTimeFormatter = ({ dateTime }) => {
  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const isoDate = dateTime;
  const formattedDateTime = formatDateTime(isoDate);

  return <div>{formattedDateTime}</div>;
};
