

const CustomPopup = ({ onClose, onInstall }) => {
  return (
    <div>
      <div >
        <h2>Install App</h2>
        <p>Get our app for a better experience!</p>
        <button onClick={onInstall}>Install</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CustomPopup;
