import React, { useEffect, useState } from "react";
import { Autocomplete, Box, Button, Divider, Stack, TextField } from "@mui/material";
import { getSearchBoxPlaceDetail } from "@/src/utils/axios";
import styles from "@/styles/Home.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import PlaceIcon from "@mui/icons-material/Place";
import { setCityDialogbox } from "@/src/app/reducer";
const SearchBar = () => {
  // const districtId = useSelector((state) => state.reducer.districtId);
  // const stateId = useSelector((state) => state.reducer.stateId);
  const selectedCityName = useSelector((state) => state.reducer.selectCityName);
  const districtId = useSelector((state) => state.reducer.selectCity);
  const stateId = useSelector((state) => state.reducer.selectState);
  const selectCityDialogbox = useSelector(
    (state) => state.reducer.selectCityDialogbox
  );
  console.log(districtId, "...", stateId, "selectCity123");
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([
    { label: "No results", id: "no-results", disabled: true },
  ]);
  const [setselectedVal, setSelectedVal] = useState("");
  const dispatch = useDispatch();

  const navigate = useRouter();
  const handleChangeCity = async (event, newInputValue) => {
    setInputValue(newInputValue);

    if (newInputValue === "") {
      setOptions([{ label: "No results", id: "no-results", disabled: true }]);
      return;
    }
    setSelectedVal(newInputValue);
    try {
      const res = await getSearchBoxPlaceDetail({ value: newInputValue });
      const newOptions = res.data.data.map((item) => ({
        label: `${item.district}, ${item.taluka_name}, ${item.city_name}`,
        state_id: item.state_id,
        district_id: item.district_id,
        taluka_id: item.taluka_id,
        city_id: item.city_id,
      }));

      setOptions(
        newOptions.length > 0
          ? newOptions
          : [{ label: "No results", city_id: "no-results", disabled: true }]
      );
    } catch (error) {
      console.error("Error fetching city data:", error);
      setOptions([
        { label: "No results", city_id: "no-results", disabled: true },
      ]);
    }
  };

  const filterOptions = (options, state) => options;

  const handleSelectionChange = (event, newValue) => {
    if (newValue && newValue.city_id !== "no-results") {
      // Use newValue.cityName for the API payload
      console.log(
        "Selected city:",
        newValue.district_id,
        newValue.taluka_id,
        newValue.city_id
      );
    }
    setValue(newValue);
  };

  const handleFindProperty = () => {
    console.log( districtId, stateId,'testttt')
    navigate.push({
      pathname: "/property",
      query: {
        state_id: value?.state_id || stateId,
        district: value?.district_id || districtId,
        taluka_id: value?.taluka_id,
        city_id: value?.city_id,
      },
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: {sm:'#fff',xs:'#ffffff4f'},
        backdropFilter:'blur(10px)',
        borderRadius: {sm:"70px",xs:'15px'},
        p: 1,
        mx:1,
        mt: 5,
      }}
    >
      <Stack
          gap={1}
        sx={{
          flexDirection:{sm:'row',xs:'column'},
          mx: { lg: 0, xs: 2 },
          alignItems: { sm: "center", xs: "stretch" },
        }}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={'center'}
          gap={1}
          sx={{
            borderRadius: "20px",
            backgroundColor: "space.main",
            px: { sm: 1.5, xs: 0.5 },
            py:  { sm: 0, xs: 0.5 },
            order:{xs:2, sm:1}
          }}
        >
          <PlaceIcon
            sx={{ fontSize: "1.3rem" }}
          />

          <Button
            className={styles.poppins_600}
            sx={{
              width: {sm:"100px",xs:'auto'},
              "&:hover": { backgroundColor: "transparent" },
              boxShadow: "unset",
              fontSize: { sm: "13px", xs: "inherite" },
              backgroundColor: "transparent",
              paddingX: "0",
              textAlign: {xs:'center', sm:"left"},
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              textOverflow: "ellipsis",
            }}
            variant="contained"
            onClick={() => {
              console.log(!selectCityDialogbox, "selectCityDialogbox");
              dispatch(setCityDialogbox(!selectCityDialogbox));
            }}
          >
            {selectedCityName}
          </Button>
        </Box>
        <Autocomplete
          fullWidth
          value={value}
          onChange={handleSelectionChange}
          inputValue={inputValue}
          onInputChange={handleChangeCity}
          options={options}
          getOptionLabel={(option) => option.label}
          filterOptions={filterOptions}
          renderInput={(params) => (
            <TextField
              sx={{
                "& .MuiFormLabel-root":{
                  color:{sm:'#000', xs:'#fff'},
                },
                "& .MuiOutlinedInput-root": {
                  color:{sm:'#000', xs:'#fff'},
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              {...params}
              label="Search your dream property"
              variant="outlined"
            />
          )}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
            order:{xs:1, sm:2}
          }}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {option.label}
            </li>
          )}
        />
<Divider sx={{  order:1, display:{xs:'block', sm:'none'}}}/>
        <Button
          disabled={setselectedVal == "No results"}
          onClick={handleFindProperty}
          className={styles.poppins_600}
          type="submit"
          variant="contained"
          sx={{
            border: "2px solid #1A2B56",
            borderRadius: "25px",
            backgroundColor: "space.main",
            px: { sm: 4.5, xs: 0.5 },
            py:  { sm: 1.5, xs: 0.5 },
            order:{xs:3, sm:3}
          }}
          startIcon={
            <SearchIcon
              sx={{
                fontSize: { sm: "22px !important", xs: "18px" },
                display: { sm: "block", xs: "none" },
              }}
            />
          }
        >
          Search
        </Button>
      </Stack>
    </Box>
  );
};

export default SearchBar;
