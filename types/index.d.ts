import * as React from 'react'
export declare const RadioGroupContext: React.Context<RadioGroupContextValue>
export declare const useRadioGroup: () => RadioGroupContextValue
export declare const RadioGroup: React.FC<RadioGroupProps>
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
export declare const Radio: React.ForwardRefExoticComponent<
  Pick<RadioProps, string | number> & React.RefAttributes<HTMLInputElement>
>
export declare const RadioContext: React.Context<RadioContextValue>,
  useRadio: () => RadioContextValue,
  useChecked: () => boolean,
  useFocused: () => boolean,
  useDisabled: () => boolean,
  useControls: () => {
    check: () => void
    uncheck: () => void
  }
export declare const Checked: React.FC<CheckedProps>
export declare const Unchecked: React.FC<UncheckedProps>
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
  children: React.ReactNode | React.ReactNode[] | JSX.Element[] | JSX.Element
}
export interface MarkProps {
  checkedClass?: string
  uncheckedClass?: string
  checkedStyle?: React.CSSProperties
  uncheckedStyle?: React.CSSProperties
  children: JSX.Element | React.ReactElement
}
export declare const Mark: React.FC<MarkProps>
