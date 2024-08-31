import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

const AddToHomeScreen = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Update UI to notify the user they can add to home screen
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleAddToHomeScreen = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      // Optionally, send analytics event with outcome of the user's choice
      console.log(`User response to the install prompt: ${outcome}`);
      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  return (
    isVisible && (
        <Button
        variant="contained"
        sx={{
          width: "450px",
          border: "3px solid #B58A44",
          borderRadius: "75px",
          backgroundColor: "gold.main",
          padding: "6px",
          color: "#000",
          fontSize: "18px",
        }} onClick={handleAddToHomeScreen}>
        Add to Home Screen
      </Button>
    )
  );
};

export default AddToHomeScreen;
