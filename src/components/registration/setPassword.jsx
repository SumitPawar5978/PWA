import React from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";

import {
  poppins_400,
  poppins_500,
  poppins_600,
  roboto_400,
} from "@/src/components/common/font";
import { useState } from "react";
import Banner from "@/public/assets/images/banner.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import OutlinedInput from "@mui/material/OutlinedInput";
import LinearProgress from '@mui/material/LinearProgress';
import styles from '@/styles/Home.module.css'
import { agentPasswordUpdate, passwordUpdate } from '@/src/utils/axios';
import { useSelector } from 'react-redux';
const SetPassword = ({ handleNext,setData }) => {
  const [progress, setProgress] = React.useState(75);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const userdata = useSelector((state) => state.reducer.userdata);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const role = useSelector((state) => state.reducer.role);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const Swal = require('sweetalert2')
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const [formData, setFormData] = useState({
    password: "",  
    re_password: "",  
  });

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
    if (formData.password === "") {
      newErrors.password = "This field is required";
    }   
    else if (formData.re_password === "") {
      newErrors.re_password = "This field is required";
    }   
    else if(formData.re_password!=formData.password){
      newErrors.re_password = "Password mismatch";
    }else if (formData.password.length < 8) {
      // Check if password is too short
      newErrors.password = "Password must be at least 8 characters";
    } else if (formData.password.length > 12) {
      // Check if password is too long
      newErrors.password = "Password must be at most 12 characters";
    }
    if (Object.keys(newErrors).length === 0) {
      if(role==="User"){
    
        passwordUpdate({...userdata,password:formData.password,re_enter_password:formData.re_password,})
        Toast.fire({
          icon: 'success',
          title: 'Registered successfully'
        }) 
        handleNext();
        setData({password:formData.password})
      }else{
     
        agentPasswordUpdate({...userdata,password:formData.password,re_enter_password:formData.re_password,})
        Toast.fire({
          icon: 'success',
          title: 'Registered successfully'
        }) 
        handleNext();
      }
    
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
          <Box bgcolor={"#fff"} borderRadius={'5px'} position={'relative'}   sx={{ padding:{md:"60px",xs:'10px'}, margin:{md: "0px 60px",xs:'0px'} }}>
            <Typography
              textAlign={"center"}
             variant='poppins_600' component={'p'}
              sx={{fontSize:{sm:'50px',xs:'30px'}}}
              color={"space.main"}
              letterSpacing={"1.44px"}
            >
              Set{" "}
              <Typography
               variant='poppins_600'
                sx={{fontSize:{sm:'50px',xs:'30px'}}}
                color={"gold.main"}
                component="span"
              >
                Password
              </Typography>
            </Typography>
            <Typography
              textAlign={"center"}
             variant='poppins_600' component={'p'}
             sx={{fontSize:{sm:'20px',xs:'15px'}}}
              color={"space.main"}
              letterSpacing={"1.44px"}
            >
             Strong Passwords Keep Your Accounts Safe.
            </Typography>

            <Stack mt={5} justifyContent={"center"} alignItems={"center"}>
              <Box sx={{width:{md:'482px'}}}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 1.5,
                    "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <InputLabel htmlFor="outlined-adornment-password" sx={{ lineHeight: 'unset',bgcolor:'#fff', pr:1 }}>
                    Enter Password
                  </InputLabel>
                  <OutlinedInput
                   name="password"
                   value={formData.password}
                   onChange={handleInputChange}
                   error={!!errors.password}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                      "& .MuiOutlinedInput-input": { padding: '13.5px 14px' },
                    }}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                   <FormHelperText id="outlined-weight-helper-text">{errors.password}</FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 1.5,
                    "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <InputLabel htmlFor="outlined-adornment-password"sx={{ lineHeight: 'unset',bgcolor:'#fff', pr:1 }}>
                    Re-Enter Password
                  </InputLabel>
                  <OutlinedInput
                   name="re_password"
                   value={formData.re_password}
                   onChange={handleInputChange}
                   error={!!errors.re_password}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                      "& .MuiOutlinedInput-input": { padding: '13.5px 14px' },
                    }}
                    id="outlined-adornment-password"
                    type={showPassword2 ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword2 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                         <FormHelperText id="outlined-weight-helper-text">{errors.re_password}</FormHelperText>
                </FormControl>
              </Box>
              <Button
                className={styles.poppins_600}
                variant="contained"
                sx={{
                  width: {md:"482px",xs:'100%'},
                  border: "3px solid #B58A44",
                  borderRadius: "75px",
                  backgroundColor: "gold.main",
                  padding: "6px",
                  mt: 1.5,
                  mb: 3,
                  color: "space.main",
                  fontSize: "18px",
                }}
                onClick={handleFormSubmit}
              >
                submit
              </Button>
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

export default SetPassword