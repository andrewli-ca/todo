import React from 'react'
import {v4 as uuidv4} from 'uuid'
import {TodoForm} from 'components/todo-form'
import {TodoItem} from 'components/todo-item'

const data = [
  {
    id: uuidv4(),
    text: 'test todo 1',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    text: 'another todo',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    text: 'and another one',
    isCompleted: true,
  },
]

function App() {
  const [todos, setTodos] = React.useState(data)

  function handleAddTodo(todo) {
    setTodos([...todos, {id: uuidv4(), text: todo, isCompleted: false}])
  }

  function handleDeleteTodo(todo) {
    const todosAfterDelete = todos.filter(t => t.id !== todo.id)
    setTodos(todosAfterDelete)
  }

  function handleUpdateTodo(todoForUpdate) {
    const todosAfterUpdate = todos.map(todo => {
      if (todo.id === todoForUpdate.id) {
        return todoForUpdate
      }
      return todo
    })
    setTodos(todosAfterUpdate)
  }

  return (
    <div className="max-w-md mx-auto flex flex-col p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
      <div className="pt-1">
        <h1 className="text-2xl text-blue-900 leading-tight font-bold">
          <span role="img" aria-label="rocket" className="mr-2">
            🚀
          </span>
          todos
        </h1>
      </div>
      <div className="mt-8">
        <TodoForm handleAddTodo={handleAddTodo} />
      </div>
      <div className="mt-4">
        {todos.map(todo => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleUpdateTodo={handleUpdateTodo}
              handleDeleteTodo={handleDeleteTodo}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
