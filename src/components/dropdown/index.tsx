import { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react'

import { createUseStyles } from 'react-jss'
import useTheme from '../../hooks/useTheme'
import { ThemeType } from '../../theme'

import DropdownItem from './item'
import ChevronIcon from '../../assets/chevron.svg'
import useKeyboardPress from '../../hooks/useKeyboardPress'
import clsx from 'clsx'

interface DropdownProps {
  options: string[]
  value?: string
  onChange: (newValue: string) => void
}

const BOX_HEIGHT = 48
const OPTION_BOX_HEIGHT = 210

const useStyles = createUseStyles((theme: ThemeType) => ({
  root: {
    position: 'relative',
    '&:focus': {
      outline: 'none',
    },
  },
  box: {
    border: '2px solid',
    borderRadius: theme.radius,
    borderColor: theme.colors.generateBlack(0.2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    color: theme.colors.generateBlack(0.8),
    paddingRight: theme.spacing / 2,
    paddingLeft: theme.spacing / 2,
    height: BOX_HEIGHT,
    transition: 'border-color 100ms ease-in',
    backgroundColor: theme.colors.white,
  },
  activeBox: {
    borderColor: theme.colors.primary,
  },
  options: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius,
    border: '1px solid',
    borderColor: theme.colors.generateBlack(0.2),
    padding: theme.spacing / 2,
    position: 'absolute',
    paddingRight: theme.spacing / 2,
    paddingLeft: theme.spacing / 2,
    top: BOX_HEIGHT + theme.spacing / 2,
    left: 0,
    right: 0,
    height: OPTION_BOX_HEIGHT,
    overflowY: 'auto',
  },
  chevron: {
    transition: 'transform 100ms ease-in',
  },
  rotateChevron: {
    transform: 'rotate(180deg)',
  },
}))

const Dropdown: FC<DropdownProps> = (props) => {
  const { options, value, onChange } = props

  const theme = useTheme()
  const classes = useStyles({ theme })

  const element = useRef<HTMLDivElement>(null)
  const optionsContainer = useRef<HTMLDivElement>(null)

  const [isFocused, setIsFocused] = useState(false)
  const [currentItemIndex, setCurrentItemIndex] = useState(
    options.indexOf(value || '')
  )

  useKeyboardPress(
    [
      {
        keyCode: 'ArrowUp',
        callback: () => {
          if (isFocused) {
            setCurrentItemIndex(
              (prev) => (options.length + prev - 1) % options.length
            )
          }
        },
      },
      {
        keyCode: 'ArrowDown',
        callback: () => {
          if (isFocused) {
            setCurrentItemIndex((prev) => (prev + 1) % options.length)
          }
        },
      },
      {
        keyCode: 'Enter',
        callback: () => {
          onChange(options[currentItemIndex])
        },
      },
    ],
    isFocused
  )

  const onBlur = () => {
    setIsFocused(false)
    element.current?.blur()
  }

  const onFocus = () => {
    setIsFocused(true)
    element.current?.focus()
  }

  useEffect(() => {
    if (isFocused) {
      const indexOfValue = options.indexOf(value || '')

      if (indexOfValue !== -1) {
        setCurrentItemIndex(indexOfValue || 0)
      } else {
        setCurrentItemIndex(0)
      }
    }
  }, [isFocused, options, value])

  useEffect(() => {
    if (isFocused) {
      onBlur()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const renderItem = useCallback(
    (option: string, index: number) => {
      const optionIsSelected = value === option
      const optionIsFocused = currentItemIndex === index

      return (
        <DropdownItem
          key={option}
          option={option}
          isFocused={optionIsFocused}
          isSelected={optionIsSelected}
          onSelectOption={onChange}
        />
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, currentItemIndex]
  )

  return (
    <div
      className={classes.root}
      tabIndex={0}
      onBlur={onBlur}
      onFocus={onFocus}
      onClick={onFocus}
      ref={element}
      role="menu"
    >
      <div className={clsx(classes.box, isFocused && classes.activeBox)}>
        <>{value || 'Select an option'}</>

        <img
          alt="chevron"
          className={clsx(classes.chevron, isFocused && classes.rotateChevron)}
          src={ChevronIcon}
        />
      </div>

      {isFocused && (
        <div ref={optionsContainer} className={classes.options}>
          {options.map((option, index) => (
            <Fragment key={option + index}>
              {renderItem(option, index)}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
