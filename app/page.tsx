'use client'

import { useState, useRef } from "react";

interface todo {
  id: string,
  text: string,
  completed: boolean,
}

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null)
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

  const addTodoHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(inputRef.current) {
      const todo = inputRef.current.value
      setTodos(prev => [...prev, {
        id: Math.random().toString(),
        text: todo,
        completed: false,
      }])
      inputRef.current.value = '' 
    }
  }

  const completeTodoHandler = () => {}
  const deleteTodoHandler = () => {}

  return (
    <div>
      <form onSubmit={addTodoHandler}>
        <input ref={inputRef} type="text" placeholder="Create a new todo..."/>
      </form>
      <ul>
        {todos.map(todo => {
          return (
            <li className="bg-red-500" key={todo.id}>{todo.text}</li>
          )
        })}
      </ul>
    </div>
  );
}
