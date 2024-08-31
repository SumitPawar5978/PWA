import React from "react";
import breadcrumbImg from "@/public/assets/images/breadcrumb.png";
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { poppins_400 } from "@/src/components/common/font";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const Breadcrumb = (props) => {
  const words = props.page_name.split(" ");
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          minHeight: {md:"220px",sm:"170px",xs:"100px"},
          backgroundImage: `url(${breadcrumbImg.src})`,
          boxShadow: "inset 0 0 0 2000px #0d1f37cc;",
        }}
      >
        {words.map((word, index) => (
          <Typography
            
            color={"#fff"}
            lineHeight={"1"}
            variant="poppins_600"
            component={"p"}
            key={index}
            sx={index === 1 ? { color: "gold.main",fontSize:{md:'60px',sm:'50px',xs:'40px'} } : {fontSize:{md:'60px',sm:'50px',xs:'40px'}}}
          >
            {word} {index !== words.length - 1 ? "\u00A0" : ""}
          </Typography>
        ))}
      </Box>
      <Container>
        <Stack direction={"row"} py={3} alignItems={'center'}>
          <Link href="/" style={{ textDecoration: "none", color: "#4B9EF1" }}>
            <Typography className={poppins_400.className} fontSize={"16px"}>
              Home {props.page_name&& <NavigateNextIcon sx={{verticalAlign:'middle'}}/>}
            </Typography>
          </Link>
          <Link href={`/${props.root_page_path}`} style={{ textDecoration: "none", color: "#4B9EF1" }}>
            <Typography className={poppins_400.className} fontSize={"16px"}>
             {props.root_page}
            </Typography>
          </Link>
    
          <Typography
            color="#9A9A9A"
            className={poppins_400.className}
            fontSize={"16px"}
          >
           {props.root_page&& <NavigateNextIcon sx={{verticalAlign:'middle'}}/>} {props.page_name}
          </Typography>
        </Stack>
      </Container>
      <Divider light />
    </>
  );
};

export default Breadcrumb;
