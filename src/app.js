import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {TodoForm} from 'components/todo-form'
import {TodoItem} from 'components/todo-item'
import {useTodos} from 'hooks/use-todos'

function ErrorFallback({error}) {
  return (
    <div>
      There was an error: <pre>{error.message}</pre>
    </div>
  )
}

function App() {
  const {todos, error, add, update, remove, isLoading, isError} = useTodos()

  if (isLoading) {
    return <div>loading..</div>
  }

  if (isError) {
    throw error
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
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="mt-4">
          {todos?.map(todo => {
            return (
              <TodoItem
                key={todo.ref['@ref'].id}
                todo={todo}
                handleUpdateTodo={update}
                handleDeleteTodo={remove}
              />
            )
          })}
        </div>
      </ErrorBoundary>
    </div>
  )
}

export default App
