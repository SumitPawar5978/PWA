import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Tooltip,
} from "@mui/material";

import Image from "next/image";
import { styled } from "@mui/system";
import Slider from "react-slick";
import { testimonialDetails } from "@/src/utils/axios";
import { useSelector } from "react-redux";
import Zoom from '@mui/material/Zoom';
const CustomArrow = styled("label")({
  "&:before": {
    content: '""',
    position: "absolute",
    top: "0px",
    left: "-8px",
    transform: "translateX(-50%)",
    borderStyle: "solid",
    borderWidth: "29px 2px 0px 28px",
    borderColor: "#fff transparent transparent transparent",
  },
});
const Testimonial = () => {
  const selectedCityName = useSelector((state) => state.reducer.selectCity);
  const [testimonials, setTestimonials] = useState();

  const getTestimonialsDetails = async () => {
    let res = await testimonialDetails({ district: selectedCityName });
    setTestimonials(res?.data?.data);
  };
  useEffect(() => {
    getTestimonialsDetails();
  }, [selectedCityName]);

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Box sx={{ py: 5, px: 4, backgroundColor: "crayola.light" }}>
        <Typography
          textAlign={"center"}
          variant="poppins_600"
          component={"p"}
          sx={{ fontSize: { md: "50px", sm: "50px", xs: "30px" } }}
          color={"space.main"}
          letterSpacing={"1.44px"}
        >
          Our
          <Typography
            variant="poppins_600"
            sx={{ fontSize: { md: "50px", sm: "50px", xs: "30px" } }}
            color={"gold.main"}
            component="span"
          >
            {" "}
            Testimonials
          </Typography>
        </Typography>
        <Typography
          textAlign={"center"}
          variant="poppins_600"
          component={"p"}
          sx={{ fontSize: { sm: "20px", xs: "15px" } }}
          color={"space.main"}
          letterSpacing={"1.44px"}
        >
          Read What Our Clients Have To Say About Our Services.
        </Typography>

        <Slider {...settings}>
          {testimonials?.map((item, index) => (
            <Box key={index} px={3} pt={4} pb={3}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  position: "relative",
                  padding: { xs: 1, lg: 2.2, xl: 5 },
                  Height: "260px",
                  minHeight:{sm:"260px", xs:"200px"},
                }}
              >
                <CustomArrow>                  
               <Tooltip title={<h3>{item.description}</h3>}  TransitionComponent={Zoom}>
                  <Typography
                    variant="roboto_400"
                    component={"p"}
                    fontSize={"14px"}
                    lineHeight={"24px"}
                    letterSpacing={"0.7px"}
                    sx={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.description}
                  </Typography>
                  </Tooltip>
                  <Stack
                  sx={{position:{md:'absolute'}, bottom:'15px'}}
                    direction="row"
                    alignItems={"center"}
                    spacing={2}
                    pt={2}
                  >
                    <Image
                      src={item.profile_pic}
                      alt="PropList icon"
                      style={{ borderRadius: "50%" }}
                      width={65}
                      height={65}
                    />
                    <Box>
                      <Typography variant="poppins_500" component={"p"}>
                        {item.name}
                      </Typography>
                      <Typography
                        variant="roboto_400"
                        component={"p"}
                        fontSize={"14px"}
                        color={"picton.main"}
                      >
                        {item.city}
                      </Typography>
                    </Box>
                  </Stack>
                </CustomArrow>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default Testimonial;
