import React, { useEffect, useRef, useState } from 'react'
import "../styles/calculator.scss"
import Button from '@mui/material/Button';
import { useSelector , useDispatch } from 'react-redux';
import { allClearOperation, evaluate, setNumber } from '../slices/calcReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';


function isNumeric(str) {
  return !isNaN(parseFloat(str)) && isFinite(str);
}


const Calculator = () => {
  
  const val1 = useSelector((state)=>state.num);
  const theme = useSelector((state)=>state.theme);
  const [screen,setScreen] = useState("0");
  const dispatch = useDispatch();
  const inputRef = useRef();


  useEffect(() => {
    inputRef.current.focus();
    setScreen("0");
  },[val1]);
  
  const notify=(txt) =>{ toast(txt)};
 
  const setValue = (e)=>{
    const content = e.target.innerText;
    if(screen==='0'){
      if(content!='-'){
        notify("Invalid Operation!");
        return;
      }
      else setScreen("-");
    } 
    else if(screen==='-' ) notify("Invalid Operation!");
    else{
      const str = screen+content;
      dispatch(setNumber({data:str}));    
    }
  }

  const typeNumber =(e)=>{
    const str = (screen==='0'?"":screen)+e.target.innerText;
    setScreen(str);
    inputRef.current.focus();
  }



  return (

    <div className='box'>
      <div className="calc">
        <div className="screen">
          <div className="screen1">{val1}</div>
          <input ref={inputRef} type="text" autoFocus 
          onChange={(e)=>{
            if(e.target.value==="") setScreen("0");
            else if(Number.isNaN(Number(e.target.value)) ){
              notify("Invalid Operation!");
              setScreen("0");
            }
            else setScreen(""+parseInt(e.target.value,10));
          }}
          value={screen} />
        </div>
      
        <Button className='ac' 
        onClick={()=>{
          dispatch(allClearOperation());
          setScreen("0");
          notify("All clear👍");
        }}>AC</Button>
       
          
        <Button 
        onClick={()=>{
          const str = screen.slice(0,-1);
          if(str.length==0) setScreen("0");
          else setScreen(str);
        }}>DEL</Button>

        <Button onClick={setValue}>&#247;</Button>

        <Button onClick={typeNumber}>1</Button>

        <Button onClick={typeNumber}>2</Button>

        <Button onClick={typeNumber}>3</Button>

        <Button onClick={setValue}>*</Button>

        <Button onClick={typeNumber}>4</Button>

        <Button onClick={typeNumber}>5</Button>

        <Button onClick={typeNumber}>6</Button>

        <Button onClick={setValue}>+</Button>

        <Button onClick={typeNumber}>7</Button>

        <Button onClick={typeNumber}>8</Button>

        <Button onClick={typeNumber}>9</Button>

        <Button onClick={setValue}>-</Button>

        <Button 
        onClick={()=>{
          if(!screen.includes('.')){
            let str = screen+".";
            setScreen(str);
          }
          else notify("Invalid Operation!");
        }}>.</Button>

        <Button onClick={typeNumber}>0</Button>

        <Button 
        onClick={()=>{
          if(screen=='-') notify("Invalid Operation!");
          else if(screen==='0') notify("change the operand to other number🙂")
          else dispatch(evaluate({data:screen})); 
        }}>=</Button>
        
      </div>
      <ToastContainer
        containerId="toast"
        position="top-left"
        autoClose={1000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme={theme}
      />
    </div>
  )
}



export default Calculator;


/* featuer

overflow handle
divide by 0
keyboard number
notification toast
toggle theme
history

9- = -9
-9 = 9
-9 = 9-
*/