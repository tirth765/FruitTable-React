import React, { useReducer } from 'react'
import { decrement, increment } from '../../redux/action/counter.action';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Counter(dispatch) {

  const handleIncrement = () => {
    dispatch(increment());
  }

  const handleDecrement = () => {
    dispatch(decrement());
  }

  const c = useSelector ((state => state.count))
  console.log(c);
  
  
  // const [state, dispatch] = useReducer(handleCounter, initializState);


  return (
    <>

    {/* <div>Count: {state.coun}</div> */}
    
    <div>Counter:</div>
    <Button onclick={handleIncrement}>+</Button>
    <span>{c.count}</span>
    <Button onclick={handleDecrement}>-</Button>

    </>
  )
}
