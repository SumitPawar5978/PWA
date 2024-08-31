import Head from "next/head";
import { Box, Button, ThemeProvider } from "@mui/material";
import { theme } from "@/src/utils/theme";

import ProfileSetup from "@/src/components/registration/profileSetup";
import SetPassword from "@/src/components/registration/setPassword";
import ThankyouMsg from "@/src/components/registration/thankyouMsg";
import PersonalData from "@/src/components/registration/personalData";
import { useState } from "react";
import OtpAuth from "@/src/components/registration/otpAuth";
import DocVerification from "@/src/components/registration/docVerification";
import { useSelector } from "react-redux";

export default function Index() {
  const [activeStep, setActiveStep] = useState(0);
  const role = useSelector((state) => state.reducer.role);
const [data, setData] = useState({})
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const stepComponents = [
    <PersonalData key="personalData" handleNext={handleNext} />,
    <OtpAuth key="otpAuth" handleNext={handleNext} />,
    <ProfileSetup key="profileSetup" handleNext={handleNext} />,
    <SetPassword key="setPassword" handleNext={handleNext} setData={setData}/>,
    <ThankyouMsg key="thankyouMsg" data={data}/>,
  ];

  if (role != "User") {
    stepComponents.splice(
      2,
      0,
      <DocVerification key="docVerification" handleNext={handleNext} />
    );
  }

  return (
    <>
      <Head>
        <title>{role} Registration</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>{stepComponents[activeStep]}</Box>
    </>
  );
}
