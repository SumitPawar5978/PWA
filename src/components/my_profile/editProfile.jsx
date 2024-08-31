import React, { useEffect, useState } from "react";
import PropListSidebar from "@/src/components/property/propListSidebar";
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "@/src/utils/theme";
import {
  poppins_400,
  poppins_500,
  poppins_600,
  roboto_400,
} from "@/src/components/common/font";
import Image from "next/image";
import styles1 from "@/styles/Home.module.css";
import PropertyCard from "@/src/components/common/propertyCard";
import Link from "next/link";
import Modal from "@mui/material/Modal";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { editUserProfileDetail } from "@/src/utils/axios";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditProfile = ({ refreshUserProfile }) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      margin: "20px 0px",
    },
    preview: {
      marginTop: 50,
      display: "flex",
      flexDirection: "column",
    },
    image: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      position: "absolute",
      top: "0px",
      left: "0",
      right: "0",
      margin: "0 auto",
    },
    delete: {
      cursor: "pointer",
      padding: 0,
      background: "transparent",
      color: "white",
      borderRadius: "50%",
      position: "absolute",
      top: "0px",
    },
    inputImageStyle: {
      display: "none",
      width: "600px",
      color: "black",
      background: "none",
      cursor: "pointer",
    },

    inputLabelStyle: {
      height: "150px",
      width: "150px",
      background: "#E0E0E080",
      cursor: "pointer",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  const userProfile = useSelector((state) => state.reducer.userProfile);
  const isInCurrentYear = (date) => date.get("year") === dayjs().get("year");
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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [formData, setFormData] = useState({
    firstName: userProfile?.userDetail.firstName,
    lastName: userProfile?.userDetail.lastName,
    email: userProfile?.userDetail.email,
    dob: dayjs(userProfile?.userDetail.dob),
  });

  const [errors, setErrors] = useState({});

  const handleDateChange = (date) => {
    setIsSubmitDisabled(false);
    setFormData({
      ...formData,
      dob: date,
    });
  };

  const handleInputChange = (e) => {
    setIsSubmitDisabled(false);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [selectedImage, setSelectedImage] = useState(
    userProfile?.userDetail.profile_pic
  );
  const [isImage, setIsImage] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [imageError, setImageError] = useState("");
  const [fileType, setFileType] = useState("");

  // const imageChange = async (e) => {
  //   const file = e.target.files[0];
  //   setFileType(file);
  //   setSelectedImage(file);
  //   setisImage(true);
  //   setIsSubmitDisabled(false);
  //   setImageError("");
  // };

  // const removeSelectedImage = () => {
  //   setIsImage(false);
  //   setSelectedImage();
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    const newErrors = {};
    setImageError(""); // Clear previous image error
  
    // Image validation
    if (!fileType && !selectedImage) {
      setImageError("Please select an image.");
      setIsSubmitDisabled(true);
      return;
    }
  
    if (fileType) {
      const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedImageTypes.includes(fileType.type)) {
        setImageError("Invalid image format. Please select a valid image file (JPEG, PNG, or GIF).");
        setIsSubmitDisabled(true);
        return;
      }
  
      const maxSizeInBytes = 1 * 1024 * 1024; // 1MB
      if (fileType.size > maxSizeInBytes) {
        setImageError("Image size is too large. Please select an image smaller than 1MB.");
        setIsSubmitDisabled(true);
        return;
      }
    }
  
    // Form data validation
    if (formData.firstName === "") {
      newErrors.firstName = "This field is required";
    }
    if (formData.lastName === "") {
      newErrors.lastName = "This field is required";
    }
    if (formData.email === "") {
      newErrors.email = "This field is required";
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.dob) {
      newErrors.dob = "This field is required";
    } else if (!dayjs().isAfter(formData.dob, "day")) {
      newErrors.dob = "Future date is not allowed";
    }
  
    // Update submit button state based on errors
    setIsSubmitDisabled(Object.keys(newErrors).length > 0);
  
    // If there are no errors, proceed with the form submission
    if (Object.keys(newErrors).length === 0) {
      const formattedDob = dayjs(formData.dob).format("YYYY-MM-DD");
  
      const formData2 = new FormData();
      formData2.append("firstName", formData.firstName);
      formData2.append("lastName", formData.lastName);
      formData2.append("email", formData.email);
      formData2.append("dob", formattedDob);
      if (isImage) {
        formData2.append("profile_pic", selectedImage);
      }
  
      try {
        let res = await editUserProfileDetail(formData2);
        if (res.data.status === "success") {
          Toast.fire({
            icon: "success",
            title: res?.data?.message,
          });
          await refreshUserProfile();
          handleClose();
        } else {
          Toast.fire({
            icon: "error",
            title: res.response.data.message,
          });
          setErrors(newErrors);
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        Toast.fire({
          icon: "error",
          title: "Failed to update the profile",
        });
        handleClose();
      }
    } else {
      setErrors(newErrors);
    }
  };
  
  // Image change handler
  const imageChange = async (e) => {
    const file = e.target.files[0];
    setFileType(file);
    setSelectedImage(file);
    setIsImage(true);
    setIsSubmitDisabled(false);
    setImageError("");
  };
  
  // Remove selected image
  const removeSelectedImage = () => {
    setIsImage(false);
    setSelectedImage(null);
    setFileType(""); // Clear fileType as well
  };
  

  return (
    <>
      <Button
        onClick={handleClickOpen}
        fullWidth
        className={styles1.poppins_600}
        variant="contained"
        sx={{
          my: 2,
          borderRadius: "75px",
          backgroundColor: "gold.main",
          padding: "12px",
          color: "#fff",
          fontSize: "14px",
        }}
      >
        Edit profile
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Profile
            </Typography>
            <Button
              disabled={isSubmitDisabled}
              autoFocus
              color="inherit"
              onClick={handleFormSubmit}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Container>
          <Stack justifyContent={"center"} alignItems={"center"}>
            <Box width={"482px"}>
              <Box style={styles.container}>
                <input
                  style={styles.inputImageStyle}
                  id="inputImage"
                  accept="image/*"
                  type="file"
                  onChange={imageChange}
                />
                <Box
                  component="label"
                  htmlFor="inputImage"
                  style={styles.inputLabelStyle}
                >
                  <AddPhotoAlternateOutlinedIcon
                    sx={{ color: "#1A2B56", fontSize: "50px" }}
                  />
                </Box>
                {selectedImage && (
                  <Box style={styles.preview}>
                    <img
                      src={
                        isImage
                          ? URL.createObjectURL(selectedImage)
                          : selectedImage
                      }
                      style={styles.image}
                      alt="Thumb"
                    />
                    <Button
                      variant="text"
                      onClick={removeSelectedImage}
                      style={styles.delete}
                    >
                      {" "}
                      <CloseRoundedIcon
                        sx={{
                          color: "#fff",
                          backgroundColor: "#1A2B56",
                          borderRadius: "50%",
                        }}
                      />
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
            {imageError && (
              <Typography color={"#ff0000"} fontSize={"14px"}>
                {imageError}
              </Typography>
            )}
          </Stack>

          <Grid container pt={5}>
            <Grid item md={6} sm={6} xs={12}>
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
                  "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                  "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                  "& .MuiInputLabel-root": { lineHeight: "unset" },
                  backgroundColor: "#FFFFFF",
                }}
              />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
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
                  pl: { xs: 0, sm: 1 },
                  "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                  "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                  "& .MuiInputLabel-root": {
                    lineHeight: "unset",
                    padding: "0px 10px !important",
                  },
                  backgroundColor: "#FFFFFF",
                }}
              />
            </Grid>
            <Grid item md={12} sm={6} xs={12}>
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
            <Grid item md={12} sm={6} xs={12}>
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
                    pl: { xs: 0, sm: 1, md: 0 },
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
                      color: errors.dob ? "#d32f2f" : "rgba(0, 0, 0, 0.6)",
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
          </Grid>
        </Container>
      </Dialog>
    </>
  );
};

export default EditProfile;
