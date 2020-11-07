import React from 'react'
import {useAsync} from 'hooks/use-async'
import {AsyncButton} from 'components/lib'
import AddIcon from 'assets/add-solid.svg'

function TodoForm({handleAddTodo}) {
  const {isLoading, run} = useAsync()
  const input = React.useRef(null)

  function handleSubmit(event) {
    event.preventDefault()

    const {newTodo} = event.target.elements

    if (newTodo.value === '') {
      return
    }

    run(handleAddTodo(newTodo.value)).then(() => (input.current.value = ''))
  }

  return (
    <form className="mb-6 md:mb-0 flex" onSubmit={handleSubmit}>
      <div className="inline-block w-full">
        <input
          id="newTodo"
          className="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          placeholder="What needs to be done?"
          ref={input}
        />
      </div>
      <div className="inline-block my-auto ml-4">
        <AsyncButton type="submit" icon={AddIcon} isSubmitLoading={isLoading} />
      </div>
    </form>
  )
}

export {TodoForm}
