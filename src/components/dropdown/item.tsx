import { FC, useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import { ThemeType } from '../../theme'
import useTheme from '../../hooks/useTheme'

import clsx from 'clsx'

import CheckIcon from '../../assets/check.svg'

interface DropdownItemProps {
  option: string
  isSelected: boolean
  isFocused: boolean
  onSelectOption: (selectedOption: string) => void
}

const useStyles = createUseStyles((theme: ThemeType) => ({
  root: {
    padding: theme.spacing,
    paddingTop: theme.spacing / 2,
    paddingBottom: theme.spacing / 2,
    cursor: 'pointer',
    borderRadius: theme.radius,
    display: 'flex',
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: theme.colors.generatePrimary(0.04),
    },
  },
  focused: {
    backgroundColor: theme.colors.generatePrimary(0.1),
    color: theme.colors.primary,
  },
  checkIcon: {
    color: theme.colors.primary,
  },
}))

const DropdownItem: FC<DropdownItemProps> = (props) => {
  const { option, isFocused, isSelected, onSelectOption } = props

  const optionRef = useRef<HTMLDivElement>(null)

  const theme = useTheme()
  const classes = useStyles({ theme })

  const handleSelection = () => {
    onSelectOption(option)
  }

  useEffect(() => {
    if (isFocused) {
      optionRef?.current?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      })
    }
  }, [isFocused])

  const text = isSelected ? `Yeeeah, ${option.toLowerCase()} !` : option

  return (
    <div
      ref={optionRef}
      role="button"
      className={clsx(classes.root, isFocused && classes.focused)}
      onClick={handleSelection}
    >
      {text}

      {isSelected && (
        <img src={CheckIcon} alt="check" className={classes.checkIcon} />
      )}
    </div>
  )
}

export default DropdownItem
