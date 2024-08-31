import React, { useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import {
  poppins_400,
  poppins_500,
  poppins_600,
  roboto_400,
} from "@/src/components/common/font";
import Banner from "@/public/assets/images/banner.png";
import LogoLg from "@/public/assets/images/logo_lg.png";
import Image from 'next/image';
import LinearProgress from '@mui/material/LinearProgress';
import Link from 'next/link';
import styles from '@/styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { loginAxios } from '@/src/utils/axios';
import { setAgentUserDetails, setLoginRole, setLoginUserName, setUserDetails } from '@/src/app/reducer';
import { useRouter } from 'next/router';
const ThankyouMsg = ({data}) => {
  const userdata = useSelector((state) => state.reducer.userdata);
  const role = useSelector((state) => state.reducer.role);
  console.log(data.password,'dataaa')
  const [progress, setProgress] = React.useState(100);
  const dispatch = useDispatch();
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
  const clickHandler = async () => {

    await loginAxios({mobile_no:userdata.mobile_no,password:data.password})
      .then(async (res) => {
     console.log(res,'resssssss')
        if (res.data.status === "success") {
          await localStorage.setItem(
            "userDetails",
            JSON.stringify(res.data.authorisation)
          );
          dispatch(setUserDetails(res.data.authorisation));
          dispatch(setLoginUserName(res?.data?.user?.firstName));
          dispatch(setLoginRole(res?.data?.user?.role));
          dispatch(setAgentUserDetails({...res?.data?.user,password:data.password}))
      

          Toast.fire({
            icon: "success",
            title: "Logged in successfully",
          });
        } else {
        
          Swal.fire({
            title: "Login failed",
            text: res?.data?.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Login failed",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };


  useEffect(() => {
    if(role==="User"){
      setTimeout(() => {
        clickHandler()      
      }, 2000);
    }
   
  }, [])
  
  return (
    <>
       <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        color="#fff"
        sx={{
          position: "relative",
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          minHeight: "100vh",
          backgroundImage: `url(${Banner.src})`,
          boxShadow: "inset 0 0 0 2000px #0d1f37cc;",
        }}
      >
        <Container sx={{ py: 5 }}>
          <Box
          position={'relative'}
            bgcolor={"#fff"}
            borderRadius={"5px"}
            sx={{ padding:{md:"60px",xs:'10px'}, margin:{md: "0px 60px",xs:'0px'} }}
          >
            <Typography
              textAlign={"center"}
              variant='poppins_600' component={'p'}
              sx={{fontSize:{sm:'50px',xs:'30px'}}}
              color={"space.main"}
              letterSpacing={"1.44px"}
            > Thank {" "}
              <Typography
                variant='poppins_600' 
                sx={{fontSize:{sm:'50px',xs:'30px'}}}
                color={"gold.main"}
                component="span"
              >
                You {" "}
              </Typography>
              For Choosing Us!
            </Typography>
            <Typography
              textAlign={"center"}
              variant='poppins_600' component={'p'}
              sx={{fontSize:{sm:'20px',xs:'15px'}}}
              color={"space.main"}
              letterSpacing={"1.44px"}
            >
             We're So Glad You're A Part Of Our Community.
            </Typography>

            <Stack justifyContent={"center"} alignItems={"center"}>
              <Box sx={{width:{md:'482px'}}} textAlign={'center'} pt={2}>
             <Image src={LogoLg} alt={'logo'} />

                <Link href={'/'}>
                <Button
                  fullWidth
                  className={styles.poppins_600}
                  variant="contained"
                  sx={{
                    border: "3px solid #B58A44",
                    borderRadius: "75px",
                    backgroundColor: "gold.main",
                    padding: "6px",
                    mt: 1.5,
                    mb: 3,
                    color: "space.main",
                    fontSize: "18px",
                  }}
                >
                Take me to home page
                </Button>
                </Link>
              </Box>
            </Stack>
            <Box sx={{ width: '100%', position: 'absolute', left: '0', bottom: '0', }}>
              <LinearProgress variant="determinate" value={progress} sx={{ borderRadius: '15px', height: '5px', backgroundColor: '#cf9b456e', "& .MuiLinearProgress-bar": { backgroundColor: '#CF9B45' } }} />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default ThankyouMsg