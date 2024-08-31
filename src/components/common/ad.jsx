import React, { useEffect, useState } from "react";
import RealEstate from "@/public/assets/images/realestate.png";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Slider from "react-slick";
import Image from "next/image";
import { getAdvertisementDetail } from "@/src/utils/axios";
import { useSelector } from "react-redux";
import Link from "next/link";
import { poppins_400 } from "./font";
const Ad = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  
  const selectedCityName = useSelector((state) => state.reducer.selectCity);
  const [advertismentSection1, setAdvertismentSection1] = useState([]);
  const [advertismentSection2, setAdvertismentSection2] = useState([]);
  const [advertismentSIdebar, setAdvertismentSIdebar] = useState([]);

  const getAdvertisement = async () => {
    let res = await getAdvertisementDetail({
      district: selectedCityName,
      page: props.pageName,
    });

    // Filter advertisements based on section key
    const section1Ads = res?.data?.data.filter(
      (item) => item.section === "Section 1"
    );
    const section2Ads = res?.data?.data.filter(
      (item) => item.section === "Section 2"
    );
    const sidebarAds = res?.data?.data.filter(
      (item) => item.section === "Section 1"
    );
    setAdvertismentSection1(section1Ads);
    setAdvertismentSection2(section2Ads);
    setAdvertismentSIdebar(sidebarAds);
  };

  useEffect(() => {
    getAdvertisement();
  }, [selectedCityName]);
  return (
    <>
      <Container overflow={"hidden"}>
        <Box>
          {props.section === "Section 1" && props.pageName==="Home" &&(
            <Slider {...settings}>
              {advertismentSection1?.map((item, index) => (
                <Box key={index}>
                  <Link href={item.link} target="_blank">
                    <Image
                      src={item.upload}
                      alt={item.altText}
                      sizes="100vw"
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit:"cover",
                      }}
                      width={1200}
                      height={200}
                    />
                  </Link>
                </Box>
              ))}
            </Slider>
          )}
          {props.section === "Section 2" && (
            <Slider {...settings}>
              {advertismentSection2?.map((item, index) => (
                <Box key={index}>
                  <Link href={item.link} target="_blank">
                    <Image
                      src={item.upload}
                      alt={item.altText}
                      sizes="100vw"
                      style={{
                        objectFit:"cover",
                        width: '100%',
                        height: '200px',
                      }}
                      width={1200}
                      height={200}
                    />
                  </Link>
                </Box>
              ))}
            </Slider>
          )}

         
        </Box>
      </Container>
      {props.section === "Section 1" && props.pageName === "Property" && (
            <Slider {...settings}>
              {advertismentSIdebar?.map((item, index) => (
                <Box key={index} width={"100%"} >
                  <Link href={item.link} target="_blank">
                    <Image
                      src={item.upload}
                      alt={item.altText}
                      width={400}
                      height={400}
                      sizes="100vw"
                      style={{
                        objectFit:"cover",
                        width: '100%',
                        height: '400px',
                      }}
                    />
                  </Link>
                </Box>
              ))}
            </Slider>
          )}
    </>
  );
};

export default Ad;
