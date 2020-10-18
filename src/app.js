import React from 'react'
import {ReactComponent as AddIcon} from 'assets/add-solid.svg'
import {ReactComponent as CheckMarkIcon} from 'assets/checkmark.svg'

const data = [
  {
    id: 1,
    text: 'test todo 1',
  },
  {
    id: 2,
    text: 'another todo',
  },
  {
    id: 3,
    text: 'and another one',
  },
]

function App() {
  const [todos, setTodos] = React.useState(data)

  return (
    <div className="max-w-md mx-auto flex flex-col p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
      <div className="pt-1">
        <h1 className="text-2xl text-blue-900 leading-tight font-bold">
          <span role="img" aria-label="rocket">
            🚀
          </span>
          todos
        </h1>
      </div>
      <div className="mt-8">
        <div className="w-full mb-6 md:mb-0 flex">
          <input
            className="appearance-none inline-block  w-full bg-gray-200 text-gray-700 border border-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="What needs to be done?"
          />
          <div className="inline-block my-auto ml-4">
            <button
              className="focus:outline-none"
              onClick={() => {
                setTodos([
                  ...todos,
                  {id: todos.length + 1, text: `todo #${todos.length + 1}`},
                ])
              }}
            >
              <AddIcon className="h-6" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {todos.map(todo => {
          return (
            <li className="list-none p-4 border" key={todo.id}>
              <div className="flex items-center">
                <div className="inline-block">
                  <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent focus:outline-none rounded-full h-6 w-6 flex items-center justify-center">
                    <CheckMarkIcon className="h-3" />
                  </button>
                </div>
                <div className="inline-block ml-4 my-auto">{todo.text}</div>
              </div>
            </li>
          )
        })}
      </div>
    </div>
  )
}

export default App
