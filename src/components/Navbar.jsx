import React, { useContext, useEffect } from 'react'
import "../styles/navbar.scss"
import Clock from '../components/Clock';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../slices/calcReducer';


const Navbar = () => {
  const theme = useSelector((state)=>state.theme);
  const check = useSelector((state)=>state.check);
  const dispatch =  useDispatch();

  return (
    <div className='navbar'>
        <Clock />
        <Switch
          checked={check=="false"?false:true}
          onChange={()=>{(theme=="light"?dispatch(setTheme({theme:"dark",check:"true"})):dispatch(setTheme({theme:"light",check:"false"})))}}
        />
    </div>
  )
}

export default Navbar
