import { createSlice } from "@reduxjs/toolkit";


const prev = localStorage.getItem("theme") || "light";
const chk = localStorage.getItem("check") || "false";


const calculation = (val1,val2,op='+') =>{
    let ans;
    if(op=='+') ans = val1+val2; 
    else if(op=='-') ans = val2-val1;
    else if(op=='*') ans = val1*val2;
    else if(op==String.fromCharCode(247)) ans = val2/val1;
    return ans;
} 

const calcReducer = createSlice({
    name:'calc',
    initialState:{num:"",check:chk,theme:prev},
    reducers :{
        setNumber(state,{payload}){
            if(state.num.length==0) state.num =  payload.data;
            else{
                let str1 = payload.data;
                let str2 = state.num;
                let op1 = str1[str1.length-1];
                let op2 = str2[str2.length-1];
                str1 = str1.substring(0, str1.length - 1);
                str2 = str2.substring(0, str2.length - 1);
                let val1 = +str1;
                let val2 = +str2;
                let ans = calculation(val1,val2,op2);
                state.num = ans+""+op1;
            }
        },
        evaluate(state,action){
            if(state.num.length==0 || state.num=='0') state.num =  action.payload.data;
            else{
                let str1 = action.payload.data;
                let str2 = state.num;
                if(str1[0]=='-' && (str1[str1.length-1]!='-' || str1[str1.length-1]!='+' || str1[str1.length-1]!='*' || str1[str1.length-1]!=String.fromCharCode(247) )){
                    let val1 = +str1;
                    let val2 = +str2;
                    state.num = val1+val2+"";
                }
                else{//9- -9
                    let op1 = str2[str2.length-1];
                    str2 = str2.substring(0, str2.length - 1);
                    let val1 = +str1;
                    let val2 = +str2;
                    let ans = calculation(val1,val2,op1);
                    state.num = ans+"";
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

