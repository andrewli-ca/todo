import React from 'react'
import {useAsync} from 'hooks/use-async'
import {client} from 'utils/api-client'

function useTodos() {
  const [updating, setUpdating] = React.useState({status: 'idle'})
  const {data: todos, run, isLoading, setData} = useAsync()

  React.useEffect(() => {
    run(client(`read-todos`).then(data => data.todos))
  }, [run])

  function add(todoText) {
    client(`create-todo`, {data: {text: todoText}}).then(data =>
      setData([...todos, data]),
    )
  }

  function remove(todo) {
    setUpdating({status: 'pending', todo})
    client(`delete-todo?id=${todo.ref['@ref'].id}`, {method: 'DELETE'}).then(
      data => {
        const todosAfterDelete = todos.filter(
          t => t.ref['@ref'].id !== data.ref['@ref'].id,
        )
        setData(todosAfterDelete)
        setUpdating({status: 'resolved'})
      },
    )
  }

  function update(todoForUpdate, callback) {
    console.log(todoForUpdate)
    setUpdating({status: 'pending', todo: todoForUpdate})

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
      setUpdating({status: 'resolved'})
      callback()
    })
  }

  return {todos, isLoading, add, update, remove, updating}
}

export {useTodos}
