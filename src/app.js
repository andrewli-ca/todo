import React from 'react'
import {v4 as uuidv4} from 'uuid'
import clsx from 'clsx'
import AddIcon from 'assets/add-solid.svg'
import CheckMarkIcon from 'assets/checkmark.svg'
import EditIcon from 'assets/edit-pencil.svg'
import DeleteIcon from 'assets/trash.svg'
import SaveIcon from 'assets/save-disk.svg'
import CloseIcon from 'assets/close.svg'

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
  const [editTodo, setEditTodo] = React.useState(null)
  const input = React.useRef(null)

  function handleAddTodo() {
    if (input.current.value === '') {
      return
    }

    setTodos([
      ...todos,
      {id: uuidv4(), text: input.current.value, isCompleted: false},
    ])
    input.current.value = ''
  }

  function handleDeleteTodo(todo) {
    const newTodos = todos.filter(t => t.id !== todo.id)
    setTodos(newTodos)
  }

  function handleUpdateTodo(todo) {
    const newTodos = todos.map(t => {
      if (t.id === todo.id) {
        return todo
      }
      return t
    })
    setTodos(newTodos)
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
        <div className="w-full mb-6 md:mb-0 flex">
          <input
            className="appearance-none inline-block w-full bg-gray-200 text-gray-700 border border-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="What needs to be done?"
            ref={input}
          />
          <div className="inline-block my-auto ml-4">
            <button
              className="focus:outline-none"
              onClick={() => handleAddTodo()}
            >
              <img src={AddIcon} className="h-6" alt="Add New Todo" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {todos.map((todo, i) => {
          return (
            <div className="p-4 border" key={todo.id}>
              {todo?.id === editTodo?.id ? (
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={editTodo.text}
                    onChange={e => {
                      setEditTodo({...todo, text: e.target.value})
                    }}
                  />
                  <div className="flex">
                    <div>
                      <button
                        className="focus:outline-none"
                        onClick={() => {
                          handleUpdateTodo(editTodo)
                          setEditTodo(null)
                        }}
                      >
                        <img src={SaveIcon} className="h-4" alt="Save Todo" />
                      </button>
                    </div>
                    <div className="ml-4">
                      <button
                        className="focus:outline-none"
                        onClick={() => {
                          setEditTodo(null)
                        }}
                      >
                        <img
                          src={CloseIcon}
                          className="h-4"
                          alt="Close Edit Mode"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <div className="inline-block">
                      <button
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent focus:outline-none rounded-full h-6 w-6 flex items-center justify-center"
                        onClick={() => {
                          handleUpdateTodo({
                            ...todo,
                            isCompleted: !todo.isCompleted,
                          })
                        }}
                      >
                        {todo.isCompleted ? (
                          <img
                            src={CheckMarkIcon}
                            className="h-3"
                            alt="Mark as Completed"
                          />
                        ) : null}
                      </button>
                    </div>
                    <div
                      className={clsx('inline-block ml-4 my-auto', {
                        'line-through': todo.isCompleted,
                      })}
                    >
                      {todo.text}
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <button
                        className="focus:outline-none"
                        onClick={() => {
                          setEditTodo(todo)
                        }}
                      >
                        <img src={EditIcon} className="h-4" alt="Edit Todo" />
                      </button>
                    </div>
                    <div className="ml-4">
                      <button
                        className="focus:outline-none"
                        onClick={() => {
                          handleDeleteTodo(todo)
                        }}
                      >
                        <img
                          src={DeleteIcon}
                          className="h-4"
                          alt="Delete Todo"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
