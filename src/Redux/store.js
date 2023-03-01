
import QuestionReducer from"./questionSlice"

import{configureStore} from "@reduxjs/toolkit"
const store=configureStore({reducer:{
questions:QuestionReducer
}
})






export default store;