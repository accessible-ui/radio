import * as React from 'react'
import {VisuallyHidden} from '@accessible/visually-hidden'
import useChange from '@react-hook/change'
import clsx from 'clsx'

const RadioGroupContext = React.createContext<RadioGroupContextValue>({
  name: '',
  value: void 0,
  setValue: noop,
})
export const useRadioGroup = () =>
  React.useContext<RadioGroupContextValue>(RadioGroupContext)

export function RadioGroup({
  name,
  value,
  defaultValue,
  onChange = noop,
  children,
}: RadioGroupProps) {
  const [checkedValue, setValue] = React.useState<
    string | number | string[] | undefined
  >(value ?? defaultValue)
  const nextValue = value ?? checkedValue
  const context = React.useMemo(() => ({name, value: nextValue, setValue}), [
    name,
    nextValue,
  ])
  useChange(checkedValue, onChange)

  return (
    <RadioGroupContext.Provider value={context}>
      {children}
    </RadioGroupContext.Provider>
  )
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      disabled = false,
      onChange = noop,
      onFocus,
      onBlur,
      children,
      ...props
    },
    ref
  ) => {
    const {name, value: checkedValue, setValue} = useRadioGroup()
    const [focused, setFocused] = React.useState<boolean>(false)
    const checked = value === checkedValue
    const context = React.useMemo(
      () => ({
        checked,
        check: () => !disabled && setValue(value),
        uncheck: () =>
          !disabled &&
          setValue((current) => (current === value ? void 0 : current)),
        focused,
        disabled,
      }),
      [checked, focused, disabled, setValue, value]
    )
    useChange(checked, onChange)

    return (
      <RadioContext.Provider value={context}>
        <VisuallyHidden>
          <input
            type='radio'
            disabled={disabled}
            onChange={({target: {checked}}) => {
              if (checked) setValue(value)
              onChange?.(checked)
            }}
            onFocus={(e) => {
              setFocused(true)
              onFocus?.(e)
            }}
            onBlur={(e) => {
              setFocused(false)
              onBlur?.(e)
            }}
            ref={ref}
            {...props}
            name={name}
            value={value}
            checked={checked}
            defaultChecked={void 0}
          />
        </VisuallyHidden>

        {children}
      </RadioContext.Provider>
    )
  }
)

const RadioContext = React.createContext<RadioContextValue>({
  checked: false,
  check: noop,
  uncheck: noop,
  focused: false,
  disabled: false,
})

export const useRadio = () => React.useContext<RadioContextValue>(RadioContext)

export function Checked({children}: CheckedProps) {
  return useRadio().checked ? <React.Fragment>{children}</React.Fragment> : null
}

export function Unchecked({children}: UncheckedProps) {
  return !useRadio().checked ? (
    <React.Fragment>{children}</React.Fragment>
  ) : null
}

export function Mark({
  children,
  checkedClass,
  uncheckedClass,
  checkedStyle,
  uncheckedStyle,
}: MarkProps) {
  const checked = useRadio().checked
  return React.cloneElement(children, {
    className:
      clsx(children.props.className, checked ? checkedClass : uncheckedClass) ||
      void 0,
    style: Object.assign(
      {},
      children.props.style,
      checked ? checkedStyle : uncheckedStyle
    ),
  })
}

function noop() {}

export interface RadioContextValue {
  checked: boolean
  check: () => void
  uncheck: () => void
  focused: boolean
  disabled: boolean
}

export interface RadioProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'name' | 'checked' | 'defaultChecked'
  > {
  value: string | number | string[] | undefined
  disabled?: boolean
  onChange?: (checked: boolean) => any
  onFocus?: (event: React.FocusEvent) => any
  onBlur?: (event: React.FocusEvent) => any
  children?: React.ReactNode
}

export interface UncheckedProps {
  children: React.ReactNode
}

export interface CheckedProps {
  children: React.ReactNode
}

export interface RadioGroupContextValue {
  name: string
  value: string | number | string[] | undefined
  setValue: (
    value:
      | string
      | number
      | string[]
      | undefined
      | ((
          current: string | number | string[] | undefined
        ) => string | number | string[] | undefined)
  ) => void
}

export interface RadioGroupProps {
  name: string
  value?: string | number | string[] | undefined
  defaultValue?: string | number | string[] | undefined
  onChange?: (value: string | number | string[] | undefined) => any
  children: React.ReactNode
}

export interface MarkProps {
  checkedClass?: string
  uncheckedClass?: string
  checkedStyle?: React.CSSProperties
  uncheckedStyle?: React.CSSProperties
  children: JSX.Element | React.ReactElement
}

/* istanbul ignore next */
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  RadioGroup.displayName = 'RadioGroup'
  Radio.displayName = 'Radio'
  Mark.displayName = 'Mark'
  Checked.displayName = 'Checked'
  Unchecked.displayName = 'Unchecked'
}
