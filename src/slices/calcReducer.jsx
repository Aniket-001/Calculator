import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const prev = localStorage.getItem("theme") || "light";
const chk = localStorage.getItem("check") || "false";


const calculation = (val1,val2,op='+') =>{
    let ans;
    op = (op.length==0)?'+':op;
    if(op=='+') ans = val1+val2; 
    else if(op=='-') ans = val2-val1;
    else if(op=='*') ans = val1*val2;
    else if(op==String.fromCharCode(247)) ans = val2/val1;
    return ans;
} 

const verify =(ans)=>{
    if(isNaN(ans) ){
        toast("Invalid Operation!!");
        return false;
    }
    else if(!isFinite(ans)){
        toast("Maximum limit Exceed!!");
        return false;
    }
    return true;

}

const calcReducer = createSlice({
    name:'calc',
    initialState:{num:"",check:chk,theme:prev},
    reducers :{
        setNumber(state,{payload}){
            if(state.num.length==0) state.num =  payload.data;
            else{//9 -9- 9- -9-
                let str1 = payload.data;
                let str2 = state.num;
                let op1 = str1[str1.length-1];
                let op2 = str2[str2.length-1];
                op2 = (op2=='-' || op2=='+' || op2=='*' || op2==String.fromCharCode(247) )?op2:"";
                str2 = (op2.length==0)?str2:str2.substring(0, str1.length - 1);
                str1 = str1.substring(0, str1.length - 1);
                let val1 = +str1;
                let val2 = +str2;
                let ans = calculation(val1,val2,op2);
                if(!verify(ans)) state.num = "";
                else state.num = ans+""+op1;
            }
        },
        evaluate(state,action){
            if(state.num.length==0 || state.num=='0') state.num =  action.payload.data;
            else{
                let str1 = action.payload.data;
                let str2 = state.num;
                if(!isNaN(str1)){
                    if(!isNaN(str2)) {
                        const ans = (+str1) + (+str2);
                        if(!verify(ans)) state.num = "";
                        else state.num = ans+"";
                    }
                    else{
                        let op = str2[str2.length-1];
                        const ans = calculation((+str1),(+(str2.substring(0, str2.length - 1))),op);
                        if(!verify(ans)) state.num = "";
                        else state.num = ans+"";
                    }
                }
                else{
                    let op1 = str2[str2.length-1];
                    str2 = str2.substring(0, str2.length - 1);
                    let val1 = +str1;
                    let val2 = +str2;
                    let ans = calculation(val1,val2,op1);
                    if(!verify(ans)) state.num = "";
                    else state.num = ans+"";
                }
            }
        },
        allClearOperation(state){
            state.num = "";
        },
        setTheme(state,{payload}){
            state.theme = payload.theme;
            state.check = payload.check;
            localStorage.setItem("theme",state.theme);
            localStorage.setItem("check",state.check);
        }
    }
})

export const { evaluate , setNumber , allClearOperation ,setTheme } = calcReducer.actions;

export default calcReducer.reducer;

