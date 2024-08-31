import { Button } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "@/styles/Home.module.css";
import { propertyEnquiryRequest } from "@/src/utils/axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {ms:770,sm:650,xs:'90%'},
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const PropertyEnquiry = ({property_id}) => {

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

  const handleEnquiryRequest = async (id) => {
    
    try {
      let res = await propertyEnquiryRequest(id);
      Toast.fire({
            icon: 'success',
            title:res?.data?.message
          })  
      handleClose()
    } catch (error) {
      console.error('Error fetching property data:', error);
    }
  
  };
  return (
    <>
      
      <Button
          onClick={handleOpen}
               className={styles.poppins_600}
               variant="contained"
               sx={{
                 borderRadius: "75px",
                 backgroundColor: "gold.main",
                 padding:{sm:"6px 10px",xs:"4px 5px"},
                 color: "#fff",
                 fontSize:{sm:"12px",xs:"10px"},
               }}
             >
               Contact now
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
            color={"space.main"}
            letterSpacing={"1.44px"}
            sx={{fontSize:{sm:'50px',xs:'30px'}}}
          >
            Contact{" "}
            <Typography
              variant="poppins_600"
              color={"gold.main"}
              component="span"
              sx={{fontSize:{sm:'50px',xs:'30px'}}}
            >
              Confirmation !
            </Typography>
          </Typography>
          <Typography
            textAlign={"center"}
            variant="poppins_600"
            component={"p"}
            color={"space.main"}
            letterSpacing={"1.44px"}
            pb={1}
            sx={{fontSize:{sm:'20px',xs:'15px'}}}
          >
            Do you want to contact this property?
          </Typography>
          <Typography
            textAlign={"center"}
            component={"p"}
            fontSize={"14px"}
            color={"#9A9A9A"}
            letterSpacing={"1.44px"}
          >
            After the Confirmation our Team will contact you to share
            information about the given property
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
              onClick={()=>handleEnquiryRequest(property_id)}
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
  );
};

export default PropertyEnquiry;
