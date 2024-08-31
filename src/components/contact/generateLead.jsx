import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Autocomplete,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { agentLeadPost, getAllCity, getAllDistrict, getAllState, getAllTaluka } from "@/src/utils/axios";
const GenerateLead = ({ handleCloseFun }) => {
  const allCity = useSelector((state) => state.reducer.allCity);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobile_no: "",
    email_id: "",
    city: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
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
    console.log(talukas, "taluka");
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

  const resetForm = () => {
    setFormData({
      firstname: "",
      lastname: "",
      mobile_no: "",
      email_id: "",
      city: "",
      address: "",
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    handleCloseFun();
    setOpen(false);
  };
  const Swal = require("sweetalert2");
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleFormSubmit = async (e) => {
    const newErrors = {};
    if (formData.firstname === "") {
      newErrors.firstname = "This field is required";
    }
    if (formData.lastname === "") {
      newErrors.lastname = "This field is required";
    }
    if (formData.mobile_no === "") {
      newErrors.mobile_no = "This field is required";
    } else if (formData.mobile_no.length !== 10) {
      newErrors.mobile_no = "Phone number must be 10 digits";
    }

    if (!formData.email_id) {
      newErrors.email_id = "This field is required";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email_id)
    ) {
      newErrors.email_id = "Please enter a valid email address";
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

    console.log(stateValue?.state_id,'states')
  console.log(districtValue?.district_id,'states')
  console.log(talukaValue?.taluka_id,'states')
  console.log(cityValue?.city_id,'states')
    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await agentLeadPost({...formData,state_id:stateValue?.state_id, district_id:districtValue?.district_id, taluka_id:talukaValue?.taluka_id, city:cityValue?.city_id});
        if (res.data.status === "success") {
          Toast.fire({
            icon: "success",
            title: res?.data?.message,
          });
          resetForm();
          handleClose();
        } else {
          Toast.fire({
            icon: "error",
            title: res?.data?.message,
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <Typography onClick={handleClickOpen} sx={{ color: "#000" }}>
        {" "}
        Generate Lead
      </Typography>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Generate Lead</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Enter First Name"
                variant="outlined"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                error={!!errors.firstname}
                helperText={errors.firstname}
                sx={{
                  my: 1,
                  pr: { md: 1 },
                  "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                  "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                  "& .MuiInputLabel-root": { lineHeight: "unset" },
                  backgroundColor: "#FFFFFF",
                }}
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Enter Last Name"
                variant="outlined"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                error={!!errors.lastname}
                helperText={errors.lastname}
                sx={{
                  my: 1,
                  pl: { md: 1 },
                  "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                  "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                  "& .MuiInputLabel-root": {
                    lineHeight: "unset",
                    padding: "0px 10px !important",
                  },
                  backgroundColor: "#FFFFFF",
                }}
                onKeyDown={(e) => {
                  e.stopPropagation();
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
                onKeyDown={(e) => {
                  e.stopPropagation();
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
                name="email_id"
                value={formData.email_id}
                onChange={handleInputChange}
                error={!!errors.email_id}
                helperText={errors.email_id}
                sx={{
                  my: 1,
                  "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                  "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                  "& .MuiInputLabel-root": { lineHeight: "unset" },
                  backgroundColor: "#FFFFFF",
                }}
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
              />
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
                  <TextField
                    {...params}
                    label="Select taluka"
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
                  <TextField
                    {...params}
                    label="Select city"
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
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <Button
                fullWidth
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
                Submit
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GenerateLead;
