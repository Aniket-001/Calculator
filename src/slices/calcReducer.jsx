import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const prev = localStorage.getItem("theme") || "light";
const chk = localStorage.getItem("check") || "false";

//perform the operation
const calculation = (val1,val2,op='+') =>{
    let ans;
    op = (op.length==0)?'+':op;
    if(op=='+') ans = val1+val2; 
    else if(op=='-') ans = val2-val1;
    else if(op=='*') ans = val1*val2;
    else if(op==String.fromCharCode(247)) ans = val2/val1;
    return ans;
} 


// verify the operation
const verify =(ans)=>{
    if(!isFinite(ans)){
        toast("Maximum limit Exceed!!");
        return false;
    }
    else if(isNaN(ans) ){
        toast("Invalid Operation!!");
        return false;
    }
    return true;

}

const calcReducer = createSlice({
    name:'calc',
    initialState:{num:"",check:chk,theme:prev},
    reducers :{
        setNumber(state,{payload}){//when a operator is pressed the value is set to num 
            if(state.num.length==0){ 
                let str =  payload.data;
                let op = str[str.length-1];
                str = str.substring(0,str.length-1);
                str = Number(str);
                if(verify(str)) state.num = ""+str+op;
            }
            else{
                let str1 = payload.data;
                let str2 = state.num;
                let op1 = str1[str1.length-1];
                let op2 = str2[str2.length-1];
                op2 = (op2=='-' || op2=='+' || op2=='*' || op2==String.fromCharCode(247) )?op2:"";
                str2 = (op2.length==0)?str2:str2.substring(0, str2.length - 1);
                str1 = str1.substring(0, str1.length - 1);
                let val1 = +str1;
                let val2 = +str2;
                let ans = calculation(val1,val2,op2);
                if(!verify(ans)) state.num = "";
                else state.num = ans+""+op1;
            }
        },
        evaluate(state,action){//perform when equals to is pressed
            if(state.num.length==0 || state.num=='0'){
                let st = action.payload.data;
                let op = st[st.length-1];
                if(op!='+' || op!='-' || op!='*'|| op!= String.fromCharCode(247)){
                    op = "";
                    st = Number(st);
                }
                else st = st.substring(0,st.length-1);
                state.num = Number(st)+""+op;
            }
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
        // clear all
        allClearOperation(state){
            state.num = "";
        },
        //set your theme
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

