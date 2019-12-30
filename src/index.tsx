import React, {
  createContext,
  forwardRef,
  useState,
  useEffect,
  useContext,
  useRef,
  useMemo,
} from 'react'
import VisuallyHidden from '@accessible/visually-hidden'
import clsx from 'clsx'

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

// @ts-ignore
export const RadioGroupContext: React.Context<RadioGroupContextValue> = createContext(
  {}
)
export const useRadioGroup = () =>
  useContext<RadioGroupContextValue>(RadioGroupContext)

export interface RadioGroupProps {
  name: string
  value?: string | number | string[] | undefined
  defaultValue?: string | number | string[] | undefined
  onChange?: (value: string | number | string[] | undefined) => any
  children: React.ReactNode | React.ReactNode[] | JSX.Element[] | JSX.Element
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  defaultValue,
  onChange,
  children,
}) => {
  const [checkedValue, setValue] = useState<
    string | number | string[] | undefined
  >(value === void 0 ? defaultValue : value)
  const nextValue = value === void 0 ? checkedValue : value
  const context = useMemo(() => ({name, value: nextValue, setValue}), [
    name,
    nextValue,
  ])
  const prevChecked = useRef(nextValue)

  useEffect(() => {
    prevChecked.current !== nextValue && onChange?.(nextValue)
    prevChecked.current = nextValue
  }, [nextValue])

  return <RadioGroupContext.Provider value={context} children={children} />
}

export interface RadioContextValue {
  checked: boolean
  check: () => void
  uncheck: () => void
  focused: boolean
  disabled: boolean
}

export interface RadioProps {
  name?: never
  checked?: never
  defaultChecked?: never
  value: string | number | string[] | undefined
  disabled?: boolean
  onChange?: (checked: boolean) => any
  onFocus?: (event: React.FocusEvent) => any
  onBlur?: (event: React.FocusEvent) => any
  children?:
    | React.ReactNode
    | React.ReactNode[]
    | ((context: RadioContextValue) => React.ReactNode)
  [property: string]: any
}

export const Radio = forwardRef<JSX.Element | React.ReactElement, RadioProps>(
  (
    {value, disabled = false, onChange, onFocus, onBlur, children, ...props},
    ref: any
  ) => {
    const {name, value: checkedValue, setValue} = useRadioGroup()
    const [focused, setFocused] = useState<boolean>(false)
    const checked = value === checkedValue
    const prevChecked = useRef<boolean>(checked)
    const context = useMemo(
      () => ({
        checked,
        check: () => !disabled && setValue(value),
        uncheck: () =>
          !disabled &&
          setValue((current: string | number | string[] | undefined) =>
            current === value ? void 0 : current
          ),
        focused,
        disabled,
      }),
      [checked, focused, disabled]
    )
    useEffect(() => {
      prevChecked.current !== checked && onChange?.(checked)
      prevChecked.current = checked
    }, [checked])
    // @ts-ignore
    children = typeof children === 'function' ? children(context) : children
    return (
      <RadioContext.Provider value={context}>
        <VisuallyHidden>
          <input
            type="radio"
            disabled={disabled}
            onChange={() => setValue(value)}
            onFocus={e => {
              onFocus?.(e)
              setFocused(true)
            }}
            onBlur={e => {
              onBlur?.(e)
              setFocused(false)
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

// @ts-ignore
export const RadioContext: React.Context<RadioContextValue> = React.createContext(
    {}
  ),
  useRadio = () => useContext<RadioContextValue>(RadioContext),
  useChecked = () => useRadio().checked,
  useFocused = () => useRadio().focused,
  useDisabled = () => useRadio().disabled,
  useControls = () => {
    const {check, uncheck} = useRadio()
    return {check, uncheck}
  }

export interface CheckedProps {
  children: React.ReactNode
}

// @ts-ignore
export const Checked: React.FC<CheckedProps> = ({children}) =>
  useChecked() ? children : null

export interface UncheckedProps {
  children: React.ReactNode
}

// @ts-ignore
export const Unchecked: React.FC<UncheckedProps> = ({children}) =>
  !useChecked() ? children : null

export interface MarkProps {
  checkedClass?: string
  uncheckedClass?: string
  checkedStyle?: React.CSSProperties
  uncheckedStyle?: React.CSSProperties
  children: JSX.Element | React.ReactElement
}

export const Mark: React.FC<MarkProps> = ({
  children,
  checkedClass = 'radio--checked',
  uncheckedClass,
  checkedStyle,
  uncheckedStyle,
}) => {
  const checked = useChecked()
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

/* istanbul ignore next */
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  RadioGroup.displayName = 'RadioGroup'
  Radio.displayName = 'Radio'
  Mark.displayName = 'Mark'
  Checked.displayName = 'Checked'
  Unchecked.displayName = 'Unchecked'
}
