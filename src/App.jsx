import React from 'react'
import "./styles/main.scss";
import "./styles/_colorPallete.scss";
import Navbar from './components/Navbar';
import Calculator from './components/Calculator';
import { useSelector } from 'react-redux';


function App() {
  const theme = useSelector((state)=>state.theme);

  return (
      <div className="main" data-theme={theme}>
        <Navbar />
        <Calculator />
      </div>
  )
}

export default App




