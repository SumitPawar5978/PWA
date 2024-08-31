import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useRouter } from "next/router";
import CloseIcon from '@mui/icons-material/Close';
import Logo from "@/public/assets/images/logo.png";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import NavItem from "./navItem";
import { Divider, Link, Stack, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
const pages = [
  { label: "Home", route: "/" },
  { label: "Properties", route: "/property", subitems: [{ label: "Property List", route: "/property" }, { label: "Post Property", route: "/property/postProperty" }] },
  { label: "About Us", route: "/about" },
  { label: "Contact Us", route: "/contact" },
  { label: "Privacy Policy", route: "/privacy" },
];

function ResponsiveAppBar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
    <AppBar position="static" sx={{ backgroundColor: "#fff", boxShadow: "unset" }}>
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer}
              color=""
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{display:{xs:'block',md:'none'}, transform:'translateY(8px)'}}>
            <Image
              src={Logo}
              alt="Picture of the author"
              width={100}
              height={40}
              blurDataURL="data:..."
            />
            </Box>
            <Drawer
              anchor="left"
              open={isDesktop ? false : isDrawerOpen}
              onClose={toggleDrawer}
            >
               <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} px={2} py={1}>
               <Image
              src={Logo}
              alt="Picture of the author"
              width={100}
              height={50}
              blurDataURL="data:..."
            />
            <CloseIcon onClick={toggleDrawer}/>
               </Stack>
            <Divider/>
              <List sx={{ width: '350px' }}>
                {
                  
                <NavItem toggleDrawerProps={toggleDrawer}/>
                }
              </List>
            </Drawer>
          </Box>

<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <NavItem toggleDrawerProps={toggleDrawer}/>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
          <Link href="#"><FacebookIcon sx={{ color: "#A1ACC2", mx: 0.5, "&:hover":{color:'gold.main'} }} /></Link>
           <Link href="#"><TwitterIcon sx={{ color: "#A1ACC2", mx: 0.5, "&:hover":{color:'gold.main'} }} /></Link>
           <Link href="#"><InstagramIcon sx={{ color: "#A1ACC2", mx: 0.5, "&:hover":{color:'gold.main'} }} /></Link>
           <Link href="#"><WhatsAppIcon sx={{ color: "#A1ACC2", mx: 0.5, "&:hover":{color:'gold.main'} }} /></Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Divider/>
    </>
  );
}

export default ResponsiveAppBar;
