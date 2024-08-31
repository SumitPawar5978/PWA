import React from "react";
import { useState } from "react";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Button } from "@mui/material";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setIsImgSelected } from "@/src/app/reducer";

const PropertyPhoto = ({ index, selectedImage, setSelectedImage  }) => {
  const dispatch=useDispatch();
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      my: {md:1,sm:0},
    },
    preview: {
      marginTop: 50,
      display: "flex",
      flexDirection: "column",
    },
    image: {
      width: "150px",
      height: "150px",
      borderRadius: "15px",
      position: "absolute",
      top: "0px",
      left: "0",
      right: "0",
      margin: "0 auto",
      border: "1px dashed #CDCDCD",
    },
    delete: {
      cursor: "pointer",
      padding: 0,
      background: "transparent",
      color: "white",
      borderRadius: "50%",
      position: "absolute",
      top: "0px",
      marginLeft: "30px",
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
      borderRadius: "15px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "1px dashed #CDCDCD",
    },
  };
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      dispatch(setIsImgSelected(true)); 
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(undefined);
  dispatch(setIsImgSelected(false)); 
  };

  console.log(selectedImage,'selectedImage')
  return (
    <>
   <Box sx={styles.container}>
        <input
          style={styles.inputImageStyle}
          id={`inputImage-${index}`} // Use the index to make it unique
          accept="image/*"
          type="file"
          onChange={imageChange}
        />
        <Box
          component="label"
          htmlFor={`inputImage-${index}`} // Use the index to make it unique
          style={styles.inputLabelStyle}
        >
          <AddPhotoAlternateOutlinedIcon
            sx={{ color: "#B3B3B3", fontSize: "50px" }}
          />
        </Box>
        {selectedImage && (
          <Box style={styles.preview}>
            <Image
              src={URL.createObjectURL(selectedImage)}
              style={styles.image}
              alt="Thumb"
              height={150}
              width={150}
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

export default PropertyPhoto;
