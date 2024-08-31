import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function page404() {
  return <>
  <Box textAlign={'center'} my={15}>
    <Typography variant='h1' color="error">404 Not Found</Typography>
    <Link href={'/'}><Button variant="outlined" color="error">Go To Home Page</Button></Link>
  </Box>
  
  </>
}
