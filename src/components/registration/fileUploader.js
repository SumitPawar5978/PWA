import React from "react";
import { useState } from "react";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Button } from "@mui/material";
import styles from "@/styles/Home.module.css";
import { imageToBase64 } from "./imageToBase64";
import { useDispatch, useSelector } from "react-redux";
import { setAgentAdharDetail, setUserData } from "@/src/app/reducer";

const FileUploader = ({ doc }) => {
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
  const [selectedImage, setSelectedImage] = useState();
  const userdata = useSelector((state) => state.reducer.userdata);
  const role = useSelector((state) => state.reducer.role);

  const dispatch = useDispatch();
  const imageChange = async (e) => {
    const file = e.target.files[0];
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      if (doc?.docName === "adhar") {
        dispatch(setAgentAdharDetail({ adhar_pic: e.target.files[0] }));
      } else {
        dispatch(setUserData({ ...userdata, profile_pic: e.target.files[0] }));
      }
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  return (
    <>
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
    </>
  );
};

export default FileUploader;
