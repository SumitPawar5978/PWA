import React from 'react';
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import RealEstate from '@/public/assets/images/realestate.png'
import AppBanner from '@/public/assets/images/appBanner.png'
import Image from 'next/image'
import Link from 'next/link'
const DownloadApp = (props) => {

    return (
        <>
          
            <Box sx={{ backgroundColor: props.color }} py={3}>
                <Container>
                    <Link href="/comming-soon" style={{ textDecoration: 'none' }}>
                        <Image src={AppBanner} alt="RealEstate"  style={{filter:props.shadow, width:'100%', height:'100%'}}/>
                    </Link>
                </Container>
            </Box>
        </>
    )
}

export default DownloadApp