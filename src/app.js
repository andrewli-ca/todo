import React from 'react'
import {TodoForm} from 'components/todo-form'
import {TodoItem} from 'components/todo-item'
import {useAsync} from 'hooks/use-async'
import {client} from 'utils/api-client'

function App() {
  const {data: todos, run, isLoading, setData} = useAsync()

  React.useEffect(() => {
    run(client(`read-todos`).then(data => data.todos))
  }, [run])

  function handleAddTodo(todoText) {
    client(`create-todo`, {data: {text: todoText}}).then(data =>
      setData([...todos, data]),
    )
  }

  function handleDeleteTodo(todo) {
    const {id} = todo.ref['@ref']
    client(`delete-todo?id=${id}`, {method: 'DELETE'}).then(data => {
      const todosAfterDelete = todos.filter(t => t.ref['@ref'].id !== id)
      setData(todosAfterDelete)
    })
  }

  function handleUpdateTodo(todoForUpdate) {
    const {id} = todoForUpdate.ref['@ref']

    client(`update-todo?id=${id}`, {
      data: {...todoForUpdate.data},
      method: 'PUT',
    }).then(data => {
      const todosAfterUpdate = todos.map(todo => {
        if (id === todo.ref['@ref'].id) {
          return todoForUpdate
        }
        return todo
      })
      setData(todosAfterUpdate)
    })
  }

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
        <TodoForm handleAddTodo={handleAddTodo} />
      </div>
      <div className="mt-4">
        {todos?.map(todo => {
          return (
            <TodoItem
              key={todo.ref['@ref'].id}
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
