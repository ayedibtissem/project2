import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from"axios"

 export const getAllQuestions=createAsyncThunk("question/getAll",async()=>{
try {
  
const {data}=await axios.get("http://localhost:5004/question")
return data

} catch (error) {
  console.log(error)
}




})






const questionSlice=createSlice({name:"question",initialState:{

},extraReducers:{

  [getAllQuestions.pending]:(state,action)=>{state.loading=true},

[getAllQuestions.fulfilled]:(state,action)=>{state.questionList=action?.payload;

state.loading=false;
state.appErr=undefined;
state.serverErr=undefined;
},
[getAllQuestions.rejected]:(state,action)=>{state.loading=false;
  state.appErr=action?.payload?.message;
state.serverErr=action?.error?.message;
},




}});

export default questionSlice.reducer;

