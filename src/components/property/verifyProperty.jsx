import { Button } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "@/styles/Home.module.css";
import {  userPropertyVerificationRequest } from "@/src/utils/axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 770,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

const VerifyProperty = ({property_id}) => {
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
  
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  

    const handlePropertyLog = async (id) => {
      
      try {
        let res = await userPropertyVerificationRequest(id);
        Toast.fire({
              icon: 'success',
              title:res?.data?.message
            })  
        handleClose()
      } catch (error) {
        console.error('Error fetching property data:', error);
        // Handle error state or show an error message to the user
      }
    
    };
  return (
    <>
    <Button
      variant="outlined"
      size="small"
      sx={{ fontSize: "12px" }}
      onClick={handleOpen}
    >
      Verify Property
    </Button>

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          textAlign={"center"}
          variant="poppins_600"
          component={"p"}
          fontSize={"50px"}
          color={"space.main"}
          letterSpacing={"1.44px"}
        >
          Verify {" "}
          <Typography
            variant="poppins_600"
            fontSize={"50px"}
            color={"gold.main"}
            component="span"
          >
            Property !
          </Typography>
        </Typography>
        <Typography
          textAlign={"center"}
          variant="poppins_600"
          component={"p"}
          fontSize={"20px"}
          color={"space.main"}
          letterSpacing={"1.44px"}
          pb={1}
        >
     Do you want to Verify this property?
        </Typography>
        <Typography
          textAlign={"center"}
          component={"p"}
          fontSize={"14px"}
          color={"#9A9A9A"}
          letterSpacing={"1.44px"}
        >
     After the Confirmation our Team will contact you to share information
about Verify property feature
        </Typography>

        <Box display={'flex'} justifyContent={'center'} pt={4}>
          <Button
            className={styles.poppins_600}
            variant="contained"
            sx={{
              marginRight:'50px',
              borderRadius: "75px",
              backgroundColor: "gold.main",
              padding: "8px 12px",
              color: "#fff",
              fontSize: "14px",
            }}
            onClick={()=>handlePropertyLog(property_id)}
          >
           Confirm
          </Button>
          <Button
            className={styles.poppins_600}
            sx={{
              marginLeft:'50px',
              borderRadius: "75px",
              padding: "8px 12px",
              color: "#1A2B56",
              fontSize: "14px",
            }}
            onClick={handleClose}
          >
           Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  </>
  )
}

export default VerifyProperty