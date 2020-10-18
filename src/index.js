import React from 'react'
import ReactDOM from 'react-dom'
import './tailwind.generated.css'

const App = () => (
  <div className="max-w-md mx-auto flex flex-col p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
    <div className="pt-1">
      <h1 className="text-2xl text-blue-900 leading-tight font-bold">
        🚀 todos
      </h1>
    </div>
    <div className="mt-8">
      <div className="w-full md:w-1/2 mb-6 md:mb-0 flex">
        <input
          className="appearance-none inline-block  w-full bg-gray-200 text-gray-700 border border-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          type="text"
          placeholder="What needs to be done?"
        />
        <div className="inline-block my-auto ml-4">
          <button className="focus:outline-none">
            <svg
              className="h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
)

ReactDOM.render(<App />, document.querySelector('#root'))
