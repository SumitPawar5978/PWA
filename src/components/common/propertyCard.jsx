import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  poppins_400,
  poppins_500,
  poppins_600,
  roboto_400,
} from "@/src/components/common/font";
import Image from "next/image";
import { Checkbox } from "@mui/material";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import SellIcon from '@mui/icons-material/Sell';
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

import Slider from "react-slick";
import MyStyledBox from "@/src/components/common/cardstyle";
import Link from "next/link";
import {
  addFavoriteProperty,
  userProfileDetail,
  userSearchPropertyLog,
} from "@/src/utils/axios";
import { useDispatch, useSelector } from "react-redux";
import BoostProperty from "../property/boostProperty";
import { setUserProfile } from "@/src/app/reducer";
import VerifiedIcon from "@/public/assets/images/verified-stmp.png";
import SoldOutIcon from "@/public/assets/images/sold_out.png";
import VerifyProperty from "../property/verifyProperty";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const PropertyCard = ({
  status="",
  property_id = "",
  imgUrl = [""],
  title = "title here",
  area = "500 sqft",
  bathroom = "2 bathroom",
  bedroom = "2 bedroom",
  max_price = "5489654 rs",
  verified_flag,
  prop_sold_out_status,
  isCheckBoxTrue = false,
  isCheckedTrue = false,
  isBoostPropTrue = false,
  isAmenities = true,
  isVerified = false,
  isBedroom = true,
  routingUrl = "property/",
  formData,
}) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const [property, setProperty] = useState([]);
  const [image, setImage] = useState([]);
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.reducer.userProfile);
  const loginUserDetails = useSelector((state) => state.reducer.userDetails);
  const addFavProperty = async (id) => {
    try {
      let res = await addFavoriteProperty(id);
      setProperty(res?.data?.data);
      getUserDetails();
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  const getUserDetails = async () => {
    let res = await userProfileDetail();
    dispatch(setUserProfile(res?.data));
  };

  const handlePropertyLog = async (id) => {
    if (loginUserDetails) {
      try {
        let res = await userSearchPropertyLog(id);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    }
  };

  useEffect(() => {
    const filteredResponse = imgUrl.filter((item) =>
      Object.values(item).some((value) => value !== "")
    );

    setImage(filteredResponse);
  }, []);
  let isPresent =
    userProfile?.myFavoritePropertyData?.findIndex(
      (item) => item.property_id === property_id
    ) !== -1
      ? true
      : false;
  console.log(userProfile?.myFavoritePropertyData, "myFavoritePropertyData");
  return (
    <>
      <Box>
        <MyStyledBox>
       {prop_sold_out_status === "Sold Out" && ( <Box sx={{position:'absolute',left:'0',zIndex:'2',height:'-webkit-fill-available', width:'100%', backgroundColor:'#95959540'}}></Box>)}
          <Box>
            <Box position={"relative"} sx={{ cursor: "move" }}>
              <Slider {...settings}>
                {image.map((image, imgIndex) => (
                  <Box key={imgIndex}>
                    <Link
                      href={
                        loginUserDetails
                          ? { pathname: routingUrl, query: { ...formData } }
                          : "/login"
                      }
                      onClick={() => handlePropertyLog(property_id)}
                    >
                      {Object.values(image)[0] && (
                        <Image
                          priority={true}
                          sizes="100vw"
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            transition:
                              "0.8s cubic-bezier(0.39, 0.58, 0.57, 1) all",
                          }}
                          src={Object.values(image)[0]}
                          alt={`Property ${imgIndex}`}
                          height={200}
                          width={358}
                        />
                      )}
                    </Link>
                  </Box>
                ))}
              </Slider>
              {verified_flag === 1 && (
                <Image
                  src={VerifiedIcon}
                  height={50}
                  width={50}
                  alt={"verified prop icon"}
                  style={{
                    zIndex:'99',
                    position: "absolute",
                    top: "2px",
                    left: "5px",
                    transition: "0.8s cubic-bezier(0.39, 0.58, 0.57, 1) all",
                  }}
                />
              )}
              {prop_sold_out_status === "Sold Out" && (
                <Image
                  src={SoldOutIcon}
                  height={65}
                  width={65}
                  alt={"verified prop icon"}
                  style={{
                    zIndex:'99',
                    position: "absolute",
                    bottom: "2px",
                    right: "5px",
                    transition: "0.8s cubic-bezier(0.39, 0.58, 0.57, 1) all",
                  }}
                />
              )}
              {isCheckBoxTrue && loginUserDetails && (
                <Tooltip
                  title={isPresent ? "Remove from favorite" : "Add to favorite"}
                >
                  <Checkbox
                    onChange={() => {
                      addFavProperty(property_id);
                    }}
                    checked={isPresent}
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      borderRadius: "50%",
                      backgroundColor: "#00000066",
                      padding: "3px",
                    }}
                    {...label}
                    icon={
                      <FavoriteBorder
                        sx={{ color: "#fff", fontSize: "20px" }}
                      />
                    }
                    checkedIcon={
                      <Favorite sx={{ color: "#ff0000", fontSize: "20px" }} />
                    }
                  />
                </Tooltip>
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
                  bottom: "0",
                }}
              >
                ₹{max_price}/-
              </Typography>
              <Typography variant="poppins_400"
                component={"p"}
                bgcolor={"#6885A3"}
                width={"fit-content"}
                sx={{
                  padding: "2px 20.73px 2px 11px",
                  color: "#fff",
                  fontSize: "14px",
                  position: "absolute",
                  bottom: "0",
                  right:'0'
                }}>
                  <SellIcon
                    sx={{
                      verticalAlign: "bottom",
                      color: "#fff",
                      mr: 2,
                    }}
                  />
                  {status}
                </Typography>
            </Box>
          <Box sx={{color: "#6885A3", textOverflow:'ellipsis',
                overflow:'hidden',
                whiteSpace:'nowrap'}}>
          <Link
              href={
                loginUserDetails
                  ? { pathname: routingUrl, query: { ...formData } }
                  : "/login"
              }
              className={poppins_400.className}
              style={{
                color: "#6885A3",
                fontSize: "17px",
                textDecoration: "none",
                lineHeight: "50px",              
              }}
              onClick={() => handlePropertyLog(property_id)}
            >
              {title}
            </Link>
          </Box>
            <Divider sx={{ borderColor: "#E3E3E3" }} />
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              pt={2}
            >
              <Typography fontSize={"14px"}>
                <SquareFootIcon
                  sx={{
                    verticalAlign: "sub",
                    color: "crayola.main",
                    mr: 2,
                  }}
                />
                {area} Sq.ft.
              </Typography>
              <Typography fontSize={"14px"}>
                <BathtubOutlinedIcon
                  sx={{
                    verticalAlign: "sub",
                    color: "crayola.main",
                    mr: 2,
                  }}
                />
                {bathroom} Bath.
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              pt={1}
            >
              {isBedroom && (
                <Typography fontSize={"14px"}>
                  <BedOutlinedIcon
                    sx={{
                      verticalAlign: "bottom",
                      color: "crayola.main",
                      mr: 2,
                    }}
                  />
                  {bedroom}
                </Typography>
              )}
              {isVerified && verified_flag === 0 ? (
                <VerifyProperty property_id={property_id} />
              ) : null}

              {isAmenities && (
                <Link
                  href={
                    loginUserDetails
                      ? { pathname: routingUrl, query: { ...formData } }
                      : "/login"
                  }
                  style={{ color: "#CF9B45", fontSize: "14px" }}
                  className={roboto_400.className}
                >
                  More Amenities
                </Link>
              )}
              {isBoostPropTrue && <BoostProperty property_id={property_id} />}
            </Stack>
          </Box>
        </MyStyledBox>
      </Box>
    </>
  );
};

export default PropertyCard;
