import React from 'react'
import { decrement, increment } from '../../redux/action/counter.action';
import { Button } from '@mui/material';

export default function Counter() {

  const handleIncrement = () => {
    increment();
  }

  const handleDecrement = () => {
    decrement();
  }

  return (
    <>

    <div>Counter</div>

    <Button onclick={handleIncrement}>+</Button>
    <span>0</span>
    <Button onclick={handleDecrement}>-</Button>

    </>
  )
}
