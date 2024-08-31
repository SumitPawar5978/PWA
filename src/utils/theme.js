import { createTheme } from "@mui/material/styles";
import { poppins_600, poppins_500, poppins_400, roboto_400, roboto_500} from "../components/common/font";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#B58A44',
    },
    space: {
      main: "#1A2B56",
    },
    gold: {
      main: "#CF9B45",
      dark: "#B58A44",
    },
    crayola: {
      main: "#A1ACC2",
      light: "#F3F4F9",
    },
    rackley: {
      main: "#6885A3",
      dark: "#6D7593",
    },
    maastricht: {
      main: "#0D1F37",
    },

    flash: {
      main: "#F2F2F2",
    },
    picton: {
      main: "#4B9EF1",
    },
  },
  components: {
    MuiTypography: {
      // variantMapping: {
      //   poppins_600: "body1",
      //   poppins_400: "body1",
      // },

      
      styleOverrides: {
        poppins_600: {
          ...poppins_600.style,
        },
        poppins_500: {
          ...poppins_500.style,
        },
        poppins_400: {
          ...poppins_400.style,
        },
        roboto_400: {
          ...roboto_400.style,
        },
        roboto_500: {
          ...roboto_500.style,
        },
      },
    },
  },
});
