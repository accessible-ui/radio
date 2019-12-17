import React from 'react'
import {Checkbox} from '@accessible/checkbox'
export {
  Checked,
  CheckedProps,
  Unchecked,
  UncheckedProps,
  CheckboxContext as RadioContext,
  CheckboxContextValue as RadioContextValue,
  useCheckbox as useRadio,
  useChecked,
  useFocused,
  useControls,
  CheckboxControls as RadioControls,
  Toggle,
  ToggleProps,
  Checkmark as Mark,
  CheckmarkProps as MarkProps,
  CheckboxProps as RadioProps,
} from '@accessible/checkbox'

export const Radio = props => <Checkbox {...props} type="radio" />

/* istanbul ignore next */
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  Radio.displayName = 'Radio'
}
