import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Aurangabad from "@/public/assets/images/icon/aurangabad.png";
import Nagpur from "@/public/assets/images/icon/nagpur.png";
import Pune from "@/public/assets/images/icon/pune.png";
import Mumbai from "@/public/assets/images/icon/mumbai.png";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import styles from "@/styles/Home.module.css";
import { getAllDistrict, getAllState } from "@/src/utils/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllCity,
  setCityDialogbox,
  setDistrictId,
  setSelectCity,
  setSelectCityName,
  setStateId,
} from "@/src/app/reducer";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Image from "next/image";

const CustomRadioBtn = styled("label")({
  "& .Mui-checked ~ .MuiFormControlLabel-label": {
    backgroundColor: "#E7E7E7",
    color: "#1A2B56",
    borderRadius: "75px",
    border: "2px solid #b58a44",
    padding: "10px 0px",
    width: "104px",
    textAlign: "center",
    fontWeight: 600,
  },
  ".MuiFormControlLabel-label": {
    backgroundColor: "#F2F2F2",
    color: "#1A2B56",
    borderRadius: "75px",
    border: "2px solid #DEDEDE",
    padding: "10px 0px",
    width: "104px",
    textAlign: "center",
    fontWeight: "600",
  },
});
function SelectCity() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [value, setValue] = React.useState();
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const selectedCityName = useSelector((state) => state.reducer.selectCity);
  const selectCityDialogbox = useSelector(
    (state) => state.reducer.selectCityDialogbox
  );

  const topCityArr = [
    {
      district_id: 374,
      city: "Aurangabad",
      icon: Aurangabad,
    },
    {
      district_id: 387,
      city: "Mumbai City",
      icon: Mumbai,
    },
    {
      district_id: 396,
      city: "Pune",
      icon: Pune,
    },
    {
      district_id: 389,
      city: "Nagpur",
      icon: Nagpur,
    },
  ];
  const searchParams = useSearchParams();
  const [stateValue, setStateValue] = useState(null);
  const [stateInputValue, setStateInputValue] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [districtValue, setDistrictValue] = useState(null);
  const [districtInputValue, setDistrictInputValue] = useState("");
  console.log(stateValue?.state_id
    , "stateValue22");

  useEffect(() => {
  dispatch(setStateId(stateValue?.state_id))
  dispatch(setDistrictId(districtValue))
  }, [districtValue,stateValue?.state_id])
  
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

  useEffect(() => {
    if (
      !stateValue == "" &&
      (!districtValue == "" || !selectedDistrict?.city == "")
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [stateValue, districtValue, selectedDistrict?.city]);

  useEffect(() => {
    setOpen(selectCityDialogbox);
  }, [selectCityDialogbox]);

  useEffect(() => {
    if (!selectedCityName) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [selectedDistrict, value]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    // setIsSubmitDisabled(false);
    setValue();
  };

  const handleSubmit = () => {
    router.push({
      pathname: "/property",
      query: {
        ...searchParams,
        district: districtValue || selectedDistrict?.district_id,
        district_name: districtInputValue || selectedDistrict?.city,
        state_id: stateValue?.state_id,
      },
    });
    dispatch(setCityDialogbox(false));
    dispatch(setSelectCityName(districtInputValue || selectedDistrict?.city));
    setOpen(false);
  };

  const handleRadioChange = (event) => {
    const selectedCity = topCityArr.find(
      (city) => city.city === event.target.value
    );
    setSelectedDistrict(selectedCity);
    setDistrictInputValue("");
    setDistrictValue(null);
  };
  return (
    <div>
      <Dialog open={open} fullWidth maxWidth="md">
        {selectedCityName && (
          <CloseIcon
            sx={{
              cursor: "pointer",
              fontSize: "30px",
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
            onClick={() => {
              setOpen(false);
              dispatch(setCityDialogbox(false));
            }}
          />
        )}

        <DialogContent>
          <DialogContentText textAlign={"center"}>
            <Typography
              component={"span"}
              textAlign={"center"}
              variant="poppins_600"
              color={"space.main"}
              letterSpacing={"1.44px"}
              lineHeight={1.3}
              sx={{ fontSize: { sm: "50px", xs: "30px" } }}
            >
              Please{" "}
              <Typography
                variant="poppins_600"
                sx={{ fontSize: { sm: "50px", xs: "30px" } }}
                color={"gold.main"}
                component="span"
              >
                Select{" "}
              </Typography>
              Your City
            </Typography>{" "}
            <br />
            <Typography
              textAlign={"center"}
              variant="poppins_600"
              component={"span"}
              sx={{ fontSize: { sm: "20px", xs: "15px" } }}
              color={"space.main"}
              letterSpacing={"1.44px"}
            >
              The Perfect Place To Raise A Family Or Start A New Business.
            </Typography>
          </DialogContentText>

          <FormControl
            sx={{ px: { md: 10, sm: 1 }, pt: { md: 4, xs: 0 }, width: "100%" }}
          >
            <Box>
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
                  my: 1.5,
                  "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                  backgroundColor: "#FFFFFF",
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select state" />
                )}
              />

              <Autocomplete
                value={
                  districts.find((d) => d.district_id === districtValue) || null
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
                  my: 1.5,
                  "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                  backgroundColor: "#FFFFFF",
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select district" />
                )}
              />

              {/* <Autocomplete
                value={value}
                onChange={handleChange}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                  console.log(newInputValue,'newInputValue')
                }}
                id="controllable-states-demo"
                options={options}
                getOptionLabel={(option) => option.district}
                renderOption={(props, option) => (
                  <li {...props} key={option.district_id}>
                    {option.district}
                  </li>
                )}
                sx={{
                  my: 1.5,
                  "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                  backgroundColor: "#FFFFFF",
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Search City" />
                )}
              /> */}
            </Box>
            <RadioGroup
              value={selectedCity}
              onChange={handleCityChange}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="city"
              name="radio-buttons-group"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              {" "}
              {topCityArr.map((city, index) => (
                <Box
                  key={index}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <Image
                    src={city.icon}
                    height={75}
                    width={110}
                    alt={city.city}
                  />
                  <CustomRadioBtn>
                    <FormControlLabel
                      sx={{
                        fontFamily: "poppins,sans-serif",
                        "& .MuiButtonBase-root": { visibility: "hidden" },
                        "& .MuiFormControlLabel-label": {
                          textTransform: "uppercase",
                          fontSize: { md: "12px", xs: "10px" },
                          width: {
                            sm: "100% !important",
                            xs: "auto !important",
                          },
                          padding: {
                            sm: "7px 12px !important",
                            xs: "4px 10px !important",
                          },
                        },
                        marginRight: "0px",
                      }}
                      value={city.city}
                      control={<Radio sx={{ width: "0px" }} />}
                      label={city.city}
                      className="radio-label"
                      onChange={handleRadioChange}
                    />
                  </CustomRadioBtn>
                </Box>
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", paddingBottom: "35px" }}>
          <Button
            className={styles.poppins_600}
            variant="contained"
            sx={{
              width: "450px",
              border: "3px solid #B58A44",
              borderRadius: "75px",
              backgroundColor: "gold.main",
              padding: "6px",
              color: "#000",
              fontSize: "18px",
            }}
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SelectCity;
