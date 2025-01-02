import { COUNT_DECREMENT, COUNT_INCREMENT } from "../ActionTypes"

export const increment = () => (dispatch) => {
    dispatch({type: COUNT_INCREMENT})
} 

export const decrement = () => (dispatch) => {
    dispatch({type: COUNT_DECREMENT})
}   