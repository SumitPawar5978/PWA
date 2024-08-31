
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import { styled } from "@mui/system";
import { getInTouchPost } from "@/src/utils/axios";
import { useSelector } from "react-redux";
const MyStyledBox = styled(Box)(({ theme }) => ({
  "& .MuiOutlinedInput-input": { paddingTop: "12px" },
  "& .MuiInputLabel-root": { color: "#151515", fontSize: "14px" },
  "& .MuiOutlinedInput-root": {
    borderRadius: "100px",
    backgroundColor: "#F3F4F9",
  },
  "& .MuiOutlinedInput-root:before": { borderBottom: "unset !important" },
  "& .MuiOutlinedInput-notchedOutline":{borderColor:'rgb(0 0 0 / 0%)'}
}));

const GetInTouch = () => {
  const selectedCityName = useSelector((state) => state.reducer.selectCity);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_no: '',
    message:'',
    district:selectedCityName
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(
      {
        name: '',
        email: '',
        phone_no: '',
        message:'',
        district:selectedCityName
      }
    );
    setErrors({});
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

  const validateMobileNumber = (number) => {
    // Regex to validate Indian mobile numbers
    const regex = /^[6-9]\d{9}$/;
    const invalidPatterns = [
      '0000000000',
      '0000000001',
      '3333333333',
      // Add other invalid patterns here
    ];

    if (!regex.test(number) || invalidPatterns.includes(number)) {
      return false;
    }
    return true;
  };
  const handleFormSubmit =async  (e) => {
    e.preventDefault();
    const newErrors = {};
      if (validateMobileNumber(formData.phone_no)) {
      // newErrors.phone_no = "valid";
      // Proceed with form submission logic
    } else {
      newErrors.phone_no = "Invalid mobile number";
    }
    if (formData.name === '') {
      newErrors.name = 'Name field is required';
    }
    if (formData.email === '') {
      newErrors.email = 'Email field is required';
    }else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.phone_no === '') {
      newErrors.phone_no = 'Phone number field is required';
    }
    else if (formData.phone_no && formData.phone_no.length !== 10) {
      newErrors.phone_no = 'Phone number must be 10 digits';
  }
    if (formData.message === '') {
      newErrors.message = 'Message field is required';
    }


   
 
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        const res = await getInTouchPost(formData);
        Toast.fire({
          icon: 'success',
          title: res.data.message
        }) 
        setIsLoading(false);
        resetForm()
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
     <Typography
                className={styles.poppins_600}
                fontSize={"39px"}
                lineHeight={"48px"}
                color={"space.main"}
                marginBottom={"20px"}
              >
                Get{" "}
                <Typography variant="span" color={"gold.main"}>
                  In{" "}
                </Typography>
                Touch
              </Typography>

              <Stack>
                <MyStyledBox>
            
                  <TextField
                    sx={{ marginBottom: "20px" }}
                    fullWidth
                    id="filled-basic"
                    label="Your Name"
                    variant="outlined"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                  />

                  <TextField
                    sx={{ marginBottom: "20px" }}
                    type="email"
                    fullWidth
                    id="outlined-basic"
                    label="E-mail"
                    variant="outlined"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />

                  <TextField
                    sx={{ marginBottom: "20px" }}
                    fullWidth
                    type="number"
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    name="phone_no"
                    value={formData.phone_no}
                    onChange={handleInputChange}
                    error={!!errors.phone_no}
                    helperText={errors.phone_no}
                  />

                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Message"
                    multiline
                    rows={4}
                    variant="outlined"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    sx={{
                      marginBottom: "20px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "25px !important",
                        backgroundColor: "#F3F4F9",
                      },
                    }}
                  />
                </MyStyledBox>
               <Box position={'relative'}>
               <Button
                 disabled={isLoading?true:false}
                type="submit"
                  className={styles.poppins_600}
                  variant="contained"
                  sx={{
                    width:{md:"289px",xs:'100%'},
                    borderRadius: "75px",
                    backgroundColor: "gold.main",
                    padding: "12px",
                    color: "#fff",
                    fontSize: "14px",
                  }}
                >
                  Send Message
                </Button>
                {isLoading && <CircularProgress style={{ marginTop: '20px',position:'absolute', bottom:'5px', left:'10px' }} />}
               </Box>
              </Stack>
              </form>
    </>
  )
}

export default GetInTouch