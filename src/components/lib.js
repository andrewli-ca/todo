import React from 'react'
import {useAsync} from 'hooks/use-async'
import SpinnerIcon from 'assets/spinner.svg'

function Spinner() {
  return (
    <img
      src={SpinnerIcon}
      className="h-4 text-black spinner"
      alt="Loading spinner"
    />
  )
}

function IconButton({onClick, icon, ...rest}) {
  return (
    <button
      type="button"
      className="focus:outline-none"
      // if button type is submit, there is no onclick handler passed into props
      onClick={() => (onClick ? onClick() : () => {})}
      {...rest}
    >
      {icon ? <img src={icon} className="h-4" alt="lable" /> : null}
    </button>
  )
}

function AsyncButton({type, onClick, icon, isSubmitLoading, ...rest}) {
  const {isLoading, isError, run, reset} = useAsync()

  function handleClick() {
    if (isError) {
      reset()
    } else {
      run(onClick())
    }
  }

  return (
    <button
      type={type ? type : 'button'}
      className="focus:outline-none"
      onClick={onClick && handleClick}
      {...rest}
    >
      {isLoading || isSubmitLoading ? (
        <Spinner />
      ) : icon ? (
        <img src={icon} className="h-4" alt="icon" />
      ) : null}
    </button>
  )
}

export {Spinner, IconButton, AsyncButton}
