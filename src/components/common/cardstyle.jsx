import { theme } from "@/src/utils/theme";
import { styled } from '@mui/system';
import {
    Box,
  } from "@mui/material";
const MyStyledBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    letterSpacing: 0,
    padding: '18px 23px 30px',
    transition: '0.15s ease-out all',
    backfaceVisibility: 'hidden',
    minHeight:"368px",
    '&::before': {
      content: '""',
      zIndex: -1,
      position: 'absolute',
      transform: 'translateY(32px)',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      pointerEvents: 'none',
      backgroundColor: '#ffffff',
      transition: '0.3s ease-out all',
      willChange: 'transform',
    },
    '&:hover': {
      transition: '0.3s ease-out all',
      transitionDelay: '0.3s',
      boxShadow: '0 0 29px 0 rgba(0, 0, 0, 0.16)',
    },
    '&:hover::before': {
      transform: 'translateY(0px)',
    },
    '&:hover img': {
      transform: 'scale(1.2)',
    },
  }));


  export default MyStyledBox;