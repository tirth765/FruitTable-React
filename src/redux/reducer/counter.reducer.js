import { COUNT_DECREMENT, COUNT_INCREMENT } from "../ActionTypes";

const initializState = {
    count:0
}

export const handleCounter = (state = initializState, action) => {
    console.log(action);

    switch (action.type) {
        case COUNT_INCREMENT :
            return {
                count: state.count + 1
            }
        case COUNT_DECREMENT : 
        return {
            count: state.count - 1
        }

        default: 
            return state
    }
    
}