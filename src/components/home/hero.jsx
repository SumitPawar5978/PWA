import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Banner from "@/public/assets/images/banner.png";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import {
  poppins_400,
  poppins_500,
  poppins_600,
} from "@/src/components/common/font";
import { styled } from "@mui/system";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  getAllDistrict,
  getAllState,
  userProfileDetail,
} from "@/src/utils/axios";
import { setUserProfile } from "@/src/app/reducer";
import SearchBar from "./searchBar";

const CustomRadioBtn = styled("label")({
  "& .Mui-checked ~ .MuiFormControlLabel-label": {
    backgroundColor: "#cf9b45",
    color: "#1A2B56",
    borderRadius: "75px",
    border: "3px solid #b58a44",
    padding: "10px 0px",
    width: "104px",
    textAlign: "center",
    fontWeight: 600,
  },
  ".MuiFormControlLabel-label": {
    backgroundColor: "#F2F2F2",
    color: "#1A2B56",
    borderRadius: "75px",
    border: "3px solid #DEDEDE",
    padding: "10px 0px",
    width: "104px",
    textAlign: "center",
    fontWeight: "600",
  },
});
const HeroSection = () => {
  const loginUserDetails = useSelector((state) => state.reducer.userDetails);
  const agentUserDetails = useSelector(
    (state) => state.reducer.agentUserDetails
  );
  const navigate = useRouter();
  const dispatch = useDispatch();
  const allCity = useSelector((state) => state.reducer.allCity);
  const [formData, setFormData] = useState({
    district: "",
    type: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [stateValue, setStateValue] = useState(null);
  const [stateInputValue, setStateInputValue] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [districtValue, setDistrictValue] = useState(null);
  const [districtInputValue, setDistrictInputValue] = useState("");
  const isMobile = window.innerWidth <= 600;
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
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      }
    } else {
      setDistricts([]);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFindProperty = () => {
    navigate.push({
      pathname: "/property",
      query: {
        ...formData,
        state_id: stateValue?.state_id,
        district: districtValue,
      },
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (stateValue == null) {
      newErrors.stateValue = "Please select state";
    }
    if (districtValue == null) {
      newErrors.districtValue = "Please select district";
    }
    if (formData.type === "") {
      newErrors.type = "Please select type";
    }
    if (formData.status === "") {
      newErrors.status = "Please select a status";
    }

    if (Object.keys(newErrors).length === 0) {
      handleFindProperty();
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const getUserDetails = async () => {
    let res = await userProfileDetail();
    dispatch(setUserProfile(res?.data));
  };
  useEffect(() => {
    getUserDetails();
  }, []);



  const options = [
    { label: 'Option 1', id: 1 },
    { label: 'Option 2', id: 2 },
    { label: 'Option 3', id: 3 },
  ];
  const [value, setValue] = useState(null);
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      color="#fff"
      sx={{
        position: "relative",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: { sm: "100% 100%", xs: "cover" },
        minHeight: "calc(100vh - 135px)",
        backgroundImage: `url(${Banner.src})`,
        boxShadow: "inset 0 0 0 2000px #0d1f37cc;",
      }}
    >
      <Box py={2}>
        <Stack
          direction="row"
          divider={
            <Divider
              orientation="vertical"
              sx={{ borderColor: "crayola.main" }}
              flexItem
            />
          }
          spacing={2}
          justifyContent={"center"}
        >
          <Typography
            className={`${poppins_500.className} find-prop-link`}
            sx={{
              lineHeight: "1",
              color: "#fff",
              fontSize: { md: "26.73px", sm: "25px", xs: "18px" },
            }}
          >
            FIND PROPERTY
          </Typography>
          {console.log(agentUserDetails?.role, "agentUserDetails")}
          <Link
            // href={loginUserDetails?"/property/postProperty":"/login"}
            href={
              loginUserDetails
                ? agentUserDetails.role === "Agent"
                  ? "https://stage.ekatta.tech/agentportal-dashboard/public/validate_login/" +
                  btoa(
                    `${agentUserDetails?.email} ${agentUserDetails?.password} addProperty`
                  )
                  : "/property/postProperty"
                : "/login"
            }
            style={{
              textDecoration: "none",
              fontSize: "26.73px",
              lineHeight: "1",
              color: "#A1ACC2",
            }}
            className={`${poppins_500.className} post-prop-link`}
          >
            <Typography
              className={`${poppins_500.className} post-prop-link`}
              sx={{
                lineHeight: "1",
                fontSize: { md: "26.73px", sm: "25px", xs: "18px" },
              }}
            >
              POST PROPERTY
            </Typography>
          </Link>
        </Stack>

        <Box textAlign={"center"}>
          <Typography
            sx={{ fontSize: { md: "60px", sm: "50px", xs: "30px" } }}
            lineHeight={"1"}
            pt={3}
            pb={1}
            variant="poppins_600"
            component={"p"}
          >
            Find <span style={{ color: "#CF9B45" }}>The</span> Perfect Property
            For <br /> Your Needs.
          </Typography>
          <Typography
            sx={{ fontSize: { md: "18px", xs: "15px" } }}
            letterSpacing={"2.16px"}
            variant="poppins_400"
            component={"p"}
          >
            The Perfect Property Is Out There, And We're Here To Help You Find It.
          </Typography>
        </Box>
        {/* <form onSubmit={handleFormSubmit}>
          <Box textAlign={"center"}>
            <Grid container sx={{ px: { md: 15, sm: 5 } }}>
              <Grid item xs={12} mt={3} mb={1}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={formData.status} // Set the selected value based on state
                    onChange={handleInputChange}
                    // error={!!errors.status}
                    name="status"
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <CustomRadioBtn>
                      <FormControlLabel
                        sx={{
                          "& .MuiButtonBase-root": { visibility: "hidden" },
                          "& .MuiFormControlLabel-label": {
                            width: {
                              sm: "104px !important",
                              xs: "90px !important",
                            },
                            padding: {
                              sm: "10px !important",
                              xs: "4px !important",
                            },
                            fontSize: {
                              sm: "1rem !important",
                              xs: "12px !important",
                            },
                          },
                        }}
                        value="SALE"
                        control={<Radio sx={{ width: "10px" }} />}
                        label="SALE"
                        className="radio-label"
                      />
                    </CustomRadioBtn>
                    <CustomRadioBtn>
                      <FormControlLabel
                        sx={{
                          "& .MuiButtonBase-root": { visibility: "hidden" },
                          "& .MuiFormControlLabel-label": {
                            width: {
                              sm: "104px !important",
                              xs: "90px !important",
                            },
                            padding: {
                              sm: "10px !important",
                              xs: "4px !important",
                            },
                            fontSize: {
                              sm: "1rem !important",
                              xs: "12px !important",
                            },
                          },
                        }}
                        value="RENT"
                        control={<Radio sx={{ width: "10px" }} />}
                        label="RENT"
                        className="radio-label"
                      />
                    </CustomRadioBtn>
                    <CustomRadioBtn>
                      <FormControlLabel
                        sx={{
                          "& .MuiButtonBase-root": { visibility: "hidden" },
                          "& .MuiFormControlLabel-label": {
                            width: {
                              sm: "104px !important",
                              xs: "90px !important",
                            },
                            padding: {
                              sm: "10px !important",
                              xs: "4px !important",
                            },
                            fontSize: {
                              sm: "1rem !important",
                              xs: "12px !important",
                            },
                          },
                        }}
                        value="LEASE"
                        control={<Radio sx={{ width: "10px" }} />}
                        label="LEASE"
                        className="radio-label"
                      />
                    </CustomRadioBtn>
                  </RadioGroup>

                  {errors.status && (
                    <FormHelperText
                      style={{ color: "#d32f2f", textAlign: "center" }}
                    >
                      {errors.status}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={4} pr={1} pl={2} my={1}>
                <Autocomplete
                  popupIcon={
                    <ExpandMoreIcon
                      sx={{
                        marginRight: "-4px",
                        display: { sm: "block", xs: "none" },
                      }}
                    />
                  }
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
                    "& .MuiInputBase-root": { backgroundColor: "#fff" },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "75px",
                      p: { sm: "8px !important", xs: "0px !important" },
                      "& .MuiAutocomplete-input": {
                        padding: { sm: "inherit", xs: "8px" },
                        fontSize: { sm: "1rem", xs: "12px" },
                      },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: {
                        sm: "1rem !important",
                        xs: "12px !important",
                      },
                      position: "absolute",
                      top: { sm: "0", xs: "-7px" },
                      backgroundColor: "#FFFFFF",
                      borderRadius: "20px",
                      padding: "0px 5px",
                    },

                    borderRadius: "29px",
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
              <Grid item xs={4} pr={1} pl={1} my={1}>
                <Autocomplete
                  popupIcon={
                    <ExpandMoreIcon
                      sx={{
                        marginRight: "-4px",
                        display: { sm: "block", xs: "none" },
                      }}
                    />
                  }
                  value={
                    districts.find((d) => d.district_id === districtValue) ||
                    null
                  }
                  onChange={(event, newValue) => {
                    setDistrictValue(newValue ? newValue.district_id : null);
                  }}
                  inputValue={districtInputValue}
                  onInputChange={(event, newInputValue) => {
                    setDistrictInputValue(newInputValue);
                  }}
                  id="controllable-districts-demo"
                  options={districts}
                  getOptionLabel={(option) => option.district}
                  sx={{
                    "& .MuiInputBase-root": { backgroundColor: "#fff" },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "75px",
                      p: { sm: "8px !important", xs: "0px !important" },
                      "& .MuiAutocomplete-input": {
                        padding: { sm: "inherit", xs: "8px" },
                        fontSize: { sm: "1rem", xs: "12px" },
                      },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: {
                        sm: "1rem !important",
                        xs: "12px !important",
                      },
                      position: "absolute",
                      top: { sm: "0", xs: "-7px" },
                      backgroundColor: "#FFFFFF",
                      borderRadius: "20px",
                      padding: "0px 5px",
                    },

                    borderRadius: "29px",
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select district"
                      error={!!errors.districtValue}
                      helperText={errors.districtValue}
                      inputProps={{ ...params.inputProps }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4} pl={1} pr={2} my={1}>
                <FormControl fullWidth error>
                  <InputLabel
                    htmlFor="demo-simple-select-label"
                    id="demo-simple-select-label"
                    sx={{
                      color: errors.type
                        ? "#d32f2f !important"
                        : "rgba(0, 0, 0, 0.6) !important",
                      px: 1,
                      bgcolor: "#fff",
                      borderRadius: "20px",
                      top: { sm: "0", xs: "-7px" },
                      left: { sm: "0", xs: "-4px" },
                      fontSize: {
                        sm: "1rem !important",
                        xs: "12px !important",
                      },
                    }}
                  >
                    Property Type
                  </InputLabel>
                  <Select
                    IconComponent={isMobile ? "" : ExpandMoreIcon}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    error={!!errors.type}
                    sx={{
                      textAlign: "left",
                      borderRadius: "75px",
                      backgroundColor: "#FFFFFF",
                      "& .MuiOutlinedInput-input": {
                        padding: { sm: "16.5px 14px", xs: "5px" },
                        fontSize: { sm: "1rem", xs: "12px" },
                      },
                    }}
                  >
                    <MenuItem
                      sx={{ fontSize: { sm: "1rem", xs: "12px" } }}
                      value={"Commercial"}
                    >
                      Commercial{" "}
                    </MenuItem>
                    <MenuItem
                      sx={{ fontSize: { sm: "1rem", xs: "12px" } }}
                      value={"Residential"}
                    >
                      Residential
                    </MenuItem>
                    <MenuItem
                      sx={{ fontSize: { sm: "1rem", xs: "12px" } }}
                      value={"Plot"}
                    >
                      Plot
                    </MenuItem>
                    <MenuItem
                      sx={{ fontSize: { sm: "1rem", xs: "12px" } }}
                      value={"Land"}
                    >
                      Land
                    </MenuItem>
                  </Select>
                  {errors.type && (
                    <FormHelperText style={{ color: "#d32f2f" }}>
                      {errors.type}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} mt={2} px={2}>
                <Button
                  className={styles.poppins_600}
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    border: "3px solid #B58A44",
                    borderRadius: "75px",
                    backgroundColor: "gold.main",
                    padding: { sm: "7px", xs: "1px" },
                    color: "space.main",
                    fontSize: { sm: "20px", xs: "14px" },
                    fontWeight: "bold",
                  }}
                  endIcon={
                    <SearchIcon
                      sx={{ fontSize: { sm: "25px !important", xs: "22px" } }}
                    />
                  }
                  onClick={handleFormSubmit}
                >
                  Find
                </Button>
              </Grid>
            </Grid>

          </Box>
        </form> */}
            <SearchBar/>
      </Box>
    </Box>
  );
};

export default HeroSection;
