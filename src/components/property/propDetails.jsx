import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import PropListSidebar from "./propListSidebar";
import Slider from "react-slick";
import Propimg1 from "@/public/assets/images/property/prop.png";
import Propimg2 from "@/public/assets/images/property/prop-list2.png";
import Propimg3 from "@/public/assets/images/property/prop-list3.png";
import RentHome from "@/public/assets/images/icon/rentHome.png";
import Image from "next/image";
import copy from "copy-to-clipboard";
import {
  poppins_400,
  poppins_500,
  poppins_600,
  roboto_400,
} from "@/src/components/common/font";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { styled } from "@mui/system";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import PropertyCard from "../common/propertyCard";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useEffect } from "react";
import {
  addFavoriteProperty,
  getIndividualPropertyDetail,
  userProfileDetail,
} from "@/src/utils/axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProperty, setUserProfile } from "@/src/app/reducer";
import PropertyEnquiry from "./propertyEnquiry";
import VerifiedIcon from "@/public/assets/images/verified-stmp.png";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const PropertyDetails = ({ property_id, data }) => {
  const loggedInRole = useSelector((state) => state.reducer.loggedInRole);
  const [property, setProperty] = useState([]);
  const [sliderImage, setSliderImage] = useState([]);
  const [similarProperty, setSimilarProperty] = useState([]);
  const userProfile = useSelector((state) => state.reducer.userProfile);
  const loginUserDetails = useSelector((state) => state.reducer.userDetails);
  const loginUserName = useSelector((state) => state.reducer.loginUserName);
  const dispatch = useDispatch();
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const Swal = require("sweetalert2");
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const copyToClipboard = () => {
    const url = window.location.href;
    copy(url);
    Toast.fire({
      icon: "success",
      title: "URL Coppied",
    });
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  const setting2 = {
    asNavFor: nav1,
    ref: (slider2) => setNav2(slider2),
    slidesToShow: sliderImage?.length <= 2 ? 1 : 4,
    swipeToSlide: true,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: "60px",
    arrows: false,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: sliderImage?.length <= 2 ? 1 : 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: sliderImage?.length <= 2 ? 1 : 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: sliderImage?.length <= 2 ? 1 : 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const addFavProperty = async (id) => {
    try {
      let res = await addFavoriteProperty(id);
      console.log(res, "res ad fav");
      // setProperty(res?.data?.data);
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };
  const getUserDetails = async () => {
    let res = await userProfileDetail();
    dispatch(setUserProfile(res?.data));
  };

  useEffect(() => {
    if (data) {
      setProperty(data?.data);
      setSimilarProperty(data?.similarProperties);
      dispatch(setSelectedProperty(data));
    }
  }, [data]);

  useEffect(() => {
    const filteredResponse = property[0]?.property_images_arr.filter((item) =>
      Object.values(item).some((value) => value !== "")
    );

    setSliderImage(filteredResponse);
  }, [property]);
  return (
    <>
      {property.length > 0 && (
        <Grid container>
          <Grid item md={4} xs={12} sx={{ order: { xs: 1, md: 0 } }}>
            <PropListSidebar />
          </Grid>
          <Grid
            item
            md={8}
            xs={12}
            sx={{ pl: { md: 3, order: { xs: 0, md: 1 } } }}
          >
            <Box bgcolor={"#fff"} mb={2}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                borderBottom={"1px solid #DDE1F0"}
                px={2}
                py={1}
              >
                <Typography
                  variant="poppins_400"
                  component={"p"}
                  sx={{ fontSize: { sm: "30px" } }}
                >
                  ₹{property[0].max_price}/-
                </Typography>
                {loggedInRole !== "Agent" && (
                  <Box>
                    <Link
                      href={loginUserDetails ? "/schedule-visit" : "/login"}
                    >
                      <Button
                        className={styles.poppins_600}
                        variant="contained"
                        sx={{
                          mx: { sm: 2, xs: 1 },
                          borderRadius: "75px",
                          backgroundColor: "gold.main",
                          padding: { sm: "6px 10px", xs: "4px 5px" },
                          color: "#fff",
                          fontSize: { sm: "12px", xs: "10px" },
                        }}
                      >
                        Schedule Visit
                      </Button>
                    </Link>

                    {loginUserDetails && (
                      <PropertyEnquiry property_id={property_id} />
                    )}
                  </Box>
                )}
              </Stack>
              <Grid
                container
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Grid item md={1.5} xs={2}>
                  <Box border={"1px solid #DDE1F0"} textAlign={"center"}>
                    <Image
                      src={RentHome}
                      alt="FindHome icon"
                      width={50}
                      height={50}
                    />
                    <Typography
                      variant="poppins_500"
                      component={"p"}
                      fontSize={"14px"}
                    >
                      {property[0].status}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={10.5} xs={10}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    px={2}
                  >
                    <Box>
                      <Typography
                        variant="roboto_400"
                        component={"p"}
                        fontSize={"18px"}
                      >
                        {property[0].title}
                      </Typography>
                      <Typography
                        variant="roboto_400"
                        component={"p"}
                        fontSize={"14px"}
                      >
                        <Typography
                          component={"span"}
                          fontSize={"14px"}
                          color={"#9B9B9B"}
                        >
                          Address:
                        </Typography>
                        {property[0].area} {property[0].district}{" "}
                        {property[0].state} - {property[0].zip_code}
                      </Typography>
                    </Box>
                    {loginUserDetails && (
                      <Checkbox
                        sx={{
                          borderRadius: "50%",
                          backgroundColor: "#00000066",
                          padding: "3px",
                          "&:hover": {
                            backgroundColor: "#CF9B45",
                          },
                        }}
                        onChange={() => {
                          addFavProperty(property_id);
                          getUserDetails();
                        }}
                        checked={
                          userProfile?.myFavoritePropertyData?.findIndex(
                            (item) => item.property_id === property_id
                          ) !== -1
                            ? true
                            : false
                        }
                        {...label}
                        icon={
                          <FavoriteBorder
                            sx={{ color: "#fff", fontSize: "20px" }}
                          />
                        }
                        checkedIcon={
                          <Favorite
                            sx={{ color: "#ff0000", fontSize: "20px" }}
                          />
                        }
                      />
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Slider
                asNavFor={nav2}
                ref={(slider1) => setNav1(slider1)}
                arrows={false}
                infinite={true}
              >
                {sliderImage?.map((item, index) => (
                  <Box key={index} position={"relative"} width={"100%"}>
                    <Image
                      src={Object.values(item)[0]}
                      sizes="100vw"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "400px",
                      }}
                      width={750}
                      height={400}
                      alt="prop image"
                    />
                    {property[0].verified_flag === 1 && (
                      <Image
                        src={VerifiedIcon}
                        height={60}
                        width={60}
                        alt={"verified prop icon"}
                        style={{
                          position: "absolute",
                          top: "2px",
                          left: "5px",
                          transition:
                            "0.8s cubic-bezier(0.39, 0.58, 0.57, 1) all",
                        }}
                      />
                    )}
                    <Typography
                      variant="poppins_400"
                      component={"p"}
                      bgcolor={"#6885A3"}
                      width={"fit-content"}
                      sx={{
                        padding: "2px 20.73px 2px 11px",
                        color: "#fff",
                        fontSize: "14px",
                        position: "absolute",
                        top: "0",
                        right: "0",
                      }}
                    >
                      ₹{property[0].max_price}/-
                    </Typography>
                  </Box>
                ))}
              </Slider>
              <Slider {...setting2}>
                {sliderImage?.map((item, index) => (
                  <Box key={index} py={1}>
                    <Image
                      style={{ objectFit: "cover" }}
                      width={150}
                      height={100}
                      src={Object.values(item)[0]}
                      alt="prop image"
                    />
                  </Box>
                ))}
              </Slider>
            </Box>
            <Stack
              direction={"row"}
              alignItems={"center"}
              bgcolor={"#E7E9F0"}
              p={2}
              mb={2}
              justifyContent={"space-between"}
            >
              <Typography
                variant="roboto_400"
                component={"p"}
                fontSize={"14px"}
              >
                Publish Date : {property[0].publish_date}
              </Typography>
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={copyToClipboard}
                variant="roboto_400"
                component={"p"}
                color={"gold.main"}
                underline="hover"
                fontSize={"14px"}
              >
                Share this post
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              bgcolor={"#E7E9F0"}
              p={2}
              gap={2}
            >
              <Typography
                variant="roboto_400"
                component={"p"}
                fontSize={"14px"}
              >
                {property[0].bathroomCount} Bathrooms
              </Typography>
              <Typography
                variant="roboto_400"
                component={"p"}
                fontSize={"14px"}
              >
                {property[0].bhkType.charAt(0)} Bedrooms
              </Typography>
              <Typography
                variant="roboto_400"
                component={"p"}
                fontSize={"14px"}
              >
                {property[0].sqFtarea} Sq Ft
              </Typography>
            </Stack>

            <Box>
              <Typography
                variant="roboto_400"
                component={"p"}
                fontSize={"14px"}
                color={"#9A9A9A"}
                lineHeight={"24px"}
                my={2}
              >
                {property[0].description}
              </Typography>
            </Box>

            <Box bgcolor={"#fff"} p={2} my={2}>
              <Typography
                variant="poppins_400"
                component={"p"}
                pb={2}
                fontSize={"18px"}
              >
                Address
              </Typography>
              <Divider />
              <Grid container pt={2}>
                <Grid item md={6}>
                  <Typography
                    variant="roboto_400"
                    component={"p"}
                    color={"#9B9B9B"}
                    lineHeight={"24px"}
                    fontSize={"14px"}
                  >
                    Address :{" "}
                    <Typography
                      component={"span"}
                      fontSize={"14px"}
                      color={"#000"}
                    >
                      {property[0].area} {property[0].district}{" "}
                      {property[0].state} - {property[0].zip_code}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="roboto_400"
                    component={"p"}
                    color={"#9B9B9B"}
                    lineHeight={"24px"}
                    fontSize={"14px"}
                  >
                    State :{" "}
                    <Typography
                      component={"span"}
                      fontSize={"14px"}
                      color={"#000"}
                    >
                      {property[0].state}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="roboto_400"
                    component={"p"}
                    color={"#9B9B9B"}
                    lineHeight={"24px"}
                    fontSize={"14px"}
                  >
                    City :{" "}
                    <Typography
                      component={"span"}
                      fontSize={"14px"}
                      color={"#000"}
                    >
                      {property[0].city}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="roboto_400"
                    component={"p"}
                    color={"#9B9B9B"}
                    lineHeight={"24px"}
                    fontSize={"14px"}
                  >
                    House No. :{" "}
                    <Typography
                      component={"span"}
                      fontSize={"14px"}
                      color={"#000"}
                    >
                      {property[0].house_no}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="roboto_400"
                    component={"p"}
                    color={"#9B9B9B"}
                    lineHeight={"24px"}
                    fontSize={"14px"}
                  >
                    Zip :{" "}
                    <Typography
                      component={"span"}
                      fontSize={"14px"}
                      color={"#000"}
                    >
                      {property[0].zip_code}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="roboto_400"
                    component={"p"}
                    color={"#9B9B9B"}
                    lineHeight={"24px"}
                    fontSize={"14px"}
                  >
                    District :{" "}
                    <Typography
                      component={"span"}
                      fontSize={"14px"}
                      color={"#000"}
                    >
                      {property[0].district}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="roboto_400"
                    component={"p"}
                    color={"#9B9B9B"}
                    lineHeight={"24px"}
                    fontSize={"14px"}
                  >
                    Taluka :{" "}
                    <Typography
                      component={"span"}
                      fontSize={"14px"}
                      color={"#000"}
                    >
                      {property[0].taluka}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="roboto_400"
                    component={"p"}
                    color={"#9B9B9B"}
                    lineHeight={"24px"}
                    fontSize={"14px"}
                  >
                    Area :{" "}
                    <Typography
                      component={"span"}
                      fontSize={"14px"}
                      color={"#000"}
                    >
                      {property[0].area}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="roboto_400"
                    component={"p"}
                    color={"#9B9B9B"}
                    lineHeight={"24px"}
                    fontSize={"14px"}
                  >
                    Landmark :{" "}
                    <Typography
                      component={"span"}
                      fontSize={"14px"}
                      color={"#000"}
                    >
                      {property[0].landmark}
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box bgcolor={"#fff"} p={2} my={2}>
              <Typography
                variant="poppins_400"
                component={"p"}
                pb={2}
                fontSize={"18px"}
              >
                Features
              </Typography>
              <Divider />
              <Grid container justifyContent={"space-between"} py={1}>
                {property[0]?.ameniti_arr?.map((item, index) => {
                  return (
                    <Grid
                      item
                      md={3}
                      key={index}
                      py={1}
                      borderBottom={"1px solid #ebebeb"}
                    >
                      {" "}
                      <Typography
                        variant="roboto_400"
                        component={"p"}
                        fontSize={"14px"}
                      >
                        {item.amenities_name}
                      </Typography>{" "}
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
            <Box my={2}>
              <Typography
                variant="poppins_400"
                component={"p"}
                p={2}
                fontSize={"18px"}
              >
                Property Map
              </Typography>
              <Divider />
              <iframe
                src={property[0].live_location}
                width="100%"
                height="450"
                style={{ border: "0", paddingTop: "15px" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </Box>
            <Box>
              <Typography
                variant="poppins_400"
                component={"p"}
                pb={2}
                fontSize={"18px"}
              >
                Similar Properties
              </Typography>
              <Divider />

              <Slider {...settings}>
                {similarProperty?.map((item, index) => (
                  <Box key={index} mb={1} sx={{ px: 1 }}>
                    <PropertyCard
                    status={item.status}
                      imgUrl={item.property_images_arr}
                      title={item.title}
                      area={item.sqFtarea}
                      bathroom={item.bathroomCount}
                      bedroom={item.bhkType}
                      max_price={item.max_price}
                      isCheckBoxTrue={false}
                      isCheckedTrue={true}
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
              </Slider>
              {similarProperty?.length === 0 && (
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
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PropertyDetails;
