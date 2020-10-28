import React from 'react'
import {v4 as uuidv4} from 'uuid'
import clsx from 'clsx'
import {TodoForm} from 'components/todo-form'
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
  console.log('App')
  const [todos, setTodos] = React.useState(data)
  const [editTodo, setEditTodo] = React.useState(null)

  function addNewTodo(todo) {
    setTodos([...todos, {id: uuidv4(), text: todo, isCompleted: false}])
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
        <TodoForm saveTodo={addNewTodo} />
      </div>
      <div className="mt-4">
        {todos.map((todo, i) => {
          return (
            <div
              key={todo.id}
              className={clsx('p-4 border', {
                'bg-gray-200': todo.id === editTodo?.id,
              })}
            >
              {todo?.id === editTodo?.id ? (
                <form
                  className="flex items-center justify-between"
                  onSubmit={e => {
                    e.preventDefault()
                    handleUpdateTodo({
                      ...editTodo,
                      text: e.target.elements[0].value,
                    })
                    setEditTodo(null)
                  }}
                >
                  <input
                    className="border w-5/6 px-4"
                    type="text"
                    defaultValue={editTodo.text}
                  />
                  <div className="flex">
                    <div>
                      <button type="submit">
                        <img src={SaveIcon} className="h-4" alt="Save Todo" />
                      </button>
                    </div>
                    <div className="ml-4">
                      <button
                        className="focus:outline-none"
                        onClick={e => {
                          e.preventDefault()
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
                </form>
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
