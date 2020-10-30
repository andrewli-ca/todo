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

function ToggleCompleteButton({todo, toggleComplete}) {
  return (
    <button
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent focus:outline-none rounded-full h-6 w-6 flex items-center justify-center"
      onClick={() => {
        toggleComplete(todo)
      }}
    >
      {todo.isCompleted ? (
        <img src={CheckMarkIcon} className="h-3" alt="Mark as Completed" />
      ) : null}
    </button>
  )
}

function ActionButton({onClick, icon, ...rest}) {
  return (
    <button
      type="button"
      className="focus:outline-none"
      // if button type is submit, there is no onclick handler passed into props
      onClick={() => (onClick ? onClick() : () => {})}
      {...rest}
    >
      <img src={icon} className="h-4" alt="lable" />
    </button>
  )
}

function EditItem({editTodo, handleUpdateTodo, setEditTodo}) {
  return (
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
          <ActionButton type="submit" icon={SaveIcon} />
        </div>
        <div className="ml-4">
          {/* Exit out of edit mode */}
          <ActionButton
            onClick={e => {
              setEditTodo(null)
            }}
            icon={CloseIcon}
          />
        </div>
      </div>
    </form>
  )
}

function ViewItem({todo, handleUpdateTodo, handleDeleteTodo, setEditTodo}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex">
        <div className="inline-block">
          <ToggleCompleteButton
            todo={todo}
            toggleComplete={() =>
              handleUpdateTodo({
                ...todo,
                isCompleted: !todo.isCompleted,
              })
            }
          />
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
          {/* Set todo to be edited */}
          <ActionButton onClick={() => setEditTodo(todo)} icon={EditIcon} />
        </div>
        <div className="ml-4">
          <ActionButton
            onClick={() => handleDeleteTodo(todo)}
            icon={DeleteIcon}
          />
        </div>
      </div>
    </div>
  )
}

function TodoItem({todo, handleUpdateTodo, handleDeleteTodo}) {
  const [editTodo, setEditTodo] = React.useState(null)

  return (
    <div
      key={todo.id}
      className={clsx('p-4 border', {
        'bg-gray-200': todo.id === editTodo?.id,
      })}
    >
      {/* Show todo item in view mode or edit mode */}
      {todo?.id === editTodo?.id ? (
        <EditItem
          editTodo={editTodo}
          handleUpdateTodo={handleUpdateTodo}
          setEditTodo={setEditTodo}
        ></EditItem>
      ) : (
        <ViewItem
          todo={todo}
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
          setEditTodo={setEditTodo}
        />
      )}
    </div>
  )
}

function App() {
  console.log('App')
  const [todos, setTodos] = React.useState(data)

  function addNewTodo(todo) {
    setTodos([...todos, {id: uuidv4(), text: todo, isCompleted: false}])
  }

  function handleDeleteTodo(todo) {
    const todosAfterDelete = todos.filter(t => t.id !== todo.id)
    setTodos(todosAfterDelete)
  }

  function handleUpdateTodo(todoForUpdate) {
    const todosAfterUpdate = todos.map(todo => {
      if (todo.id === todoForUpdate.id) {
        return todoForUpdate
      }
      return todo
    })
    setTodos(todosAfterUpdate)
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
        {todos.map(todo => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleUpdateTodo={handleUpdateTodo}
              handleDeleteTodo={handleDeleteTodo}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
