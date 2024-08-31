import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
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
import {
  poppins_400,
  poppins_500,
  poppins_600,
  roboto_400,
} from "@/src/components/common/font";
import { useState } from "react";
import PropertyPhoto from "./propertyPhoto";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "@/styles/Home.module.css";
import {
  addUserPropertyPost,
  getAllCity,
  getAllDistrict,
  getAllState,
  getAllTaluka,
  getAmenitiesList,
} from "@/src/utils/axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PostProperty = () => {
  const router = useRouter();
  const agentUserDetails = useSelector(
    (state) => state.reducer.agentUserDetails
  );
  const isImgSelected = useSelector((state) => state.reducer.isImgSelected);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]);

  const [amenities, setAmenities] = useState();
  const [formData, setFormData] = useState({
    title: "",
    sqFtarea: "",
    type: "",
    status: "",
    bhkType: "",
    bathroomCount: "",
    state: "",
    district: "",
    taluka_id: "",
    city: "",
    area: "",
    zip_code: "",
    house_no: "",
    landmark: "",
    live_location: "",
    description: "",
    contact_name: `${agentUserDetails?.firstName} ${agentUserDetails?.lastName}`,
    mobile_no: agentUserDetails?.mobile_no,
    range: "",
    amenities: [],
    property_1: "",
    property_2: "",
    property_3: "",
    property_4: "",
    property_5: "",
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (formData.type !== "Residential" && formData.type !== "Commercial") {
      setFormData((prevState) => ({
        ...prevState,
        bhkType: "",
        bathroomCount: "",
      }));
    } else if (formData.type !== "Residential") {
      setFormData((prevState) => ({
        ...prevState,
        bhkType: "",
      }));
    }
  }, [formData.type]);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    const newErrors = {};

    let errorMessage = [];
    const propertyNames = [
      "property_1",
      "property_2",
      "property_3",
      "property_4",
      "property_5",
    ];
    for (const propertyName of propertyNames) {
      if (!isImgSelected) {
        errorMessage.push("Please select at least one image...");
      }
    }
    if (errorMessage !== "") {
      if (errorMessage.length < 5) {
      } else {
        newErrors.imageFields = errorMessage.join(" ");
      }
    }

    if (formData.title === "") {
      newErrors.title = "This field is required";
    }
    if (formData.sqFtarea === "") {
      newErrors.sqFtarea = "This field is required";
    }
    if (formData.type === "") {
      newErrors.type = "This field is required";
    }
    if (formData.status === "") {
      newErrors.status = "This field is required";
    }
    if (formData.type === "Residential") {
      if (formData.bhkType === "") {
        newErrors.bhkType = "This field is required";
      }
    }
    if (formData.type === "Residential" || formData.type === "Commercial") {
      if (formData.bathroomCount === "") {
        newErrors.bathroomCount = "This field is required";
      }
    }
    if (formData.state === "") {
      newErrors.state = "This field is required";
    }
    if (formData.district === "") {
      newErrors.district = "This field is required";
    }
    if (formData.taluka_id === "") {
      newErrors.taluka_id = "This field is required";
    }
    if (formData.city === "") {
      newErrors.city = "This field is required";
    }
    if (formData.area === "") {
      newErrors.area = "This field is required";
    }
    if (formData.zip_code === "") {
      newErrors.zip_code = "This field is required";
    } else if (formData.zip_code.length !== 6) {
      newErrors.zip_code = "Zip Code must be 6 digits";
    }
    if (formData.house_no === "") {
      newErrors.house_no = "This field is required";
    }
    if (formData.landmark === "") {
      newErrors.landmark = "This field is required";
    }
    if (formData.live_location === "") {
      newErrors.live_location = "This field is required";
    }
    if (formData.contact_name === "") {
      newErrors.contact_name = "This field is required";
    }
    if (formData.mobile_no === "") {
      newErrors.mobile_no = "This field is required";
    } else if (formData.mobile_no.length !== 10) {
      newErrors.mobile_no = "Phone number must be 10 digits";
    }
    if (formData.range === "") {
      newErrors.range = "This field is required";
    }
    if (formData.description === "") {
      newErrors.description = "This field is required";
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
      let formData1 = new FormData();

      Object.keys(formData).forEach((key) => {
        formData1.append(key, formData[key]);
      });
      // addUserPropertyPost(formData1)
      setIsLoading(true);

      try {
        const res = await addUserPropertyPost(formData1);
        setErrors("");
        Toast.fire({
          icon: "success",
          title: res?.data?.message,
        });
        router.push("/property");
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const text = errors.imageFields;

  const trimText = (text) => {
    if (typeof text !== "string") {
      return "";
    }

    // Use a regular expression to find the first occurrence of the pattern
    const pattern = /Please select at least one image\.\.\./;
    const match = text.match(pattern);

    // If a match is found, return the matched pattern
    if (match) {
      return match[0];
    }

    // If no match is found, return the original text
    return text;
  };

  const trimmedText = trimText(text);

  const handleImageChange = (index, image) => {
    let tempFormData = { ...formData };
    tempFormData["property_" + (index + 1)] = image;
    setFormData(tempFormData);
  };

  const getAmenities = async () => {
    const res = await getAmenitiesList();
    setAmenities(res?.data?.amentiesArr);
  };

  useEffect(() => {
    getAmenities();
  }, []);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleCheckboxChange = (value) => {
    if (selectedCheckboxes.includes(value)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((item) => item !== value)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      amenities: selectedCheckboxes,
      state: stateValue?.state_id,
      district: districtValue?.district_id,
      taluka_id: talukaValue?.taluka_id,
      city: cityValue?.city_id,
    });
  }, [selectedCheckboxes, formData.range]);

  console.log(stateValue?.state_id, "states");
  console.log(districtValue?.district_id, "states");
  console.log(talukaValue?.taluka_id, "states");
  console.log(cityValue?.city_id, "states");
  return (
    <>
      <Typography
        textAlign={"center"}
        variant="poppins_600"
        component={"p"}
        color={"space.main"}
        letterSpacing={"1.44px"}
        sx={{ fontSize: { md: "50px", sm: "50px", xs: "30px" } }}
      >
        Post{" "}
        <Typography
          variant="poppins_600"
          color={"gold.main"}
          component="span"
          sx={{ fontSize: { md: "50px", sm: "50px", xs: "30px" } }}
        >
          Your
        </Typography>{" "}
        Property
      </Typography>
      <Typography
        textAlign={"center"}
        variant="poppins_600"
        component={"p"}
        sx={{ fontSize: { sm: "20px", xs: "15px" } }}
        color={"space.main"}
        letterSpacing={"1.44px"}
      >
        We'll Help You Get The Best Price For Your Property.
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Box>
          <Typography
            variant="poppins_600"
            component={"p"}
            pb={2}
            pt={4}
            fontSize={"20px"}
            color={"space.main"}
            letterSpacing={"1.44px"}
          >
            Add Your Property Details
          </Typography>
          <Grid container>
            <Grid item sm={6} xs={12} sx={{ pr: { sm: 1, xs: 0 } }} my={1}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Enter Property Title"
                variant="outlined"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                error={!!errors.title}
                helperText={errors.title}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                  "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                  "& .MuiInputLabel-root": { lineHeight: "unset" },
                  backgroundColor: "#FFFFFF",
                }}
              />
            </Grid>
            <Grid item sm={6} xs={12} sx={{ pl: { sm: 1, xs: 0 } }} my={1}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Enter Property Area In Sq.Ft"
                variant="outlined"
                name="sqFtarea"
                value={formData.sqFtarea}
                onChange={handleInputChange}
                error={!!errors.sqFtarea}
                helperText={errors.sqFtarea}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                  "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                  "& .MuiInputLabel-root": { lineHeight: "unset" },
                  backgroundColor: "#FFFFFF",
                }}
              />
            </Grid>
            <Grid item sm={6} xs={12} sx={{ pr: { sm: 1, xs: 0 } }} my={1}>
              <FormControl fullWidth error>
                <InputLabel
                  sx={{
                    color: errors.type
                      ? "#d32f2f !important"
                      : "#727272 !important",
                    lineHeight: "unset",
                    backgroundColor: "#fff",
                    px: 0.5,
                  }}
                  htmlFor="demo-simple-select-label"
                  id="demo-simple-select-label"
                >
                  Select Property Type
                </InputLabel>
                <Select
                  IconComponent={ExpandMoreIcon}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  error={!!errors.type}
                  sx={{
                    borderRadius: "75px",
                    backgroundColor: "#FFFFFF",
                    "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                  }}
                >
                  <MenuItem value={"Commercial"}>Commercial </MenuItem>
                  <MenuItem value={"Residential"}>Residential</MenuItem>
                  <MenuItem value={"Plot"}>Plot</MenuItem>
                  <MenuItem value={"Land"}>Land</MenuItem>
                </Select>
                {errors.type && (
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.type}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12} sx={{ pl: { sm: 1, xs: 0 } }} my={1}>
              <FormControl fullWidth error>
                <InputLabel
                  sx={{
                    color: errors.status
                      ? "#d32f2f !important"
                      : "#727272 !important",
                    lineHeight: "unset",
                    backgroundColor: "#fff",
                    px: 0.5,
                  }}
                  htmlFor="demo-simple-select-label"
                  id="demo-simple-select-label"
                >
                  Select Property Status
                </InputLabel>
                <Select
                  IconComponent={ExpandMoreIcon}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  error={!!errors.status}
                  sx={{
                    borderRadius: "75px",
                    backgroundColor: "#FFFFFF",
                    "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                  }}
                >
                  <MenuItem value={"Rent"}>Rent</MenuItem>
                  <MenuItem value={"Sale"}>Sale</MenuItem>
                  <MenuItem value={"Lease"}>Lease</MenuItem>
                </Select>
                {errors.status && (
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.status}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12} sx={{ pr: { sm: 1, xs: 0 } }} my={1}>
              <FormControl fullWidth error>
                <InputLabel
                  sx={{
                    color: errors.bhkType
                      ? "#d32f2f !important"
                      : "#727272 !important",
                    lineHeight: "unset",
                    backgroundColor: "#fff",
                    px: 0.5,
                  }}
                  htmlFor="demo-simple-select-label"
                  id="demo-simple-select-label"
                >
                  Select BHK Type
                </InputLabel>
                <Select
                  disabled={formData.type !== "Residential" ? true : false}
                  IconComponent={ExpandMoreIcon}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="bhkType"
                  name="bhkType"
                  value={formData.bhkType}
                  onChange={handleInputChange}
                  error={!!errors.bhkType}
                  sx={{
                    borderRadius: "75px",
                    backgroundColor: "#FFFFFF",
                    "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                  }}
                >
                  <MenuItem value={"1 RK"}>1 RK</MenuItem>
                  <MenuItem value={"1 BHK"}>1 BHK</MenuItem>
                  <MenuItem value={"2 BHK"}>2 BHK</MenuItem>
                  <MenuItem value={"3 BHK"}>3 BHK</MenuItem>
                  <MenuItem value={"4 BHK"}>4 BHK</MenuItem>
                </Select>
                {errors.bhkType && (
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.bhkType}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12} sx={{ pl: { sm: 1, xs: 0 } }} my={1}>
              <FormControl fullWidth error>
                <InputLabel
                  sx={{
                    color: errors.bathroomCount
                      ? "#d32f2f !important"
                      : "#727272 !important",
                    lineHeight: "unset",
                    backgroundColor: "#fff",
                    px: 0.5,
                  }}
                  htmlFor="demo-simple-select-label"
                  id="demo-simple-select-label"
                >
                  Select Bathrooms Count
                </InputLabel>
                <Select
                  disabled={
                    formData.type !== "Residential" &&
                    formData.type !== "Commercial"
                      ? true
                      : false
                  }
                  IconComponent={ExpandMoreIcon}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="bathroomcount"
                  name="bathroomCount"
                  value={formData.bathroomCount}
                  onChange={handleInputChange}
                  error={!!errors.bathroomCount}
                  sx={{
                    borderRadius: "75px",
                    backgroundColor: "#FFFFFF",
                    "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                  }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
                {errors.bathroomCount && (
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.bathroomCount}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Typography
            variant="poppins_600"
            component={"p"}
            pb={1}
            pt={4}
            fontSize={"20px"}
            color={"space.main"}
            letterSpacing={"1.44px"}
          >
            Select Amenities
          </Typography>
          <Stack direction={"row"} flexWrap={"wrap"}>
            {amenities?.map((item1, index) => {
              return (
                <Box key={index} my={1}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedCheckboxes.includes(
                            item1.amenities_id
                          )}
                          onChange={() =>
                            handleCheckboxChange(item1.amenities_id)
                          }
                        />
                      }
                      label={item1.amenities_name}
                    />
                  </FormGroup>
                </Box>
              );
            })}
          </Stack>

          <Typography
            variant="poppins_600"
            component={"p"}
            pb={1}
            pt={4}
            fontSize={"20px"}
            color={"space.main"}
            letterSpacing={"1.44px"}
          >
            Property Photos
          </Typography>
          <Stack
            direction={"row"}
            gap={2}
            alignItems={"center"}
            flexWrap={"wrap"}
            sx={{ justifyContent: { md: "unset", sm: "center", xs: "center" } }}
          >
            {selectedImages.map((selectedImage, index) => (
              <PropertyPhoto
                key={index}
                index={index}
                selectedImage={formData["property_" + (index + 1)]}
                setSelectedImage={(image) => handleImageChange(index, image)}
              />
            ))}
          </Stack>
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Typography color={"#ff0000"} fontSize={"14px"}>
              {trimmedText}
            </Typography>
          </Stack>

          <Typography
            variant="poppins_600"
            component={"p"}
            pb={2}
            pt={4}
            fontSize={"20px"}
            color={"space.main"}
            letterSpacing={"1.44px"}
          >
            Property Address Details
          </Typography>
          <Grid container>
            <Grid item sm={6} xs={12} sx={{ pr: { sm: 1, xs: 0 } }} my={1}>
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
            <Grid item sm={6} xs={12} sx={{ pl: { sm: 1, xs: 0 } }} my={1}>
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
            <Grid item sm={6} xs={12} sx={{ pr: { sm: 1, xs: 0 } }} my={1}>
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
            <Grid item sm={6} xs={12} sx={{ pl: { sm: 1, xs: 0 } }} my={1}>
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
            <Grid item sm={6} xs={12} sx={{ pr: { sm: 1, xs: 0 } }} my={1}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Enter Area"
                variant="outlined"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                error={!!errors.area}
                helperText={errors.area}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                  "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                  "& .MuiInputLabel-root": { lineHeight: "unset" },
                  backgroundColor: "#FFFFFF",
                }}
              />
            </Grid>
            <Grid item sm={6} xs={12} sx={{ pl: { sm: 1, xs: 0 } }} my={1}>
              <TextField
                fullWidth
                type="number"
                id="outlined-basic"
                label="Enter Zip code"
                variant="outlined"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleInputChange}
                error={!!errors.zip_code}
                helperText={errors.zip_code}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                  "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                  "& .MuiInputLabel-root": { lineHeight: "unset" },
                  backgroundColor: "#FFFFFF",
                }}
              />
            </Grid>
            <Grid item sm={6} xs={12} sx={{ pr: { sm: 1, xs: 0 } }} my={1}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Enter plot no / house no"
                variant="outlined"
                name="house_no"
                value={formData.house_no}
                onChange={handleInputChange}
                error={!!errors.house_no}
                helperText={errors.house_no}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                  "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                  "& .MuiInputLabel-root": { lineHeight: "unset" },
                  backgroundColor: "#FFFFFF",
                }}
              />
            </Grid>
            <Grid item sm={6} xs={12} sx={{ pl: { sm: 1, xs: 0 } }} my={1}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Enter Landmark"
                variant="outlined"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                error={!!errors.landmark}
                helperText={errors.landmark}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                  "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                  "& .MuiInputLabel-root": { lineHeight: "unset" },
                  backgroundColor: "#FFFFFF",
                }}
              />
            </Grid>
          </Grid>
          <Box>
            <Typography
              variant="poppins_600"
              component={"p"}
              pb={2}
              pt={4}
              fontSize={"20px"}
              color={"space.main"}
              letterSpacing={"1.44px"}
            >
              Property Live Location
            </Typography>
            <TextField
              type="url"
              fullWidth
              id="outlined-basic"
              label="Enter Property Live location link"
              variant="outlined"
              name="live_location"
              value={formData.live_location}
              onChange={handleInputChange}
              error={!!errors.live_location}
              helperText={errors.live_location}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                "& .MuiInputLabel-root": { lineHeight: "unset" },
                backgroundColor: "#FFFFFF",
              }}
            />
          </Box>

          <Box>
            <Typography
              variant="poppins_600"
              component={"p"}
              pb={2}
              pt={4}
              fontSize={"20px"}
              color={"space.main"}
              letterSpacing={"1.44px"}
            >
              Property Description
            </Typography>
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              maxRows={4}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              error={!!errors.description}
              helperText={errors.description}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "25px" },
                "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                "& .MuiInputLabel-root": { lineHeight: "unset" },
                backgroundColor: "#FFFFFF",
              }}
            />
          </Box>

          <Typography
            variant="poppins_600"
            component={"p"}
            pb={2}
            pt={4}
            fontSize={"20px"}
            color={"space.main"}
            letterSpacing={"1.44px"}
          >
            Contact Details
          </Typography>
          <Grid container>
            <Grid item sm={6} xs={12} sx={{ pr: { sm: 1, xs: 0 } }} my={1}>
              <TextField
                disabled
                fullWidth
                id="outlined-basic"
                label="Enter Full Name"
                variant="outlined"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleInputChange}
                error={!!errors.contact_name}
                helperText={errors.contact_name}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                  "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                  "& .MuiInputLabel-root": { lineHeight: "unset" },
                  backgroundColor: "#FFFFFF",
                }}
              />
            </Grid>
            <Grid item sm={6} xs={12} sx={{ pl: { sm: 1, xs: 0 } }} my={1}>
              <TextField
                disabled
                type="text"
                fullWidth
                inputProps={{
                  inputMode: "numeric",
                }}
                id="outlined-basic"
                label="Enter mobile number"
                variant="outlined"
                name="mobile_no"
                value={formData.mobile_no}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    handleInputChange(e);
                  }
                }}
                error={!!errors.mobile_no}
                helperText={errors.mobile_no}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                  "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                  "& .MuiInputLabel-root": { lineHeight: "unset" },
                  backgroundColor: "#FFFFFF",
                }}
              />
            </Grid>
          </Grid>
          <Box>
            <Typography
              variant="poppins_600"
              component={"p"}
              pb={2}
              pt={4}
              fontSize={"20px"}
              color={"space.main"}
              letterSpacing={"1.44px"}
            >
              Price Range ₹{" "}
            </Typography>

            <Grid container>
              <Grid
                item
                md={6}
                sm={12}
                xs={12}
                sx={{ pr: { sm: 1, xs: 0 } }}
                my={1}
              >
                <TextField
                  fullWidth
                  type="text"
                  id="outlined-basic"
                  label="Enter range"
                  variant="outlined"
                  name="range"
                  value={formData.range}
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      handleInputChange(e);
                    }
                  }}
                  error={!!errors.range}
                  helperText={errors.range}
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                    "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                    "& .MuiInputLabel-root": { lineHeight: "unset" },
                    backgroundColor: "#FFFFFF",
                  }}
                />
              </Grid>
              <Grid item md={6} pl={1} my={1}></Grid>
              <Grid
                item
                md={6}
                xs={12}
                sx={{ pr: { sm: 1, xs: 0 }, position: "relative" }}
                my={1}
              >
                <Button
                  disabled={isLoading ? true : false}
                  className={styles.poppins_600}
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    border: "3px solid #B58A44",
                    borderRadius: "75px",
                    backgroundColor: "gold.main",
                    padding: "6px",
                    mt: 5,
                    color: "space.main",
                    fontSize: "18px",
                  }}
                >
                  Submit
                </Button>

                {isLoading && (
                  <CircularProgress
                    style={{
                      marginTop: "20px",
                      position: "absolute",
                      bottom: "5px",
                      left: "10px",
                    }}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default PostProperty;
