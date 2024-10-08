import React, { useEffect, useState } from "react";
import PropListSidebar from "@/src/components/property/propListSidebar";
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import {
  poppins_400,
  poppins_500,
  poppins_600,
  roboto_400,
} from "@/src/components/common/font";
import Image from "next/image";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PropertyCard from "@/src/components/common/propertyCard";
import Link from "next/link";
import Breadcrumb from "@/src/components/common/breadcrumb";
import { userProfileDetail } from "@/src/utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "@/src/app/reducer";
import EditProfile from "@/src/components/my_profile/editProfile";
import EditPassword from "@/src/components/my_profile/editPassword";
const MyProfile = () => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState();
  const userProfile = useSelector((state) => state.reducer.userProfile);

  const getUserDetails = async () => {
    let res = await userProfileDetail();
    setUserDetails(res?.data?.userDetail);
    dispatch(setUserProfile(res?.data));
    return res?.data;
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <Head>
        <title>My Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Breadcrumb root_page="" root_page_path="" page_name="My Profile" />
      <Box bgcolor={"#F3F4F9"}>
        <Container sx={{ py: 8 }}>
          <Grid container>
            <Grid item md={8} xs={12} sx={{ pr: { md: 3 } }}>
              <Box bgcolor={"#fff"} p={4}>
                <Grid container>
                  <Grid item sm={6} xs={12} sx={{ pr: { sm: 5 } }}>
                    <Box width={"100%"}>
                      <Image
                        src={userDetails?.profile_pic}
                        width={1200}
                        height={800}
                        sizes="100vw"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "400px",
                        }}
                        layout="responsive"
                        alt="myprofile"
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Typography
                      variant="poppins_400"
                      component={"p"}
                      fontSize={"22px"}
                    >
                      {userDetails?.firstName} {userDetails?.lastName}
                    </Typography>

                    {/* <TextField
                      className={roboto_400.className}
                      fullWidth
                      hiddenLabel
                      id="input-with-icon-textfield"
                      defaultValue="User / Real Estate Agent"
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                      sx={{
                        "& .MuiInput-input": {
                          fontSize: "14px",
                          color: "#9A9A9A",
                          pb: 2,
                        },
                        "& .MuiInput-root:before": {
                          borderBottom: "1px solid #D7D7D7",
                        },
                      }}
                    /> */}
                    <TextField
                      fullWidth
                      hiddenLabel
                      id="input-with-icon-textfield"
                      value={userDetails?.mobile_no}
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <CallOutlinedIcon sx={{ color: "rackley.main" }} />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                      sx={{
                        "& .MuiInput-input": {
                          fontSize: "14px",
                          color: "#2A2E3D",
                          py: 2,
                        },
                        "& .MuiInput-root:before": {
                          borderBottom: "1px solid #D7D7D7",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      hiddenLabel
                      id="input-with-icon-textfield"
                      value={userDetails?.email}
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlinedIcon sx={{ color: "rackley.main" }} />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                      sx={{
                        "& .MuiInput-input": {
                          fontSize: "14px",
                          color: "#2A2E3D",
                          py: 2,
                        },
                        "& .MuiInput-root:before": {
                          borderBottom: "1px solid #D7D7D7",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      hiddenLabel
                      id="input-with-icon-textfield"
                      value={userDetails?.dob}
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <DateRangeIcon sx={{ color: "rackley.main" }} />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                      sx={{
                        "& .MuiInput-input": {
                          fontSize: "14px",
                          color: "#2A2E3D",
                          py: 2,
                        },
                        "& .MuiInput-root:before": {
                          borderBottom: "1px solid #D7D7D7",
                        },
                      }}
                    />

                    <EditProfile refreshUserProfile={getUserDetails}/>
                    <EditPassword />
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{ paddingTop: "38px" }}
                >
                  <Typography
                    variant="poppins_400"
                    component={"p"}
                    pb={2}
                    fontSize={"22px"}
                  >
                    My Property
                  </Typography>
                  <Link
                    underline="hover"
                    href={"property/myproperty"}
                    className={roboto_400.className}
                    pb={2}
                    style={{ fontSize: "14px", color: "#9A9A9A" }}
                  >
                    View All
                  </Link>
                </Stack>
                <Grid container>
                  {userProfile?.myPropertyDetail
                    ?.slice(0, 4)
                    .map((item, index) => (
                      <Grid
                        key={index}
                        item
                        sm={6}
                        xs={12}
                        sx={{
                          paddingRight: { sm: index % 2 === 0 ? 1 : 0 },
                          paddingLeft: { sm: index % 2 !== 0 ? 2 : 0 },
                        }}
                      >
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
                          isBoostPropTrue={true}
                          isAmenities={false}
                          isVerified={true}
                          isBedroom={false}
                          routingUrl={
                            "/property/" +
                            item.title.replace(/\s+/g, "-") +
                            "-" +
                            item.property_id
                          }
                          verified_flag={item.verified_flag}
                        />
                      </Grid>
                    ))}

                  {userProfile?.myPropertyDetail == "" && (
                    <Grid item md={12}>
                      <Typography
                        sx={{
                          fontSize: "40px",
                          color: "#d9d9d9",
                          textAlign: "center",
                        }}
                        className={poppins_600.className}
                      >
                        No Data Found
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>

              <Box>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{ paddingTop: "38px" }}
                >
                  <Typography
                    variant="poppins_400"
                    component={"p"}
                    pb={2}
                    fontSize={"22px"}
                  >
                    My Favorites
                  </Typography>
                  <Link
                    underline="hover"
                    href={"property/myfavorite"}
                    className={roboto_400.className}
                    pb={2}
                    style={{ fontSize: "14px", color: "#9A9A9A" }}
                  >
                    View All
                  </Link>
                </Stack>

                <Grid container>
                  {userProfile?.myFavoritePropertyData
                    ?.slice(0, 4)
                    .map((item, index) => (
                      <Grid
                        key={index}
                        item
                        sm={6}
                        xs={12}
                        sx={{
                          paddingRight: { sm: index % 2 === 0 ? 1 : 0 },
                          paddingLeft: { sm: index % 2 !== 0 ? 2 : 0 },
                        }}
                      >
                        <PropertyCard
                        status={item.status}
                          property_id={item.property_id}
                          imgUrl={item.property_images_arr}
                          title={item.title}
                          area={item.sqFtarea}
                          bathroom={item.bathroomCount}
                          bedroom={item.bhkType}
                          max_price={item.max_price}
                          isCheckBoxTrue={true}
                          isCheckedTrue={true}
                          isAmenities={true}
                          isVerified={false}
                          isBedroom={true}
                          routingUrl={
                            "/property/" +
                            item.title.replace(/\s+/g, "-") +
                            "-" +
                            item.property_id
                          }
                          verified_flag={item.verified_flag}
                        />
                      </Grid>
                    ))}
                  {userProfile?.myFavoritePropertyData == "" && (
                    <Grid item md={12}>
                      <Typography
                        sx={{
                          fontSize: "40px",
                          color: "#d9d9d9",
                          textAlign: "center",
                        }}
                        className={poppins_600.className}
                      >
                        No Data Found
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Grid>
            <Grid item md={4} xs={12} sx={{ pt: { xs: 2, md: 0 } }}>
              <PropListSidebar />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default MyProfile;
