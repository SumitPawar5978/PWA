import Head from 'next/head'
import React from 'react'
// import { imgUrlBackend } from '../utils/api'
const defaultData = {
    title: "Agent Portal",
    description: "Dhanjee is a comprehensive platform that caters to all aspects of consumers’ needs in the real estate industry. As an online forum, it facilitates seamless information exchange among buyers, sellers, and brokers/agents. Our mission is simple: to connect people with their dream properties. Whether you’re a first-time property buyer, an experienced investor, or someone looking to sell their property, we’re here to guide you every step of the way. We combine our expertise, market knowledge, and personalized service to ensure that your real estate journey is smooth, successful, and stress-free.",
    image: "favicon.ico",
    url: "https://agentportal.com",
}
const SeoDetails = ({ seoData }) => {
    return (
        <Head>
            {/* google meta tags */}
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <link rel="apple-touch-icon" href="logo192.png" />
            <meta charset="utf-8" />
            <meta name="description" content={seoData?.description ? seoData.description : defaultData.description} />
            <title>{defaultData.title} | {seoData?.title}</title>
            <meta name="robots" content="noindex,nofollow" />
            {/* facebook meta tags */}
            <meta property="og:url" content={seoData?.url ? seoData.url : defaultData.url} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={seoData?.title ? seoData.title : defaultData.title} />
            <meta property="og:description" content={seoData?.description ? seoData.description : defaultData.description} />
            <meta property="og:image" content={seoData?.image ? seoData.image : defaultData.image} />
            {/* twitter meta tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@agentportal.com" />
            <meta name="twitter:title" content={seoData?.title ? seoData.title : defaultData.title} />
            <meta name="twitter:description" content={seoData?.description ? seoData.description : defaultData.description} />
            <meta name="twitter:image" content={seoData?.image ? seoData.image : defaultData.image} />
        </Head>
    )
}
export default SeoDetails