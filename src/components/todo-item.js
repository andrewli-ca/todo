import React from 'react'
import clsx from 'clsx'
import CheckMarkIcon from 'assets/checkmark.svg'
import EditIcon from 'assets/edit-pencil.svg'
import DeleteIcon from 'assets/trash.svg'
import SaveIcon from 'assets/save-disk.svg'
import CloseIcon from 'assets/close.svg'

function ActionButton({onClick, icon, updating, ...rest}) {
  return (
    <button
      type="button"
      className="focus:outline-none"
      // if button type is submit, there is no onclick handler passed into props
      onClick={() => (onClick ? onClick() : () => {})}
      {...rest}
    >
      {updating ? (
        <div>loading..</div>
      ) : icon ? (
        <img src={icon} className="h-4" alt="lable" />
      ) : null}
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
          data: {
            ...editTodo.data,
            text: e.target.elements[0].value,
          },
        })
        setEditTodo(null)
      }}
    >
      <input
        className="border w-5/6 px-4"
        type="text"
        defaultValue={editTodo.data.text}
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

function ViewItem({
  todo,
  handleUpdateTodo,
  handleDeleteTodo,
  setEditTodo,
  updating,
}) {
  const [action, setAction] = React.useState('')

  return (
    <div className="flex items-center justify-between">
      <div className="flex">
        <div className="inline-block">
          {/* Toggle complete todo button */}
          <ActionButton
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
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent focus:outline-none rounded-full h-6 w-6 flex items-center justify-center"
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
          <ActionButton
            onClick={() => {
              setAction('edit')
              setEditTodo(todo)
            }}
            icon={EditIcon}
            updating={action === 'edit'}
          />
        </div>
        <div className="ml-4">
          <ActionButton
            onClick={() => {
              setAction('delete')
              handleDeleteTodo(todo)
            }}
            icon={DeleteIcon}
            updating={action === 'delete'}
          />
        </div>
      </div>
    </div>
  )
}

function TodoItem({todo, handleUpdateTodo, handleDeleteTodo, updating}) {
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
          updating={updating}
        />
      )}
    </div>
  )
}

export {TodoItem}
