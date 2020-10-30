import React from 'react'
import AddIcon from 'assets/add-solid.svg'

function TodoForm({handleAddTodo}) {
  const input = React.useRef(null)

  function handleSubmit(event) {
    event.preventDefault()
    const {newTodo} = event.target.elements

    if (newTodo.value === '') {
      return
    }

    handleAddTodo(newTodo.value)
    input.current.value = ''
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 md:mb-0 flex">
      <div className="inline-block w-full">
        <input
          id="newTodo"
          className="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          placeholder="What needs to be done?"
          ref={input}
        />
      </div>
      <div className="inline-block my-auto ml-4">
        <button type="submit" className="focus:outline-none">
          <img src={AddIcon} className="h-6" alt="Add New Todo" />
        </button>
      </div>
    </form>
  )
}

export {TodoForm}
