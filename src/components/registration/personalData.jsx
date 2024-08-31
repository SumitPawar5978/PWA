import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "@/src/utils/theme";
import Checkbox from "@mui/material/Checkbox";
import styles from "@/styles/Home.module.css";
import {
  poppins_400,
  poppins_500,
  poppins_600,
  roboto_400,
} from "@/src/components/common/font";
import Banner from "@/public/assets/images/banner.png";
import LinearProgress from "@mui/material/LinearProgress";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/src/app/reducer";
import {
  agentSendOTP,
  getAllCity,
  getAllDistrict,
  getAllState,
  getAllTaluka,
  registerUser,
} from "@/src/utils/axios";

const PersonalData = ({ handleNext }) => {
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
  const [progress, setProgress] = React.useState(15);
  const today = dayjs();
  const isInCurrentYear = (date) => date.get("year") === dayjs().get("year");
  const dispatch = useDispatch();
  const role = useSelector((state) => state.reducer.role);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile_no: "",
    email: "",
    dob: "",
    address: "",
    city: "",
    district_id: "",
    state_id: "",
    taluka_id: "",
  });

  const [stateValue, setStateValue] = useState(null);
  const [stateInputValue, setStateInputValue] = useState("");
  const [districtValue, setDistrictValue] = useState(null);
  const [districtInputValue, setDistrictInputValue] = useState("");
  const [talukaValue, setTalukaValue] = useState(null);
  const [talukaInputValue, setTalukaInputValue] = useState("");
  const [cityValue, setCityValue] = useState(null);
  const [cityInputValue, setCityInputValue] = useState("");

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});


  console.log(stateValue?.state_id,'states')
  console.log(districtValue?.district_id,'states')
  console.log(talukaValue?.taluka_id,'states')
  console.log(cityValue?.city_id,'states')
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dob: date,
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchStates = async () => {
      try {
        let res = await getAllState(1);
        setStates(res.data.stateArr);
      } catch (error) {
        console.error("Failed to fetch states:", error);
      }
    };

    fetchStates();
  }, []);

  const handleStateChange = async (event, newValue) => {
    setStateValue(newValue);

    if (newValue) {
      try {
        let res = await getAllDistrict(newValue.state_id);
        setDistricts(res.data.districtArr);
        setDistrictValue(null);
        setTalukaValue(null);
        setCityValue(null);
        setTalukas([]);
        setCities([]);
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      }
    } else {
      setDistricts([]);
      setDistrictValue(null);
      setTalukaValue(null);
      setCityValue(null);
      setTalukas([]);
      setCities([]);
    }
  };

  const handleDistrictChange = async (event, newValue) => {
    setDistrictValue(newValue);

    if (newValue) {
      try {
        let res = await getAllTaluka(newValue.district_id);
        setTalukas(res.data.talukaArr);
        setTalukaValue(null);
        setCityValue(null);
        setCities([]);
      } catch (error) {
        console.error("Failed to fetch talukas:", error);
      }
    } else {
      setTalukas([]);
      setTalukaValue(null);
      setCityValue(null);
      setCities([]);
    }
  };

  const handleTalukaChange = async (event, newValue) => {
    setTalukaValue(newValue);
    if (newValue) {
      try {
        let res = await getAllCity(newValue.taluka_id);
        setCities(res.data.cityArr);
        setCityValue(null);       
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    } else {
      setCities([]);
      setCityValue(null);
    }
  };

  useEffect(() => {    
    setFormData(
      {...formData,
        state_id:stateValue?.state_id,
        district_id:districtValue?.district_id,
        taluka_id:talukaValue?.taluka_id,
        city:cityValue?.city_id
       }
    )
  }, [cityValue?.city_id])
  


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

  const handleFormSubmit = async (e) => {
   
    dispatch(setUserData(formData));
    const newErrors = {};
    if (validateMobileNumber(formData.mobile_no)) {
      // newErrors.mobile_no = "valid";
      // Proceed with form submission logic
    } else {
      newErrors.mobile_no = "Invalid mobile number";
    }

    if (formData.firstName === "") {
      newErrors.firstName = "This field is required";
    }
    if (formData.lastName === "") {
      newErrors.lastName = "This field is required";
    }
    if (formData.mobile_no === "") {
      newErrors.mobile_no = "This field is required";
    } else if (formData.mobile_no.length !== 10) {
      newErrors.mobile_no = "Phone number must be 10 digits";
    }
    if (formData.email === "") {
      newErrors.email = "This field is required";
    }
    if (!formData.email) {
      newErrors.email = "This field is required";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.dob) {
      newErrors.dob = "This field is required";
    } else if (!dayjs().isAfter(formData.dob, "day")) {
      newErrors.dob = "Future date is not allowed";
    }
    if (formData.address === "") {
      newErrors.address = "This field is required";
    }
    
    if (stateValue == null) {
      newErrors.stateValue = "This field is required";
    }
    if (districtValue == null) {
      newErrors.districtValue = "This field is required";
    }
    if (talukaValue == null) {
      newErrors.talukaValue = "This field is required";
    }
    if (cityValue == null) {
      newErrors.cityValue = "This field is required";
    }

   
    if (Object.keys(newErrors).length === 0) {
      if (role === "User") {
        let res = await registerUser({
          mobile_no: formData.mobile_no,
          email: formData.email,
        });
        Toast.fire({
          icon: res.data.status === "success" ? "success" : "warning",
          title: res?.data?.message,
        });
        res.data.status === "success" ? handleNext() : "";
      } else {
        let res = await agentSendOTP({
          mobile_no: formData.mobile_no,
          email: formData.email,
        });
        Toast.fire({
          icon: res.data.status === "success" ? "success" : "warning",
          title: res?.data?.message,
        });
        res.data.status === "success" ? handleNext() : "";
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
          <Box
            bgcolor={"#fff"}
            borderRadius={"5px"}
            sx={{
              padding: { md: "60px", xs: "10px" },
              margin: { md: "0px 60px", xs: "0px" },
            }}
            position={"relative"}
          >
            <Typography
              textAlign={"center"}
              variant="poppins_600"
              component={"p"}
              sx={{ fontSize: { sm: "50px", xs: "30px" } }}
              color={"space.main"}
              letterSpacing={"1.44px"}
            >
              Create{" "}
              <Typography
                variant="poppins_600"
                sx={{ fontSize: { sm: "50px", xs: "30px" } }}
                color={"gold.main"}
                component="span"
              >
                New{" "}
              </Typography>
              Account
            </Typography>
            <Typography
              textAlign={"center"}
              variant="poppins_600"
              component={"p"}
              sx={{ fontSize: { sm: "20px", xs: "15px" } }}
              color={"space.main"}
              letterSpacing={"1.44px"}
            >
              Enter Your Personal Data
            </Typography>

            <Stack mt={5} justifyContent={"center"} alignItems={"center"}>
              <Box sx={{ width: { md: "482px" } }}>
                <Grid container>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Enter First Name"
                      variant="outlined"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      sx={{
                        my: 1,
                        pr: { md: 1 },
                        "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                        "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                        "& .MuiInputLabel-root": { lineHeight: "unset" },
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Enter Last Name"
                      variant="outlined"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      sx={{
                        my: 1,
                        pl: { md: 1 },
                        "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                        "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                        "& .MuiInputLabel-root": {
                          lineHeight: "unset",
                          pl: { md: 1 },
                        },
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <TextField
                      type="text"
                      fullWidth
                      id="outlined-basic"
                      label="Enter Mobile Number"
                      variant="outlined"
                      name="mobile_no"
                      value={formData.mobile_no}
                      // onChange={handleInputChange}
                      onChange={(e) => {
                        if (!isNaN(e.target.value)) {
                          handleInputChange(e);
                        }
                      }}
                      error={!!errors.mobile_no}
                      helperText={errors.mobile_no}
                      sx={{
                        my: 1,
                        "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                        "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                        "& .MuiInputLabel-root": { lineHeight: "unset" },
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <TextField
                      type="email"
                      fullWidth
                      id="outlined-basic"
                      label="Enter Email Id"
                      variant="outlined"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      sx={{
                        my: 1,
                        "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                        "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                        "& .MuiInputLabel-root": { lineHeight: "unset" },
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        shouldDisableYear={isInCurrentYear}
                        disableFuture
                        label="Select Date of Birth"
                        value={formData.dob}
                        onChange={handleDateChange}
                        error={!!errors.dob}
                        helperText={errors.dob}
                        format="DD/MM/YYYY"
                        slotProps={{
                          textField: {
                            helperText: errors.dob,
                          },
                        }}
                        sx={{
                          my: 1,
                          width: "100%",
                          "& .MuiSvgIcon-root": {
                            fill: errors.dob ? "#d32f2f" : "#000 !important",
                          },
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "75px",
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "13.5px 14px",
                            color: errors.dob
                              ? "#d32f2f"
                              : "rgba(0, 0, 0, 0.6)",
                          },
                          "& .MuiInputLabel-root": {
                            lineHeight: "unset",
                            color: errors.dob ? "#d32f2f" : "#000 !important",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: errors.dob
                              ? "#d32f2f"
                              : "rgba(0, 0, 0, 0.23) !important",
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item sm={12} xs={12}>
                    <Autocomplete
                      value={stateValue}
                      onChange={handleStateChange}
                      inputValue={stateInputValue}
                      onInputChange={(event, newInputValue) => {
                        setStateInputValue(newInputValue);
                      }}
                      id="controllable-states-demo"
                      options={states}
                      getOptionLabel={(option) => option.state_name}
                      sx={{
                        my: 1,
                        "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                        backgroundColor: "#FFFFFF",
                      }}
                      renderInput={(params) => (
                        <TextField 
                        {...params} 
                        label="Select state" 
                        error={!!errors.stateValue}
                        helperText={errors.stateValue}
                      />
                      )}
                    />
                  </Grid>

                  <Grid item sm={12} xs={12}>
                    <Autocomplete
                      value={districtValue}
                      onChange={handleDistrictChange}
                      inputValue={districtInputValue}
                      onInputChange={(event, newInputValue) => {
                        setDistrictInputValue(newInputValue);
                      }}
                      id="controllable-districts-demo"
                      options={districts}
                      getOptionLabel={(option) => option.district}
                      sx={{
                        my: 1,
                        "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                        backgroundColor: "#FFFFFF",
                      }}
                      renderInput={(params) => (
                        <TextField 
                        {...params} 
                        label="Select district" 
                        error={!!errors.districtValue}
                        helperText={errors.districtValue}
                      />
                      )}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Autocomplete
                      value={talukaValue}
                      onChange={handleTalukaChange}
                      inputValue={talukaInputValue}
                      onInputChange={(event, newInputValue) => {
                        setTalukaInputValue(newInputValue);
                      }}
                      id="controllable-talukas-demo"
                      options={talukas}
                      getOptionLabel={(option) => option.taluka_name}
                      sx={{
                        my: 1,
                        "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                        backgroundColor: "#FFFFFF",
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select taluka" 
                        error={!!errors.talukaValue}
                        helperText={errors.talukaValue}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Autocomplete
                      value={cityValue}
                      onChange={(event, newValue) => {
                        setCityValue(newValue);
                      }}
                      inputValue={cityInputValue}
                      onInputChange={(event, newInputValue) => {
                        setCityInputValue(newInputValue);
                      }}
                      id="controllable-cities-demo"
                      options={cities}
                      getOptionLabel={(option) => option.city_name}
                      sx={{
                        my: 1,
                        "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                        backgroundColor: "#FFFFFF",
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select city"
                        error={!!errors.cityValue}
                        helperText={errors.cityValue}
                         />
                      )}
                    />
                  </Grid>

                  <Grid item sm={12} xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Enter Detailed Address"
                      variant="outlined"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      error={!!errors.address}
                      helperText={errors.address}
                      sx={{
                        my: 1,
                        "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                        "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                        "& .MuiInputLabel-root": { lineHeight: "unset" },
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                  </Grid>
                </Grid>

                <Button
                  fullWidth
                  className={styles.poppins_600}
                  variant="contained"
                  sx={{
                    border: "3px solid #B58A44",
                    borderRadius: "75px",
                    backgroundColor: "gold.main",
                    padding: "6px",
                    mt: 1,
                    mb: 3,
                    color: "space.main",
                    fontSize: "18px",
                  }}
                  onClick={handleFormSubmit}
                >
                  Create {role} Account
                </Button>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Typography
                    className={styles.roboto_400}
                    color={"#15151599"}
                    px={0.5}
                  >
                    Already a Member ?
                  </Typography>
                  <Link
                    className={styles.roboto_400}
                    px={0.5}
                    href="login"
                    underline="hover"
                    color={"space.main"}
                  >
                    Login
                  </Link>
                </Stack>
              </Box>
            </Stack>
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

export default PersonalData;
