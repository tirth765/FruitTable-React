import React, { useReducer } from 'react'
import { decrement, increment } from '../../redux/action/counter.action';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

export default function Counter() {

  const dispatch = useDispatch()

  const handleIncrement = () => {
    dispatch(increment());
  }

  const handleDecrement = () => {
    dispatch(decrement());
  }

  const c = useSelector ((state => state.count))
  console.log(c);
  
  return (
    <>
    
    <h1>Counter:</h1>
    <Button onClick={handleIncrement}>+</Button>
    <span>{c.count}</span>
    <Button onClick={handleDecrement}>-</Button>

    </>
  )
}
