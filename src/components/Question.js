
import React from "react";


function Question({question}) {
 
  
  
  return (
    <div>

  <p>{question.title}</p>
  <p>{question.text}</p>

  <div id="options">
  {question.options.map((option, index) => (
    <div key={index}>
      <input type="radio" id={`option${index}`} name="options" value={option} />
      <label htmlFor={`option${index}`}>{option}</label>
    </div>
  ))}
</div>



      
 


    </div>
  );
}

export default Question;