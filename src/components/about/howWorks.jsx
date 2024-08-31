import React, { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import About1 from "@/public/assets/images/about1.png";
import Image from "next/image";
import { poppins_500, poppins_600 } from "@/src/components/common/font";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import closeDeal from "@/public/assets/images/icon/close_deal.png";
import meetAgent from "@/public/assets/images/icon/meet_agent.png";
import evaluateProperty from "@/public/assets/images/icon/evaluate_property.png";
import styles from "@/styles/Home.module.css";
const HowWorks = () => {
  const [expanded, setExpanded] = useState([]);

  const toggleAccordion = (panelIndex) => {
    const newExpanded = [...expanded];
    const index = newExpanded.indexOf(panelIndex);
    if (index === -1) {
      newExpanded.push(panelIndex);
    } else {
      newExpanded.splice(index, 1);
    }
    setExpanded(newExpanded);
  };

  const accordianArr = [
    {
      icon: evaluateProperty,
      title: "Evaluate Property",
      desc: "Our team of experienced real estate professionals will assess your property’s value, considering factors such as location, condition, and market trends. We’ll provide you with an accurate estimate to help you make informed decisions.",
    },
    {
      icon: meetAgent,
      title: "Meet Your Agent",
      desc: "Personalized service is at the heart of our approach. When you choose us, you’ll be assigned a dedicated agent who will guide you through the entire process. From property tours to negotiations, your agent will be by your side, ensuring a smooth experience.",
    },
    {
      icon: closeDeal,
      title: "Close The Deal",
      desc: "Congratulations! You’ve found the perfect property or secured a buyer. Our team handles all the paperwork, legalities, and logistics. We make sure the transaction is seamless, allowing you to focus on what matters most.",
    },
  ];

  return (
    <>
      <Box textAlign={"center"} py={5}>
        <Container>
          <Typography
            className={styles.poppins_600}
            sx={{fontSize: { md: "50px", sm: "50px", xs: "30px" }}}
            letterSpacing={"1.44px"}
            color={"space.main"}
          >
            How{" "}
            <Typography variant="span" color={"gold.main"}>
              It{" "}
            </Typography>{" "}
            Works
          </Typography>
          <Typography
            className={styles.poppins_600}
            sx={{fontSize: {sm: "20px", xs: "15px" }}}
            letterSpacing={"1.44px"}
            color={"space.main"}
          >
            Here's a step-by-step look at how we manage your properties.
          </Typography>
          <Grid container paddingTop={"100px"} justifyContent={'center'}>
            <Grid item md={6} sm={6}>
              <Image src={About1} alt="logo xl" width={570} height={340}
                 sizes="100vw"
                 style={{
                  borderRadius:'8px',
                   width: '100%',
                   height: '340px',
                 }} />
            </Grid>
            <Grid item md={6} sm={6} sx={{pl:{md:8,sm:0,xs:0},mt:{sm:0,xs:2}}}>
              {accordianArr.map((item, index) => (
                <Accordion
                  key={index}
                  expanded={expanded.includes(index)}
                  onChange={() => toggleAccordion(index)}
                  sx={{
                    boxShadow: "unset",
                    backgroundColor: "#F3F4F9",
                    borderRadius: "6px!important",
                    mb: 3,
                    "&:before": {
                      backgroundColor: "unset",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      expanded.includes(index) ? (
                        <RemoveSharpIcon
                          sx={{
                            bgcolor: "space.main",
                            color: "#fff",
                            height: "40px",
                            width: "40px",
                            borderRadius: "50%",
                            p: 1,
                          }}
                        />
                      ) : (
                        <AddSharpIcon
                          sx={{
                            bgcolor: "gold.main",
                            height: "40px",
                            width: "40px",
                            borderRadius: "50%",
                            p: 1,
                          }}
                        />
                      )
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Box display={"flex"} alignItems={"center"}>
                      <Image
                        src={item.icon}
                        height={34}
                        width={34}
                        alt="icon"
                      />
                      <Typography
                        className={poppins_500.className}
                        fontSize={"18px"}
                        pl={2}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ borderTop: "1px solid #DDE1F0" }}>
                    <Typography sx={{textAlign:'left'}}>{item.desc}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HowWorks;
