import React, {
  createContext,
  forwardRef,
  useState,
  useEffect,
  useContext,
  useMemo,
} from 'react'
import {
  Checkbox,
  CheckboxProps,
  CheckboxContextValue,
  CheckboxControls,
  CheckmarkProps,
  CheckedProps as CheckedProps_,
  UncheckedProps as UncheckedProps_,
  ToggleProps as ToggleProps_,
} from '@accessible/checkbox'
export {
  Checked,
  Unchecked,
  Checkmark as Mark,
  CheckboxContext as RadioContext,
  useCheckbox as useRadio,
  useChecked,
  useFocused,
  useControls,
  Toggle,
} from '@accessible/checkbox'

export interface MarkProps extends CheckmarkProps {}
export interface RadioControls extends CheckboxControls {}
export interface RadioContextValue extends CheckboxContextValue {}
export interface CheckedProps extends CheckedProps_ {}
export interface UncheckedProps extends UncheckedProps_ {}
export interface ToggleProps extends ToggleProps_ {}
export interface RadioProps extends CheckboxProps {
  name: never
  value: any
}

export const Radio = forwardRef<JSX.Element | React.ReactElement, RadioProps>(
  (props, ref: any) => {
    const {name, value, setValue} = useRadioGroup()
    useEffect(() => {
      if (props.defaultChecked) setValue(props.value)
    }, [])
    useEffect(() => {
      if (props.checked) setValue(props.value)
    }, [props.checked])
    return (
      <Checkbox
        {...props}
        name={name}
        defaultChecked={void 0}
        checked={
          props.checked ||
          (value === null && props.defaultChecked) ||
          value === props.value
        }
        ref={ref}
        type="radio"
        tabIndex="0"
        onChange={event => {
          setValue(props.value)
          props.onChange?.(event)
        }}
      />
    )
  }
)

export interface RadioGroupContextValue {
  name: string
  value: any
  setValue: (value: any) => void
}

export const RadioGroupContext = createContext({})
export const useRadioGroup = () =>
  // @ts-ignore
  useContext<RadioGroupContextValue>(RadioGroupContext)
export interface RadioGroupProps {
  name: string
  //value: null | number | string
  //defaultValue: null | number | string
  onChange?: (event: InputEvent) => any
  children: React.ReactNode | React.ReactNode[] | JSX.Element[] | JSX.Element
}
export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  onChange,
  children,
  //value,
  //defaultValue,
}) => {
  const [value, setValue] = useState<any>(null)
  const context = useMemo(() => ({name, value, setValue}), [name, value])
  useEffect(() => {
    onChange?.(value)
  }, [value])
  return <RadioGroupContext.Provider value={context} children={children} />
}

/* istanbul ignore next */
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  RadioGroup.displayName = 'RadioGroup'
  Radio.displayName = 'Radio'
}
