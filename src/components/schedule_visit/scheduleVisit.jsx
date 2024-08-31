import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import { theme } from "@/src/utils/theme";
import Complete from "@/public/assets/images/complete.png";
import {
  poppins_400,
  poppins_500,
  poppins_600,
  roboto_400,
  roboto_500,
} from "@/src/components/common/font";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "@/styles/Home.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DateCalendar } from "@mui/x-date-pickers";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import dayjs from "dayjs";
import Image from "next/image";
import {
  getScheduleVisitDetail,
  scheduleVisitConfirmationPost,
  scheduleVisitDateTime,
  scheduleVisitPost,
} from "@/src/utils/axios";
import { useDispatch, useSelector } from "react-redux";
const Mystyle = {
  my: 1,
  mx: 0.9,
  width: "76px",
  backgroundColor: "#F3F4F9",
  color: "#000",
  fontSize: "10px",
  "&:hover": { backgroundColor: "#cbdce6" },
};
const ScheduleVisit = () => {
  const selectedProperty = useSelector(
    (state) => state.reducer.selectedProperty
  );
  console.log(selectedProperty?.data[0],'selectedProperty')
  const today = dayjs();
  const tomorrow = dayjs().add(1, "day");
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
  const timeSlots = [
    "9.00 AM",
    "9.30 AM",
    "10.00 AM",
    "10.30 AM",
    "11.00 AM",
    "11.30 AM",
    "12.00 PM",
    "12.30 PM",
    "1.00 PM",
    "1.30 PM",
    "2.00 PM",
    "4.00 PM",
    "4.30 PM",
    "5.00 PM",
    "5.30 PM",
    "6.00 PM",
    "6.30 PM",
    "7.00 PM",
    "7.30 PM",
    "8.00 PM",
    "8.30 PM",
    "9.00 PM",
  ];
  const [selectedTime, setSelectedTime] = useState("");
  const schedulePropId = useSelector((state) => state.reducer.schedulePropId);
const [isSubmitted, setIsSubmitted] = useState(false)
  const [expanded, setExpanded] = React.useState(false);
  const [dateValue, setDateValue] = React.useState(dayjs());
  const [errors, setErrors] = useState({});
  const [timeErrorMessage, setTimeErrorMessage] = useState("");
  const [formData1, setFormData1] = useState({
    visitor_name: "",
    mobile_no: "",
    property_id: schedulePropId,
  });
  const [formData2, setFormData2] = useState({
    visitor_date: "",
    visitor_time: "",
  });

  const [isSecondAccordionEnabled, setSecondAccordionEnabled] = useState(false);
  const [isThirdAccordionEnabled, setThirdAccordionEnabled] = useState(false);
  const [isVisitConfirm, setVisitConfirm] = useState(false);
  const [visitScheduleDetails, setVisitScheduleDetails] = useState();

  const handleTimeClick = (time) => {
    setFormData2({ ...formData2, visitor_time: time });
    setSelectedTime(time);
    setTimeErrorMessage("");
  };
  const handleDateClick = (date) => {
    // setFormData2({...formData2,visitor_date:date})

    const { $y, $M, $D } = date;
    const formattedDate = `${$y}-${String($M + 1).padStart(2, "0")}-${String(
      $D
    ).padStart(2, "0")}`;
    setFormData2({ ...formData2, visitor_date: formattedDate });
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e) => {
    setFormData1({
      ...formData1,
      [e.target.name]: e.target.value,
    });
  };


  const validateMobileNumber = (number) => {
    // Regex to validate Indian mobile numbers
    const regex = /^[6-9]\d{9}$/;
    const invalidPatterns = [
      '0000000000',
      '0000000001',
      '3333333333',
      // Add other invalid patterns here
    ];

    if (!regex.test(number) || invalidPatterns.includes(number)) {
      return false;
    }
    return true;
  };
  const handleFormSubmit = async (e) => {
    let newErrors = {};
    e.preventDefault();
    // Basic form validation

    if (validateMobileNumber(formData1.mobile_no)) {
      // newErrors.mobile_no = "valid";
      // Proceed with form submission logic
    } else {
      newErrors.mobile_no = "Invalid mobile number";
    }

    if (formData1.visitor_name === "") {
      newErrors.visitor_name = "This field is required";
    }

    if (formData1.mobile_no === "") {
      newErrors.mobile_no = "This field is required";
    } else if (formData1.mobile_no.length !== 10) {
      newErrors.mobile_no = "Phone number must be 10 digits";
    }

    if (Object.keys(newErrors).length === 0) {
      handleFirstFormSubmit();
      setErrors();
      setExpanded("panel2");
      await scheduleVisitPost(formData1).then((res) =>
        setFormData2({
          ...formData2,
          manage_schedule_id: res?.data?.manage_schedule_id,
        })
      );
    } else {
      setErrors(newErrors);
    }
  };

  const getScheduleDetails = async (id) => {
    try {
      let res = await getScheduleVisitDetail(id);
      setVisitScheduleDetails(res?.data?.data);
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  const handleFirstFormSubmit = () => {
    setSecondAccordionEnabled(true);
  };
  const handleSecondFormSubmit = async () => {
    if (!formData2.visitor_date) {
      setTimeErrorMessage("Please select visit date.");
    } else if (!selectedTime) {
      setTimeErrorMessage("Please select a time slot.");
    } else {
      try {
        const res = await scheduleVisitDateTime(formData2);
        Toast.fire({
          icon: "success",
          title: res?.data?.message,
        });
      } catch (error) {
        console.error("Error:", error);
        Toast.fire({
          icon: "error",
          title: error,
        });
      }
      setExpanded("panel3");

      setThirdAccordionEnabled(true);
      getScheduleDetails(formData2.manage_schedule_id);
      setTimeErrorMessage("");
    }
  };
  const handleVisitConfirmSubmit = async () => {    
    try {
      const res = await scheduleVisitConfirmationPost({manage_schedule_id:formData2.manage_schedule_id.toString()})
      Toast.fire({
        icon: "success",
        title: res?.data?.message,
      });
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error:", error);
      Toast.fire({
        icon: "error",
        title: error,
      });
    }
    setVisitConfirm(true);
  };

  console.log(formData2.manage_schedule_id,'formData2.manage_schedule_id')
  return (
    <>
      <Box bgcolor={"#fff"} py={4}>
        <Typography
          textAlign={"center"}
          variant="poppins_600"
          component={"p"}
          fontSize={"50px"}
          color={"space.main"}
          letterSpacing={"1.44px"}
        >
          Schedule A{" "}
          <Typography
            variant="poppins_600"
            fontSize={"50px"}
            color={"gold.main"}
            component="span"
          >
            Visit
          </Typography>{" "}
        </Typography>
        <Typography
          textAlign={"center"}
          variant="poppins_600"
          component={"p"}
          fontSize={"20px"}
          color={"space.main"}
          letterSpacing={"1.44px"}
        >
          Schedule A visit And Know More About This Property
        </Typography>
      </Box>

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{
          my: 2,
          "&:before": { position: "unset" },
          boxShadow: "0px 1px 1px #dde1f0a1",
        }}
      >
        <AccordionSummary
          sx={{ "& .MuiAccordionSummary-content": { alignItems: "center" } }}
          expandIcon={
            <ArrowDropDownCircleOutlinedIcon sx={{ color: "#6885A3" }} />
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {/* <LooksOneIcon sx={{color:'#23CD86',mr:2}}/> */}
          {isSecondAccordionEnabled ? (
            <CheckBoxRoundedIcon sx={{ color: "#23CD86", mr: 2 }} />
          ) : (
            <LooksOneIcon sx={{ color: "#23CD86", mr: 2 }} />
          )}
          <Typography
            className={poppins_400.className}
            sx={{ color: "#000", letterSpacing: "1px", fontSize: "18px" }}
          >
            Visitor Details
          </Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <Box bgcolor={"#fff"} my={2}>
            <Grid container>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Enter Full Name"
                  variant="outlined"
                  name="visitor_name"
                  value={formData1.visitor_name}
                  onChange={handleInputChange}
                  error={!!errors?.visitor_name}
                  helperText={errors?.visitor_name}
                  sx={{
                    my: 1,
                    pr: 1,
                    "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                    "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                    "& .MuiInputLabel-root": { lineHeight: "unset" },
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Enter Contact Number"
                  variant="outlined"
                  name="mobile_no"
                  type="number"
                  value={formData1.mobile_no}
                  onChange={handleInputChange}
                  error={!!errors?.mobile_no}
                  helperText={errors?.mobile_no}
                  sx={{
                    my: 1,
                    pr: 1,
                    "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                    "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                    "& .MuiInputLabel-root": { lineHeight: "unset" },
                  }}
                />
              </Grid>
            </Grid>
            <Box textAlign={"end"}>
              <Button
                className={styles.poppins_600}
                variant="contained"
                sx={{
                  borderRadius: "75px",
                  backgroundColor: "gold.main",
                  marginTop: "20px",
                  padding: "12px 25px",
                  color: "#fff",
                  fontSize: "12px",
                  letterSpacing: "1.44px",
                }}
                onClick={handleFormSubmit}
              >
                Submit & Next
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        disabled={!isSecondAccordionEnabled}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        sx={{
          my: 2,
          "&:before": { position: "unset" },
          boxShadow: "0px 1px 1px #dde1f0a1",
        }}
      >
        <AccordionSummary
          expandIcon={
            <ArrowDropDownCircleOutlinedIcon sx={{ color: "#6885A3" }} />
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {isThirdAccordionEnabled ? (
            <CheckBoxRoundedIcon
              sx={{
                color: isSecondAccordionEnabled ? "#23CD86" : "#494949",
                mr: 2,
              }}
            />
          ) : (
            <LooksTwoIcon
              sx={{
                color: isSecondAccordionEnabled ? "#23CD86" : "#494949",
                mr: 2,
              }}
            />
          )}
          <Typography
            className={poppins_400.className}
            sx={{ color: "#000", letterSpacing: "1px", fontSize: "18px" }}
          >
            Select Date & Time
          </Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <Box bgcolor={"#fff"} my={2}>
            <Grid container>
              <Grid item md={5} sm={6} xs={12}>
                <Paper sx={{ height: "100%", width: "100%" }}>
                  {isClient ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
                        sx={{
                          "& .Mui-selected": {
                            color: "#bebebe !important",
                            border: "1px solid #7e7e7e !important",
                          },
                        }}
                        minDate={tomorrow}
                        value={dateValue}
                        onChange={(newValue) => {
                          handleDateClick(newValue);
                          setDateValue(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  ) : null}
                </Paper>
              </Grid>
              <Grid
                item
                md={7}
                sm={6}
                xs={12}
                sx={{
                  paddingLeft: { sm: "16px", xs: "0" },
                  mt: { sm: 0, xs: 1 },
                }}
              >
                <Paper sx={{ padding: "15px", mb: 1.5 }}>
                  <Typography sx={{ fontSize: "16px" }}>Morning</Typography>
                  <Box display={"flex"} flexWrap={"wrap"}>
                    {timeSlots.slice(0, 11).map((time) => (
                      <Button
                        key={time}
                        variant="outlined"
                        size="small"
                        sx={{
                          ...Mystyle,
                          backgroundColor:
                            selectedTime === time ? "#CF9B45" : "default",
                          color: selectedTime === time ? "#fff" : "default",
                        }}
                        onClick={() => handleTimeClick(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </Box>
                </Paper>

                <Paper sx={{ padding: "15px" }}>
                  <Typography sx={{ fontSize: "16px" }}>Evening</Typography>
                  <Box display={"flex"} flexWrap={"wrap"}>
                    {timeSlots.slice(11).map((time) => (
                      <Button
                        key={time}
                        variant="outlined"
                        size="small"
                        sx={{
                          ...Mystyle,
                          backgroundColor:
                            selectedTime === time ? "#CF9B45" : "default",
                          color: selectedTime === time ? "#fff" : "default",
                        }}
                        onClick={() => handleTimeClick(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            {timeErrorMessage && (
              <Typography
                textAlign={"center"}
                color={"#ff0000"}
                fontSize={"14px"}
                mt={2}
              >
                *{timeErrorMessage}
              </Typography>
            )}
            <Box textAlign={"end"}>
              <Button
                className={styles.poppins_600}
                variant="contained"
                sx={{
                  borderRadius: "75px",
                  backgroundColor: "gold.main",
                  marginTop: "20px",
                  padding: "12px 25px",
                  color: "#fff",
                  fontSize: "12px",
                  letterSpacing: "1.44px",
                }}
                onClick={handleSecondFormSubmit}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        disabled={!isThirdAccordionEnabled}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{
          my: 2,
          "&:before": { position: "unset" },
          boxShadow: "0px 1px 1px #dde1f0a1",
        }}
      >
        <AccordionSummary
          expandIcon={
            <ArrowDropDownCircleOutlinedIcon sx={{ color: "#6885A3" }} />
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {isVisitConfirm ? (
            <CheckBoxRoundedIcon
              sx={{
                color: isThirdAccordionEnabled ? "#23CD86" : "#494949",
                mr: 2,
              }}
            />
          ) : (
            <Looks3Icon
              sx={{
                color: isThirdAccordionEnabled ? "#23CD86" : "#494949",
                mr: 2,
              }}
            />
          )}

          <Typography
            className={poppins_400.className}
            sx={{ color: "#000", letterSpacing: "1px", fontSize: "18px" }}
          >
            Confirm Schedule
          </Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <Box bgcolor={"#fff"} my={2}>
            <Typography
              className={poppins_500.className}
              fontSize={"18px"}
              mb={1.5}
            >
              Visitor Informations :
            </Typography>
            <Grid container>
              <Grid item md={6}>
                <Typography className={poppins_400.className} fontSize={"16px"}>
                  <PersonIcon
                    sx={{ verticalAlign: "top", marginRight: "10px" }}
                  />
                  Full Name :{" "}
                  <Typography color={"#6885A3"} variant={"span"}>
                    {visitScheduleDetails?.visitor_name}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography className={poppins_400.className} sx={{pl:{sm:3,xs:0}, pt:{sm:0,xs:2}}} fontSize={"16px"}>
                  <CallIcon
                    sx={{ verticalAlign: "top", marginRight: "10px" }}
                  />
                  Contact Number :{" "}
                  <Typography color={"#6885A3"} variant={"span"}>
                    {visitScheduleDetails?.mobile_no}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{pt:3}}/>
            <Typography
              className={poppins_500.className}
              fontSize={"18px"}
              my={1.5}
            >
              Date & Time :
            </Typography>
            <Grid container>
              <Grid item md={6} xs={12}>
                <Typography className={poppins_400.className} fontSize={"16px"}>
                  <EventIcon
                    sx={{ verticalAlign: "top", marginRight: "10px" }}
                  />
                  Date :{" "}
                  <Typography color={"#6885A3"} variant={"span"}>
                    {visitScheduleDetails?.visitor_date}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography className={poppins_400.className} sx={{pl:{sm:3,xs:0},pt:{sm:0,xs:2}}} fontSize={"16px"}>
                  <AccessTimeFilledIcon
                    sx={{ verticalAlign: "top", marginRight: "10px" }}
                  />
                  Time :{" "}
                  <Typography color={"#6885A3"} variant={"span"}>
                    {" "}
                    {visitScheduleDetails?.visitor_time}{" "}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
            <Box textAlign={"end"}>
              <Button
              disabled={isSubmitted}
                className={styles.poppins_600}
                variant="contained"
                sx={{
                  borderRadius: "75px",
                  backgroundColor: "gold.main",
                  marginTop: "20px",
                  padding: "12px 25px",
                  color: "#fff",
                  fontSize: "12px",
                  letterSpacing: "1.44px",
                }}
                onClick={handleVisitConfirmSubmit}
              >
                Confirm My Visit
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      {isVisitConfirm && (
        <Box textAlign={"center"}>
          <Image src={Complete} alt="completed icon" />
          <Typography className={poppins_600.className} fontSize={"24px"}>
            Visit Scheduled!
          </Typography>
          <Typography
            className={poppins_400.className}
            fontSize={"18px"}
            color={"#0D0D0D66"}
          >
            We are looking forward to meeting you at{" "}
            <Typography variant="span" color={"#1A2B56"}>
            {selectedProperty?.data[0]?.area}{", "}
            {selectedProperty?.data[0]?.district}{"-"} {selectedProperty?.data[0]?.zip_code}{" "}
            </Typography>
            <Typography  variant="span" color={"#1A2B56"}>
          On {visitScheduleDetails?.visitor_date} at {visitScheduleDetails?.visitor_time}
          </Typography>
          </Typography>
          
        </Box>
      )}
    </>
  );
};

export default ScheduleVisit;
