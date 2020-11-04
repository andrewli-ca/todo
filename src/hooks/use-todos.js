import React from 'react'
import {useAsync} from 'hooks/use-async'
import {client} from 'utils/api-client'

function useTodos() {
  const {
    data: todos,
    error,
    run,
    isLoading,
    isError,
    setData,
    setError,
  } = useAsync()

  React.useEffect(() => {
    run(client(`read-todos`).then(data => data.todos))
  }, [run])

  function add(todoText) {
    client(`create-todo`, {data: {text: todoText}}).then(data =>
      setData([...todos, data]),
    )
  }

  function remove(todo) {
    client(`delete-todo?id=${todo.ref['@ref'].id}`, {method: 'DELETE'})
      .then(data => {
        const todosAfterDelete = todos.filter(
          t => t.ref['@ref'].id !== data.ref['@ref'].id,
        )
        setData(todosAfterDelete)
      })
      .catch(e => setError(e))
  }

  function update(todoForUpdate) {
    client(`update-todo?id=${todoForUpdate.ref['@ref'].id}`, {
      data: {...todoForUpdate.data},
      method: 'PUT',
    }).then(data => {
      const todosAfterUpdate = todos.map(todo => {
        if (todo.ref['@ref'].id === data.ref['@ref'].id) {
          return todoForUpdate
        }
        return todo
      })
      setData(todosAfterUpdate)
    })
  }

  return {todos, error, add, update, remove, isLoading, isError}
}

export {useTodos}
