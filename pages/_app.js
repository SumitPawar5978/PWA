import { persistor, wrapper, store } from "@/src/app/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ResponsiveAppBar from "@/src/components/common/navbar";
import Topnavbar from "@/src/components/common/topnavbar";
import { Divider } from "@mui/material";
import Footer from "@/src/components/common/footer";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/src/utils/theme";
import SelectCity from "@/src/components/common/selectCity";
import { PersistGate } from "redux-persist/integration/react";
import SeoDetails from "@/src/components/common/seoDetails";
import { useEffect, useState } from 'react';
import CustomPopup from '../public/components/CustomPopup';

function App({ Component, pageProps }) {
  const [showPopup, setShowPopup] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPopup(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
    setShowPopup(false);
  };

  return (
    <Provider store={store}>
      <SeoDetails seoData={pageProps.seoDetails} /> 
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Topnavbar />
          <Divider light />
          <ResponsiveAppBar />
          <SelectCity />
          {showPopup && <CustomPopup onClose={() => setShowPopup(false)} onInstall={handleInstall} />}
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(App);
