import React from 'react'
import {TodoForm} from 'components/todo-form'
import {TodoItem} from 'components/todo-item'
import {useTodos} from 'hooks/use-todos'

function App() {
  const {todos, add, update, remove, isLoading, updating} = useTodos()

  if (isLoading) {
    return <div>loading..</div>
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
        <TodoForm handleAddTodo={add} />
      </div>
      <div className="mt-4">
        {todos?.map(todo => {
          return (
            <TodoItem
              key={todo.ref['@ref'].id}
              todo={todo}
              handleUpdateTodo={update}
              handleDeleteTodo={remove}
              updating={updating}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
