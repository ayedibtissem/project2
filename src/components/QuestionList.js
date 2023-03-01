import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getAllQuestions } from "../Redux/questionSlice";
import Question from "./Question";

function QuestionList() {
   const dispatch=useDispatch();
   useEffect(()=>{
    dispatch(getAllQuestions())
   },[dispatch])
 const{questionList}=useSelector((state)=>state.questions)

  return (
    <div>
    {questionList?.map((el)=>(<Question question={el} key={el.id}/>))}
    

    </div>
  );
}

export default QuestionList;
