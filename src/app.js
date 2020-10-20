import React from 'react'
import AddIcon from 'assets/add-solid.svg'
import CheckMarkIcon from 'assets/checkmark.svg'
import EditIcon from 'assets/edit-pencil.svg'
import DeleteIcon from 'assets/trash.svg'

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
  const input = React.useRef(null)

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
              onClick={() => {
                if (input.current.value === '') {
                  return
                }

                setTodos([
                  ...todos,
                  {id: todos.length + 1, text: input.current.value},
                ])
                input.current.value = ''
              }}
            >
              <img src={AddIcon} className="h-6" alt="Add New Todo" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {todos.map(todo => {
          return (
            <div className="p-4 border" key={todo.id}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-block">
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent focus:outline-none rounded-full h-6 w-6 flex items-center justify-center">
                      <img
                        src={CheckMarkIcon}
                        className="h-3"
                        alt="Mark as Completed"
                      />
                    </button>
                  </div>
                  <div className="inline-block ml-4 my-auto">{todo.text}</div>
                </div>
                <div className="flex">
                  <div>
                    <button className="focus:outline-none">
                      <img src={EditIcon} className="h-4" alt="Edit Todo" />
                    </button>
                  </div>
                  <div className="ml-4">
                    <button className="focus:outline-none">
                      <img src={DeleteIcon} className="h-4" alt="Delete Todo" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
