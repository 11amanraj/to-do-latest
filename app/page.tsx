'use client'

import { useState } from "react";

interface todo {
  id: string,
  text: string,
  completed: boolean,
}

export default function Home() {
  const [todos, setTodos] = useState<todo[]>([
    {
      id: Math.random().toString(),
      text: 'First Todo',
      completed: false
    },
    {
      id: Math.random().toString(),
      text: 'Second Todo',
      completed: true
    },
    {
      id: Math.random().toString(),
      text: 'Third Todo',
      completed: false
    }
  ])

  const addTodoHandler = () => {}
  const completeTodoHandler = () => {}
  const deleteTodoHandler = () => {}

  return (
    <div>
      <ul>
        {todos.map(todo => {
          return (
            <li key={todo.id}>{todo.text}</li>
          )
        })}
      </ul>
    </div>
  );
}
