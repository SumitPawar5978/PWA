import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useRouter } from "next/router";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { poppins_400 } from "./font";
import { useSelector } from "react-redux";

const pages = [
  { label: "Home", route: "/", icon: <KeyboardDoubleArrowRightIcon /> },
  {
    label: "Properties",
    route: "/property",
    icon: <KeyboardDoubleArrowRightIcon />,
    subitems: [
      { label: "Property List", route: "/property" },
      { label: "Post Property", route: "/property/postProperty" },
    ],
  },
  {
    label: "About Us",
    route: "/about-us",
    icon: <KeyboardDoubleArrowRightIcon />,
  },
  {
    label: "Contact Us",
    route: "/contact-us",
    icon: <KeyboardDoubleArrowRightIcon />,
  },
  {
    label: "Privacy Policy",
    route: "/privacy-policy",
    icon: <KeyboardDoubleArrowRightIcon />,
  },
];

const NavItem = ({toggleDrawerProps}) => {
  const selectedCityName = useSelector((state) => state.reducer.selectCity);
  const selectedStateName = useSelector((state) => state.reducer.selectState);
  console.log(selectedStateName,'selectedStateName')
  const loginUserName = useSelector((state) => state.reducer.loginUserName);
  const [activeField, setActiveField] = useState(null);
  const [propertyDropdownAnchorEl, setPropertyDropdownAnchorEl] =
    useState(null);
  const navigate = useRouter();
  const pathSegments = navigate.asPath.split("/");
  const subpath = "/" + pathSegments[1];



  const handleFieldClick = (field, route) => {
    toggleDrawerProps()
    setActiveField(field);
    if (field.includes("Property")) {
      navigate.push({ pathname: route, query: { district: selectedCityName, state_id:selectedStateName } });
     
    } else {
      navigate.push(route);
    }
  };

  const handleOpenPropertyDropdown = (event) => {
    setPropertyDropdownAnchorEl(event.currentTarget);
  };

  const handleClosePropertyDropdown = () => {
    setPropertyDropdownAnchorEl(null);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  return (
    <>
      {pages.map((page) => (
        <Box key={page.label}>
          {page.label === "Properties" ? (
            <Box>
              <Button
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleOpenPropertyDropdown}
                sx={{
                  m: 2,
                  display: "flex",
                  alignItems: "flex-start",
                  fontWeight: "600",
                  color:  subpath.split("?")[0] === page.route ? "#CF9B45" : "black",
                }}
              >
                <Box
                  component={"span"}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {page.icon}
                </Box>{" "}
                {page.label}
              </Button>
              <Menu
                anchorEl={propertyDropdownAnchorEl}
                open={Boolean(propertyDropdownAnchorEl)}
                onClose={handleClosePropertyDropdown}
              >
                <MenuItem
                  className={poppins_400.className}
                  sx={{
                    fontWeight:
                    navigate.asPath.split("?")[0] === page.route
                        ? "bold"
                        : "normal",
                    color:
                    navigate.asPath.split("?")[0] === page.route
                        ? "#CF9B45"
                        : "black",
                    borderBottom: "1px solid #dfdfdf",
                  }}
                  onClick={() => {
                    handleClosePropertyDropdown();
                    handleFieldClick(
                      page.subitems[0].label,
                      page.subitems[0].route
                    );
                  }}
                >
                  {page.subitems[0].label}                
                </MenuItem>
                {loginUserName && (
                  <MenuItem
                    className={poppins_400.className}
                    sx={{
                      fontWeight:
                      navigate.asPath.split("?")[0] === page.subitems[1].route
                          ? "bold"
                          : "normal",
                      color:
                      navigate.asPath.split("?")[0] === page.subitems[1].route
                          ? "#CF9B45"
                          : "black",
                      borderBottom: "1px solid #dfdfdf",
                    }}
                    onClick={() => {
                      handleClosePropertyDropdown();
                      handleFieldClick(
                        page.subitems[1].label,
                        page.subitems[1].route
                      );
                    }}
                  >
                    {page.subitems[1].label}
                  </MenuItem>
                )}
              </Menu>
            </Box>
          ) : (
            <Button
              onClick={() => handleFieldClick(page.label, page.route)}
              sx={{
                m: 2,
                display: "flex",
                alignItems: "flex-start",
                fontWeight: "600",
                color: navigate.asPath === page.route ? "#CF9B45" : "black",
              }}
            >
              <Box
                component={"span"}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {page.icon}
              </Box>
              {page.label}
            </Button>
          )}
        </Box>
      ))}
    </>
  );
};

export default NavItem;
