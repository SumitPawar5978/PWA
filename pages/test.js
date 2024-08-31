import React, { useState } from "react";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { getSearchBoxPlaceDetail } from "@/src/utils/axios";
import styles from "@/styles/Home.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
const Test = () => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([
    { label: "No results", id: "no-results", disabled: true },
  ]);
  const navigate = useRouter();
  console.log(value, "inputValue");
  const handleChangeCity = async (event, newInputValue) => {
    setInputValue(newInputValue);

    if (newInputValue === "") {
      setOptions([{ label: "No results", id: "no-results", disabled: true }]);
      return;
    }
    console.log(newInputValue, "newInputValue");
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
    navigate.push({
      pathname: "/property",
      query: {
        state_id: value.state_id,
        district: value.district_id,
        taluka_id: value.taluka_id,
        city_id: value.city_id,
      },
    });
  };
  return (
    <Stack
      direction={"row"}
      gap={2}
      alignItems={"center"}
      sx={{ border: 1, backgroundColor: "#fff", borderRadius: "10px", p: 1 }}
    >
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
          <TextField {...params} label="Select an option" variant="outlined" />
        )}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
          },
        }}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.label}
          </li>
        )}
      />
      <Button
        onClick={handleFindProperty}
        className={styles.poppins_400}
        type="submit"
        variant="contained"
        sx={{
          border: "3px solid #B58A44",
          borderRadius: "10px",
          backgroundColor: "gold.main",
          padding: { sm: "12px", xs: "1px" },
          color: "space.main",
          fontSize: { sm: "18px", xs: "14px" },
          textTransform: "capitalize",
        }}
        endIcon={
          <SearchIcon
            sx={{ fontSize: { sm: "22px !important", xs: "18px" } }}
          />
        }
      >
        Search
      </Button>
    </Stack>
  );
};

export default Test;
