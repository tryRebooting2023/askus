import React, { useState, useEffect } from 'react';
import Switch from 'react-switch'; // or your custom switch component

const updateBodyClass = (dark) => {
  document.body.classList.toggle('dark-mode', dark);
};

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    updateBodyClass(isDarkMode);
  }, []);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    localStorage.setItem('darkMode', checked);
    updateBodyClass(checked);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label htmlFor="dark-mode-switch" style={{ marginRight: 8, cursor: 'pointer' }}>
        {darkMode ? 'Dark Mode' : 'Light Mode'}
      </label>
      <Switch
        id="dark-mode-switch"
        checked={darkMode}
        onChange={toggleDarkMode}
      />
    </div>
  );
};

export default DarkModeToggle;
