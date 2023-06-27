import { useCallback, useEffect } from 'react'

interface keyAction {
  keyCode: string
  callback: VoidFunction
}

const useKeyboardPress = (actions: keyAction[], isFocused: boolean) => {
  const actionHandler = useCallback(
    (event: KeyboardEvent) => {
      actions.forEach((action) => {
        if (event.code === action.keyCode) {
          action.callback()
        }
      })
    },
    [actions]
  )

  useEffect(() => {
    document.addEventListener('keydown', actionHandler, false)

    return () => {
      document.removeEventListener('keydown', actionHandler, false)
    }
  }, [isFocused, actionHandler])
}

export default useKeyboardPress
