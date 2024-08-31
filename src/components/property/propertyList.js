import React, { useEffect, useState } from "react";

import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import {
  poppins_400,
  poppins_500,
  poppins_600,
  roboto_400,
} from "@/src/components/common/font";

import PropertyCard from "../common/propertyCard";
import { getAllPropertyDetail } from "@/src/utils/axios";
import CircularProgress from "@mui/material/CircularProgress";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const PropertyList = ({ filters }) => {
  const [pageNo, setPageNo] = useState(1);
  const [formData, setFormData] = useState({
    state_id: "",
    district: "",
    taluka_id: "",
    city_id: "",
    type: "",
    order: "",
    status: "",
    bhkType: "",
    min_price: "",
    max_price: "",
    page: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [property, setProperty] = useState();
console.log(property,'propertyproperty')
  const getAllProperty = async () => {
    try {
      let res = await getAllPropertyDetail({ ...formData });

      // setProperty(res?.data?.data);
      setProperty((prevProperty) => {
        const newProperty = res?.data?.data;
        if (newProperty) {
          return newProperty;        }
        
        return prevProperty;
      });

    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };
  useEffect(() => {
    if (filters) {
      const tempObj = { ...filters };
      if (tempObj["minMax"]) {
        tempObj["min_price"] = Number(tempObj["minMax"][0]);
        tempObj["max_price"] = Number(tempObj["minMax"][1]);
        delete tempObj["minMax"];
      }

      tempObj["page"] = pageNo;

      setFormData({ ...formData, ...tempObj });
    }
  }, [filters, pageNo]);

  useEffect(() => {
    console.log(formData, "formData");
    if (
      Object.values(formData).filter((i) => i?.toString()?.trim()?.length > 0)
    ) {
      getAllProperty();
    }
  }, [formData]);

  if (!property) {
    return (
      <Box display={"flex"} justifyContent={"center"}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {}
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        bgcolor={"#fff"}
        p={2}
      >
        <Grid item md={12} xs={12}>
          <Stack direction={"row"} gap={2}>
            <FormControl fullWidth>
              <InputLabel
                className={roboto_400.className}
                sx={{
                  color: "#000",
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
                conComponent={ExpandMoreIcon}
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
                  color: "#000",
                  lineHeight: "unset",
                  backgroundColor: "#fff",
                  pl: 0.2,
                }}
                htmlFor="demo-simple-select-label"
                id="demo-simple-select-label"
              >
                Property Status
              </InputLabel>
              <Select
                conComponent={ExpandMoreIcon}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
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
            </FormControl>
            <FormControl fullWidth>
              <InputLabel
                className={roboto_400.className}
                sx={{
                  color: "#000",
                  lineHeight: "unset",
                  backgroundColor: "#fff",
                  pl: 0.2,
                }}
                htmlFor="demo-simple-select-label"
                id="demo-simple-select-label"
              >
                Price Low to High
              </InputLabel>
              <Select
                conComponent={ExpandMoreIcon}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                sx={{
                  borderRadius: "75px",
                  backgroundColor: "#FFFFFF",
                  "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                }}
              >
                <MenuItem value={"low"}>Low To High</MenuItem>
                <MenuItem value={"high"}>High To Low</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>
      </Grid>
      <Grid container my={3}>
        {property?.properties.map((item, index) => (
          <Grid
            key={index}
            item
            md={6}
            sm={6}
            xs={12}
            mb={1}
            sx={{
              paddingRight: { sm: index % 2 === 0 ? 1 : 0 },
              paddingLeft: { sm: index % 2 !== 0 ? 2 : 0 },
            }}
          >
            <PropertyCard
              status={item.status}
              property_id={item.property_id}
              imgUrl={item.property_images_arr}
              title={item.title}
              area={item.sqFtarea}
              bathroom={item.bathroomCount}
              bedroom={item.bhkType}
              max_price={item.max_price}
              isCheckBoxTrue={true}
              isCheckedTrue={false}
              isAmenities={true}
              routingUrl={
                "/property/" +
                item.title.replace(/\s+/g, "-") +
                "-" +
                item.property_id
              }
              formData={formData}
              verified_flag={item.verified_flag}
              prop_sold_out_status={item.prop_sold_out_status}
            />
          </Grid>
        ))}
      </Grid>
      {property?.total_properties === 0 && (
        <Typography
          sx={{ fontSize: "40px", color: "#d9d9d9", textAlign: "center" }}
          className={poppins_600.className}
        >
          No Data Found
        </Typography>
      )}
      <Box display={"flex"} justifyContent={"center"} pb={2}>
        <Pagination
          count={property?.last_page}
          page={pageNo}
          onChange={(event, value) => {
            setPageNo(value);
          }}
          variant="outlined"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#6885A3",
              color: "#fff",
              fontWeight: "600",
            },
            "& .MuiPaginationItem-root": { borderRadius: "0px" },
          }}
        />
      </Box>
    </>
  );
};

export default PropertyList;
