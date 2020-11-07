import React from 'react'
import {useAsync} from 'hooks/use-async'
import {client} from 'utils/api-client'

function useTodos() {
  const {data: todos, run, isLoading} = useAsync()

  const refetch = React.useCallback(
    () =>
      run(
        client(`read-todos`).then(data => {
          return data.todos
        }),
      ),
    [run],
  )

  React.useEffect(() => {
    refetch()
  }, [refetch])

  function add(todoText) {
    return client(`create-todo`, {data: {text: todoText}}).then(refetch)
  }

  function remove(todo) {
    return client(`delete-todo?id=${todo.ref['@ref'].id}`, {
      method: 'DELETE',
    }).then(refetch)
  }

  function update(todo) {
    return client(`update-todo?id=${todo.ref['@ref'].id}`, {
      data: {...todo.data},
      method: 'PUT',
    }).then(refetch)
  }

  return {
    todos,
    isLoading,
    add,
    update,
    remove,
  }
}

export {useTodos}
