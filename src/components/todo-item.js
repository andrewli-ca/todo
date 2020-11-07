import React from 'react'
import clsx from 'clsx'
import {useAsync} from 'hooks/use-async'
import {IconButton, AsyncButton} from 'components/lib'
import CheckMarkIcon from 'assets/checkmark.svg'
import EditIcon from 'assets/edit-pencil.svg'
import DeleteIcon from 'assets/trash.svg'
import SaveIcon from 'assets/save-disk.svg'
import CloseIcon from 'assets/close.svg'

function EditItem({editTodo, handleUpdateTodo, setEditTodo}) {
  const {isLoading, run} = useAsync()
  const inputRef = React.useRef(null)

  function handeleSubmit(event) {
    event.preventDefault()
    run(
      handleUpdateTodo({
        ...editTodo,
        data: {
          ...editTodo.data,
          text: event.target.elements[0].value,
        },
      }),
    ).then(() => setEditTodo(null))
  }

  return (
    <form
      className="flex items-center justify-between"
      onSubmit={handeleSubmit}
    >
      <input
        ref={inputRef}
        className="border w-5/6 px-4"
        type="text"
        defaultValue={editTodo.data.text}
      />
      <div className="flex">
        <div>
          <AsyncButton
            type="submit"
            icon={SaveIcon}
            isSubmitLoading={isLoading}
          />
        </div>
        <div className="ml-4">
          {/* Exit out of edit mode */}
          <IconButton
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
          {/* Toggle complete todo button */}
          <AsyncButton
            onClick={() =>
              handleUpdateTodo({
                ...todo,
                data: {
                  ...todo.data,
                  isCompleted: !todo.data.isCompleted,
                },
              })
            }
            icon={todo.data.isCompleted ? CheckMarkIcon : null}
            className="bg-transparent text-blue-700 font-semibold hover:text-white border border-blue-500 focus:outline-none rounded-full h-6 w-6 flex items-center justify-center"
          />
        </div>
        <div
          className={clsx('inline-block ml-4 my-auto', {
            'line-through': todo.data.isCompleted,
          })}
        >
          {todo.data.text}
        </div>
      </div>
      <div className="flex">
        <div>
          {/* Set todo to be edited */}
          <IconButton
            onClick={() => {
              setEditTodo(todo)
            }}
            icon={EditIcon}
          />
        </div>
        <div className="ml-4">
          <AsyncButton
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
  const {id} = todo.ref['@ref']
  const {id: editTodoId} = editTodo?.ref['@ref'] || ''

  return (
    <div
      className={clsx('p-4 border', {
        'bg-gray-200': id === editTodoId,
      })}
    >
      {/* Show todo item in view mode or edit mode */}
      {id === editTodoId ? (
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

export {TodoItem}
