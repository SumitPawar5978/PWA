import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  poppins_400,
  poppins_500,
  poppins_600,
  roboto_400,
} from "@/src/components/common/font";
import Banner from "@/public/assets/images/banner.png";
import FileUploader from "./fileUploader";
import LinearProgress from "@mui/material/LinearProgress";
import styles from "@/styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { agentUploadAdharDetail } from "@/src/utils/axios";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
const DocVerification = ({ handleNext }) => {
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

  const dispatch = useDispatch();
  const [progress, setProgress] = React.useState(35);
  const agentAdharDetail = useSelector(
    (state) => state.reducer.agentAdharDetail
  );
  const userdata = useSelector((state) => state.reducer.userdata);
  const [formData, setFormData] = useState({
    aadhar_no: "",
    adhar_img: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.replace(/[^0-9]/g, '')
    });
  };

  const [selectedImage, setSelectedImage] = useState();
  const [imageError, setImageError] = useState("");
  const [fileType, setFileType] = useState("");

  const imageChange = async (e) => {
    const file = e.target.files[0];
    setFileType(file);
    setSelectedImage(file);
    setImageError("");
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const handleFormSubmit = (e) => {
    // e.preventDefault();

    const newErrors = {};

    if (!fileType) {
      setImageError("Please select an image.");
      return;
    }

    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedImageTypes.includes(fileType.type)) {
      setImageError(
        "Invalid image format. Please select a valid image file (JPEG, PNG, or GIF)."
      );
      return;
    }

    const maxSizeInBytes = 1 * 1024 * 1024; // 1MB
    if (fileType.size > maxSizeInBytes) {
      setImageError(
        "Image size is too large. Please select an image smaller than 1MB."
      );
      return;
    }

    if (formData.aadhar_no === "") {
      newErrors.aadhar_no = "This field is required";
    }
    else if (formData.aadhar_no.length !== 12) {
      newErrors.aadhar_no = 'Aadhaar number must be 12 digits';
  }

    const handleAdharUpload = async () => {
      let formData2 = new FormData();
      let tmpobj = {
        adhar_no: formData?.aadhar_no,
        adhar_pic: selectedImage,
        manage_agent_id: userdata?.manage_agent_id,
      };
   
      Object.keys(tmpobj).forEach((key) => {
        formData2.append(key, tmpobj[key]);
      });
      let res = await agentUploadAdharDetail(formData2);
   
      if (res?.status === 200) {
        handleNext();
      }
    };
    if (Object.keys(newErrors).length === 0) {
      handleAdharUpload();
    } else {
      setErrors(newErrors);
    }
  };

  const params = {
    docName: "adhar",
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
            position={"relative"}
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
              Document{" "}
              <Typography
                variant="poppins_600"
              sx={{fontSize:{sm:'50px',xs:'30px'}}}
                color={"gold.main"}
                component="span"
              >
                Verification
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
              Please Share Your Original Document
            </Typography>

            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ paddingTop: "43px" }}
            >
              <Box sx={{width:{md:'482px'}}}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Enter Your Aadhaar Number"
                  variant="outlined"
                  name="aadhar_no"
                  value={formData.aadhar_no}
                  onChange={handleInputChange}
                  error={!!errors.aadhar_no}
                  helperText={errors.aadhar_no}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                    "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                    "& .MuiInputLabel-root": { lineHeight: "unset" },
                    backgroundColor: "#FFFFFF",
                  }}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    maxLength: 12,
                  }}
                />

                <Typography
                  className={roboto_400.className}
                  textAlign={"center"}
                  fontSize={"14px"}
                  color={"space.main"}
                >
                  Upload Your Aadhaar Card Photo
                </Typography>
                <Stack justifyContent={"center"} alignItems={"center"}>
                  <Box sx={{width:{md:'482px'}}}>
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
                            src={URL.createObjectURL(selectedImage)}
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
                  submit
                </Button>
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

export default DocVerification;
