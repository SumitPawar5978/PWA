import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import DreamHome from "@/public/assets/images/icon/dreamHome.png";
import CommercialSpace from "@/public/assets/images/icon/commercialSpace.png";
import DreamPlot from "@/public/assets/images/icon/dreamPlot.png";
import DreamLand from "@/public/assets/images/icon/dreamLand.png";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const FeatureCard = ({
  icon = DreamLand,
  title = "test",
  desc = "test",
  type="",
  bgcolor = "#fff",
  isCursor=false
}) => {

  const navigate = useRouter();
  const selectedCityName = useSelector((state) => state.reducer.selectCity);
  const selectState = useSelector((state) => state.reducer.selectState);
  const handleFindProperty = () => {
    navigate.push({
      pathname: "/property",
      query: {
        type,
        district:selectedCityName,
        state_id:selectState
      },
    });
  };

  return (
    <>
      
        <Box
        onClick={type!==''?handleFindProperty:null}
          className={styles.prop_card_box}
          bgcolor={bgcolor}
          border={"4px solid #F3F4F9"}
          sx={{
            minHeight:'272px',
            padding: "15px",
            cursor:isCursor?'pointer':'unset',
            "&:hover": {
              transition: "1s ease-in-out",
              border: "4px solid #6885A3",
            },
          }}
        >
          <Image
            className={styles.prop_icon}
            src={icon}
            alt="DreamHome icon"
            width={65}
            height={65}
          />
          <Typography
            variant="poppins_500"
            component={"p"}
            fontSize={"14px"}
            color={"space.main"}
            py={1.5}
          >
            {title}
          </Typography>
          <Typography
            variant="roboto_400"
            component={"p"}
            fontSize={"12px"}
            color={"crayola.main"}
            lineHeight={"20px"}
            letterSpacing={"0.5px"}
          >
            {desc}
          </Typography>
        </Box>
    </>
  );
};

export default FeatureCard;
