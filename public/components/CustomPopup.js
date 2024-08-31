

const CustomPopup = ({ onClose, onInstall }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2 style={styles.title}>Install App</h2>
        <p style={styles.message}>Get our app for a better experience!</p>
        <div style={styles.buttonContainer}>
          <button onClick={onInstall} style={styles.installButton}>Install</button>
          <button onClick={onClose} style={styles.closeButton}>Close</button>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
  },
  title: {
    margin: 0,
    marginBottom: '15px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  message: {
    marginBottom: '20px',
    fontSize: '16px',
    color: '#555',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  installButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  closeButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default CustomPopup;



