import { GiBroom } from "react-icons/gi";
import React, { useState, useEffect } from 'react';

const StorageMonitor = () => {
  const [usedPercentage, setUsedPercentage] = useState(0);

  useEffect(() => {
    const calculateStorageUsage = () => {
      let total = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += (localStorage[key].length + key.length) * 2;
        }
      }
      let usedKB = total / 1024;
      let limitKB = 5120; // 5MB in KB
      let usedPercent = (usedKB / limitKB) * 100;
      setUsedPercentage(usedPercent.toFixed(2));
    };

    calculateStorageUsage();
    // Optionally update every minute
    const interval = setInterval(calculateStorageUsage, 60000);
    return () => clearInterval(interval);
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
    setUsedPercentage(0);
  };

  return (
    <div style={styles.container}>
      <div style={{ ...styles.circle, background: 'linear-gradient(135deg, #004d99, #001f4d)' }}>
        <div style={styles.text}>{usedPercentage}%</div>
      </div>
      <button style={styles.button} onClick={clearLocalStorage}>
        <GiBroom size={15}/>
      </button>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: '9999',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  circle: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundClip: 'border-box',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '1px 2px 5px black',
    marginBottom: '10px',
  },
  text: {
    position: 'absolute',
    zIndex: 1,
  },
  button: {
    padding: '5px 10px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#ffffff',
    background: '#ed3e3e',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default StorageMonitor;
