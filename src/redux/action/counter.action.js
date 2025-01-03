import { COUNT_DECREMENT, COUNT_INCREMENT } from "../ActionTypes"

export const increment = () => (dispatch) => {
    console.log("fff");
    
    dispatch({type: COUNT_INCREMENT})
} 

export const decrement = () => (dispatch) => {
    console.log("fff");
    dispatch({type: COUNT_DECREMENT})
}   