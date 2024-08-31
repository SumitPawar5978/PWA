import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

import {
  poppins_400,
  poppins_500,
  poppins_600,
  roboto_400,
} from "@/src/components/common/font";
import Banner from "@/public/assets/images/banner.png";
import LogoLg from "@/public/assets/images/logo_lg.png";
import Image from "next/image";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { agentVerifyOTP, verifyOtp } from "@/src/utils/axios";
import { setUserData } from "@/src/app/reducer";
const OtpAuth = ({ handleNext }) => {
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
  const userdata = useSelector((state) => state.reducer.userdata);
  const role = useSelector((state) => state.reducer.role);
  const dispatch = useDispatch();
  const [progress, setProgress] = React.useState(25);

  const [formData, setFormData] = useState({
    otp: "",
  });

  console.log(userdata,'userdata')
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    // e.preventDefault();

    const newErrors = {};
    if (formData.otp === "") {
      newErrors.otp = "This field is required";
    }

    if (Object.keys(newErrors).length === 0) {
   
      const verify = async () => {
        if (role === "User") {
          let res = await verifyOtp({ ...userdata, otp: formData.otp });
          dispatch(setUserData({ ...userdata, user_id: res.data.user_id }));
          Toast.fire({
            icon:  res.data.status==="success"?"success":"warning",
            title: res?.data?.message,
          });
          res.data.status==="success"? handleNext():""
        } else {
          let res = await agentVerifyOTP({ ...userdata, otp: formData.otp });
          Toast.fire({
            icon:  res.data.status==="success"?"success":"warning",
            title: res?.data?.message,
          });
          res.data.status==="success"? handleNext():""
          dispatch(
            setUserData({
              ...userdata,
              manage_agent_id: res.data.manage_agent_id,
            })
          );
        }
      };

      verify();
     
    } else {
      setErrors(newErrors);
    }
  };
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
            position={"relative"}
            bgcolor={"#fff"}
            borderRadius={"5px"}
            sx={{ padding:{md:"60px",xs:'10px'}, margin:{md: "0px 60px",xs:'0px'} }}
          >
            <Typography
              textAlign={"center"}
              variant="poppins_600"
              component={"p"}
              sx={{fontSize:{sm:'50px',xs:'30px'}}}
              color={"space.main"}
              letterSpacing={"1.44px"}
            >
              {" "}
              OTP{" "}
              <Typography
                variant="poppins_600"
                sx={{fontSize:{sm:'50px',xs:'30px'}}}
                color={"gold.main"}
                component="span"
              >
                Verification{" "}
              </Typography>
            </Typography>
            <Typography
              textAlign={"center"}
              variant="poppins_600"
              component={"p"}
              sx={{fontSize:{sm:'20px',xs:'15px'}}}
              color={"space.main"}
              letterSpacing={"1.44px"}
            >
              We Sent You A Code To Verify Your Number
            </Typography>
            <Typography
              pt={4}
              className={roboto_400.className}
              textAlign={"center"}
              fontSize={"14px"}
              color={"space.main"}
            >
              Please check your entered mobile number
            </Typography>

            <Box display={"flex"} justifyContent={"center"}>
              <Box width={"482px"} textAlign={"center"}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Enter OTP"
                  variant="outlined"
                  type="text"
                  name="otp"
                  value={formData.otp}
                  // onChange={handleInputChange}
                  onChange={(e)=>{
                    if(!isNaN(e.target.value)){
                      handleInputChange(e)
                    }
                  }}
                  error={!!errors.otp}
                  helperText={errors.otp}
                  sx={{
                    my: 3,
                    "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                    "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                    "& .MuiInputLabel-root": { lineHeight: "unset" },
                    backgroundColor: "#FFFFFF",
                  }}
                />
                <Typography
                  className={roboto_400.className}
                  textAlign={"center"}
                  fontSize={"14px"}
                  color={"space.main"}
                >
                  Please ensure that your entered OTP is correct
                </Typography>
                <Button
                  fullWidth
                  className={styles.poppins_600}
                  variant="contained"
                  sx={{
                    border: "3px solid #B58A44",
                    borderRadius: "75px",
                    backgroundColor: "gold.main",
                    padding: "6px",
                    mt: 3,
                    mb: 3,
                    color: "space.main",
                    fontSize: "18px",
                  }}
                  onClick={handleFormSubmit}
                >
                  Submit
                </Button>
                <Box display={"flex"} justifyContent={"center"}>
                  <Typography
                    className={roboto_400.className}
                    textAlign={"center"}
                    fontSize={"14px"}
                    color={"space.main"}
                    pr={1}
                  >
                    OTP not received yet ?
                  </Typography>
                  <Link href="#">Resend OTP</Link>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                position: "absolute",
                left: "0",
                bottom: "0",
              }}
            >
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  borderRadius: "15px",
                  height: "5px",
                  backgroundColor: "#cf9b456e",
                  "& .MuiLinearProgress-bar": { backgroundColor: "#CF9B45" },
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OtpAuth;
