import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  poppins_400,
  poppins_500,
  poppins_600,
  roboto_400,
} from "@/src/components/common/font";
import { useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  getAllCity,
  getAllTaluka,
  suggestedPropertyList,
} from "@/src/utils/axios";
import Slider2 from "react-slick";
import { useEffect } from "react";
import Ad from "../common/ad";
import { useSearchParams } from "next/navigation";
import { setSelectCity, setSelectState } from "@/src/app/reducer";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
const PropListSidebar = () => {
  const dispatch = useDispatch();
  const [talukaValue, setTalukaValue] = useState(null);
  const [talukaInputValue, setTalukaInputValue] = useState("");
  const [cityValue, setCityValue] = useState(null);
  const [cityInputValue, setCityInputValue] = useState("");

  const [talukas, setTalukas] = useState([]);
  const [cities, setCities] = useState([]);
const [currentDistrict, setCurrentDistrict] = useState()

  const allCity = useSelector((state) => state.reducer.allCity);
  const schedulePropId = useSelector((state) => state.reducer.schedulePropId);
console.log(allCity,'allCity')
  const selectedCityName = useSelector((state) => state.reducer.selectCity);
  const selectState = useSelector((state) => state.reducer.selectState);
  const navigate = useRouter();
  const isMyprofile = navigate.asPath === "/myProfile";
  const isProperty = navigate.asPath === "/property";
  const [formData, setFormData] = useState({
    state_id: "",
    taluka_id: "",
    city_id: "",
    district: "",
    district_name: "",
    type: "",
    status: "",
    bhkType: "",
    minMax: [1000, 4000000],
  });
  const [errors, setErrors] = useState({});
  function valuetext(value) {
    return `${value}°C`;
  }

  const searchParams = useSearchParams();

  const { query } = navigate;

  useEffect(() => {
    const paramsObj = {};
    const range = [];
    for (const p of searchParams) {
      if (p[0] === "minMax") {
        range.push(p[1]);
      }
      paramsObj[p[0]] = p[1];

      if (p[0] === "district") {
        dispatch(setSelectCity(p[1]));
        dispatch(setSelectState(query.state_id));
      }
    }
    if (range.length > 0) {
      paramsObj["minMax"] = range;
    }

    setFormData({ ...formData, ...paramsObj });
  }, [searchParams]);

  const handleFindProperty = () => {
    // const districtValue = value?.district;
    // const districtIdValue = value?.district_id;
    navigate.push({
      pathname: "/property",
      query: {
        ...formData,
        // district: districtIdValue,
        // district_name: districtValue,
        taluka_id:talukaValue?.taluka_id,
        city_id:cityValue?.city_id,
      },
    });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value, "eventtt");
    // const index = allCity.findIndex((item) => item.district_id == value);
    if (name === "minMax0" || name === "minMax1") {
      // Update the corresponding value in the minMax array
      const index = parseInt(name.charAt(name.length - 1), 10);
      const updatedValue =
        value.trim() === "" || isNaN(value) ? "" : parseInt(value, 10);
      const updatedMinMax = [...formData.minMax];
      updatedMinMax[index] = updatedValue;

      setFormData({
        ...formData,
        minMax: updatedMinMax,
      });
    } else {
      setFormData({
        ...formData,
        // district: value,
        [name]: value,
        // district_name: allCity[index]?.district,
        // taluka_id:talukaValue?.taluka_id,
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (formData.district === "") {
      newErrors.district = "Please choose location";
    }

    if (Object.keys(newErrors).length === 0) {
    } else {
      setErrors(newErrors);
    }
  };

  const [suggestedProperty, setSuggestedProperty] = useState([]);
  const getIndividualProperty = async () => {
    try {
      let res = await suggestedPropertyList({
        district: selectedCityName,
        property_id: schedulePropId,
      });
      setSuggestedProperty(res?.data?.data);
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  useEffect(() => {
    getIndividualProperty();
  }, []);

  useEffect(() => {
    if (formData.type !== "Residential") {
      setFormData((prevState) => ({
        ...prevState,
        bhkType: "",
      }));
    }
  }, [formData.type]);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };


  useEffect(() => {
    const handleDistrictChange = async () => {
      try {
        let res = await getAllTaluka(selectedCityName);
        setTalukas(res.data.talukaArr);
      } catch (error) {
        console.error("Failed to fetch states:", error);
      }
    };

    handleDistrictChange();
  }, [selectedCityName]);

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


  // useEffect(() => {
  //   alert()
  //   setTalukaValue(null)
  // }, [selectCityDialogbox])
  
  return (
    <>
      <Box sx={{ position: "sticky", top: "10px" }}>
        {isMyprofile && (
          <Box bgcolor={"#fff"} sx={{ px: { md: 5, xs: 2 } }} py={6} mb={3}>
            <Typography
              variant="poppins_400"
              component={"p"}
              fontSize={"22px"}
              pb={3}
            >
              Post Your Property
            </Typography>
            <Typography
              variant="roboto_400"
              component={"p"}
              fontSize={"14px"}
              pb={3}
              color={"#9A9A9A"}
            >
              We'll help you get the best price for your property.
            </Typography>
            <Link href={"/property/postProperty"}>
              <Button
                fullWidth
                className={styles.poppins_600}
                variant="contained"
                sx={{
                  borderRadius: "75px",
                  backgroundColor: "gold.main",
                  padding: "12px",
                  color: "#fff",
                  fontSize: "14px",
                }}
              >
                Post Property
              </Button>
            </Link>
          </Box>
        )}

        <form onSubmit={handleFormSubmit}>
          <Box bgcolor={"#fff"} sx={{ px: { md: 5, xs: 2 } }} py={6} mb={3}>
            <Stack direction={"row"} justifyContent={"space-between"} mb={3}>
              <Typography
                variant="roboto_400"
                component={"p"}
                fontSize={"22px"}
              >
                Find Your Property
              </Typography>
              <Tooltip title="Reset">
                {" "}
                <Link
                onClick={()=>{setTalukaValue(null), setCityValue(null)}}
                  href={`/property?district=${selectedCityName}&state_id=${selectState}&taluka_id=&city_id=&type=&status=&bhkType=&minMax=1000&minMax=40000000`}
                >
                  <RotateLeftIcon />
                </Link>
              </Tooltip>
            </Stack>
            <Stack gap={2}>
              <FormControl fullWidth error>
               
                <Autocomplete
                 popupIcon={
                  <ExpandMoreIcon/>}
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
                    "& .MuiInputLabel-root": {color:'#000'},
                    backgroundColor: "#FFFFFF",
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select taluka" />
                  )}
                />
                <Autocomplete
                 popupIcon={
                  <ExpandMoreIcon/>}
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
                    mt: 1,
                    "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                    "& .MuiInputLabel-root": {color:'#000'},
                    backgroundColor: "#FFFFFF",
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select city" />
                  )}
                />

                

                {errors.district && (
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.district}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel
                  className={roboto_400.className}
                  sx={{
                    color: "#000 !important",
                    lineHeight: "unset",
                    backgroundColor: "#fff",
                    px: 0.5,
                  }}
                  htmlFor="demo-simple-select-label"
                  id="demo-simple-select-label"
                >
                  Property Type
                </InputLabel>
                <Select
                  IconComponent={ExpandMoreIcon}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  sx={{
                    borderRadius: "75px",
                    backgroundColor: "#FFFFFF",
                    "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                  }}
                >
                  <MenuItem value={"Commercial"}>Commercial</MenuItem>
                  <MenuItem value={"Residential"}>Residential</MenuItem>
                  <MenuItem value={"Plot"}>Plot</MenuItem>
                  <MenuItem value={"Land"}>Land</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel
                  className={roboto_400.className}
                  sx={{
                    color: "#000 !important",
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
                  name="bhkType"
                  value={formData.bhkType}
                  onChange={handleInputChange}
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
              </FormControl>

              <Box>
                <Typography
                  variant="poppins_400"
                  component={"p"}
                  letterSpacing={"1.44px"}
                >
                  Price Range ₹{" "}
                </Typography>
                <Slider
                  sx={{ color: "#6885A3" }}
                  getAriaLabel={() => "Temperature range"}
                  value={formData.minMax}
                  min={1000}
                  max={50000000}
                  name="minMax"
                  onChange={(_, newValue) => {
                    setFormData({
                      ...formData,
                      minMax: newValue,
                    });
                  }}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                />
              </Box>

              <Stack direction={"row"} gap={3}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Min Price"
                  variant="outlined"
                  name="minMax0"
                  value={formData.minMax[0]}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                    "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                    "& .MuiInputLabel-root": { lineHeight: "unset" },
                    backgroundColor: "#FFFFFF",
                  }}
                />
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Max Price"
                  variant="outlined"
                  name="minMax1"
                  value={formData.minMax[1]}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                    "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                    "& .MuiInputLabel-root": { lineHeight: "unset" },
                    backgroundColor: "#FFFFFF",
                  }}
                />
              </Stack>
              <Button
                type="submit"
                fullWidth
                className={styles.poppins_600}
                variant="contained"
                sx={{
                  borderRadius: "75px",
                  backgroundColor: "gold.main",
                  padding: "12px",
                  color: "#fff",
                  fontSize: "14px",
                }}
                onClick={handleFindProperty}
              >
                Search
              </Button>
            </Stack>
          </Box>
        </form>

        {!isProperty && (
          <Box bgcolor={"#fff"} sx={{ px: { md: 5, xs: 2 } }} pt={6} pb={5}>
            <Typography
              variant="poppins_400"
              component={"p"}
              fontSize={"22px"}
              pb={1}
            >
              Suggested for you
            </Typography>
            <Grid container justifyContent={"center"}>
              {suggestedProperty?.map((item, index) => (
                <Grid key={index} item md={12} sm={6} xs={12} px={1}>
                  <Grid
                    container
                    bgcolor={"#F3F4F9"}
                    alignItems={"center"}
                    my={2}
                  >
                    <Grid item md={4} xs={4}>
                      <Slider2 {...settings}>
                        {item.property_images_arr
                          .filter(
                            (imageItem) =>
                              imageItem && imageItem[Object.keys(imageItem)[0]]
                          )
                          .map((item, index) => (
                            <Image
                              key={index}
                              height={100}
                              width={104}
                              src={Object.values(item)[0]}
                              alt="prop image"
                            />
                          ))}
                      </Slider2>
                    </Grid>

                    <Grid item md={8} xs={8}>
                      <Box pl={3}>
                        <Link
                          href={
                            "/property/" +
                            item.title.replace(/\s+/g, "-") +
                            "-" +
                            item.property_id
                          }
                          style={{
                            fontSize: "15px",
                            color: "#000",
                            textDecoration: "none",
                            fontFamily: "sans-serif",
                          }}
                        >
                          {item.title}
                        </Link>
                        <Typography
                          variant="roboto_400"
                          component={"p"}
                          fontSize={"14px"}
                          color={"#4B9EF1"}
                        >
                          ₹{item.max_price}/-
                        </Typography>
                        {/* <Link  href={'/property/'+item.title+'/'+item.property_id}> Click</Link> */}
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            {suggestedProperty?.length === 0 && (
              <Typography
                sx={{ fontSize: "40px", color: "#d9d9d9", textAlign: "center" }}
                className={poppins_600.className}
              >
                No Data Found
              </Typography>
            )}
          </Box>
        )}
        <Box bgcolor={"#6885a314"} my={3} px={0}>
          <Ad pageName="Property" section="Section 1" />
        </Box>

        {isProperty && (
          <Box bgcolor={"rackley.main"} my={3} p={1}>
            <Stack gap={2} border={"1px solid #FFFFFF59"} px={3} py={4}>
              <Typography
                variant="poppins_400"
                component={"p"}
                fontSize={"22px"}
                color={"#fff"}
              >
                Get a Consultation
              </Typography>
              <Divider
                sx={{
                  width: "48px",
                  borderBottomWidth: "medium",
                  borderColor: "#CF9B45",
                }}
              />
              <Typography color={"#FFFFFF99"}>
                If you have any questions, just call or email us, and we will
                answer you shortly.
              </Typography>
              <Link
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                <Box
                  sx={{
                    mr: 1,
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "gold.main",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CallIcon
                    sx={{
                      fontSize: "20px",
                      verticalAlign: "middle",
                      color: "white",
                    }}
                  />
                </Box>

                <Typography className={styles.poppins_600}>
                  {" "}
                  +123 098 890 76 56
                </Typography>
              </Link>
              <Link
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <Box
                    sx={{
                      mr: 1,
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "gold.main",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MailOutlineIcon
                      sx={{
                        fontSize: "20px",
                        verticalAlign: "middle",
                        color: "white",
                      }}
                    />
                  </Box>

                  <Typography color={"#fff"} className={styles.poppins_600}>
                    mail@demolink.org
                  </Typography>
                </Box>
              </Link>
              <Link href={"contact-us"}>
                <Button
                  fullWidth
                  className={styles.poppins_600}
                  variant="contained"
                  sx={{
                    borderRadius: "75px",
                    backgroundColor: "transparent",
                    border: "2px solid #fff",
                    padding: "12px",
                    color: "#fff",
                    fontSize: "14px",
                  }}
                >
                  Contact us
                </Button>
              </Link>
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
};

export default PropListSidebar;
