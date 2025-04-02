'use client'

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface todo {
  id: string,
  text: string,
  completed: boolean,
}

type FilterOptions = "all" | "active" | "completed";

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
  const [isShowing, setIsShowing] = useState<FilterOptions>('all')
  const [filteredTodos, setFilteredTodos] = useState<todo[]>([])

  useEffect(() => {
    let filteredTodos: todo[] = []
    if (isShowing == 'all') {
      filteredTodos = [...todos]
    } else if (isShowing == 'active') {
      const newTodos = todos.filter(todo => !todo.completed)
      filteredTodos = [...newTodos]
    } else {
      const newTodos = todos.filter(todo => todo.completed)
      filteredTodos = [...newTodos]
    }
    setFilteredTodos(filteredTodos);
  }, [isShowing, todos])

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

  const completeTodoHandler = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if(todo.id === id) {
        return {...todo, completed: !todo.completed}
      } else return todo
    })
    setTodos([...updatedTodos])
  }

  const deleteTodoHandler = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos([...updatedTodos])
  }

  return (
    <div className="mx-6">
      <form onSubmit={addTodoHandler}>
        <input ref={inputRef} type="text" placeholder="Create a new todo..."/>
      </form>
      <ul>
        {filteredTodos.map(todo => {
          return (
            <li className="flex gap-3 px-4 py-5 text-3 bg-red-800" key={todo.id}>
              <button className="w-5 h-5 rounded-full bg-green-50 flex justify-center items-center"><Image onClick={() => completeTodoHandler(todo.id)} src="/icon-check.svg" alt="check" width='12' height='12'/></button>
              <p className="flex-1">{todo.text}</p>
              <button><Image onClick={() => deleteTodoHandler(todo.id)} src="/icon-cross.svg" alt="delete" width='12' height='12'/></button>
            </li>
          )
        })}
      </ul>
      <div className="filter">
        <button onClick={() => setIsShowing('all')}>All</button>
        <button onClick={() => setIsShowing('active')}>Active</button>
        <button onClick={() => setIsShowing('completed')}>Completed</button>
      </div>
    </div>
  );
}
