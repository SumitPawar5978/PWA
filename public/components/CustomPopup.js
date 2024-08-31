const CustomPopup = ({ onClose, onInstall }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <div style={styles.iconContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#1A2B56"
            viewBox="0 0 24 24"
            width="40px"
            height="40px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2L2 22h20L12 2zM12 17l-5-5h10l-5 5z" />
          </svg>
        </div>
        <h2 style={styles.title}>Install Our App</h2>
        <p style={styles.message}>
          Experience the best with our app. Get it now for enhanced features and seamless performance!
        </p>
        <div style={styles.buttonContainer}>
          <button onClick={onInstall} style={styles.installButton}>Install Now</button>
          <button onClick={onClose} style={styles.closeButton}>Maybe Later</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#1A2B56',
    borderRadius: '20px',
    padding: '40px 30px',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
    textAlign: 'center',
    position: 'relative',
    color: '#fff',
    animation: 'fadeIn 0.4s ease-in-out',
  },
  iconContainer: {
    backgroundColor: '#cf9b45',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '15px',
    fontFamily: '"Poppins", sans-serif',
  },
  message: {
    fontSize: '16px',
    color: '#e0e0e0',
    marginBottom: '30px',
    fontFamily: '"Poppins", sans-serif',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
  installButton: {
    backgroundColor: '#cf9b45',
    color: '#1A2B56',
    padding: '12px 30px',
    borderRadius: '30px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: '"Poppins", sans-serif',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  },
  closeButton: {
    backgroundColor: '#e0e0e0',
    color: '#1A2B56',
    padding: '12px 30px',
    borderRadius: '30px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: '"Poppins", sans-serif',
    transition: 'all 0.3s ease',
  },
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
};

export default CustomPopup;
