"use client"

import { useSelector, useDispatch} from "react-redux"
import type { RootState, AppDispatch } from "@/store/store"
import { increment, decrement, incrementByAmount } from "@/store/features/counterSlice"

export default function Counter() {
  const count  = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">Counter: {count}</h1>
      <div className="flex gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => dispatch(increment())}>Increment</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => dispatch(decrement())}>Decrement</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
      </div>
    </div>
  )
}