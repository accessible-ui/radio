<hr>
<div align="center">
  <h1 align="center">
    &lt;Radio&gt;
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@accessible/radio">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@accessible/radio?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@accessible/radio">
    <img alt="Types" src="https://img.shields.io/npm/types/@accessible/radio?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Code coverage report" href="https://codecov.io/gh/accessible-ui/radio">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/accessible-ui/radio?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.org/accessible-ui/radio">
    <img alt="Build status" src="https://img.shields.io/travis/accessible-ui/radio?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@accessible/radio">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@accessible/radio?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@accessible/radio?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @accessible/radio</pre>
<hr>

An accessible radio component for React. This library allows you to create
your own a radio with your own styles while maintaining the ability to
focus and update a radio input with the keyboard.

## Quick Start

[Check out the example on CodeSandbox](https://codesandbox.io/s/accessibleradio-examples-olksf)

```jsx harmony
import {RadioGroup, Radio, Mark} from '@accessible/radio'

const MyRadio = () => (
  <RadioGroup name="favorite_food" defaultValue="pizza">
    <h2>What is your favorite food?</h2>

    <label>
      <Radio value="pizza">
        <span className="my-radio">
          <Mark checkedClass="checked" uncheckedClass="unchecked">
            <span className="mark" />
          </Mark>
        </span>
      </Radio>
      Pizza
    </label>

    <label>
      <Radio value="tacos">
        <span className="my-radio">
          <Mark checkedClass="checked" uncheckedClass="unchecked">
            <span className="mark" />
          </Mark>
        </span>
      </Radio>
      Tacos
    </label>
  </RadioGroup>
)
```

## API

### `<RadioGroup>`

Creates context that controls the child [`<Radio>`](#radio) components. This is also where you set
controlled values and default values for the radio group.

#### Props

| Prop         | Type                                                                                             | Default     | Required? | Description                                                                                                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------ | ----------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name         | `string`                                                                                         | `undefined` | Yes       | The name of the checkbox group (applied to each child [`<Radio>`](#radio) input)                                                                                                                                                 |
| value        | <code>value: string &#0124; number &#0124; string[] &#0124; undefined</code>                     | `undefined` | No        | Makes the radio group a controlled component which can no longer be updated with the `setValue` control or any [`<Radio>`](#radio) controls. It should be the same as one of the values in the child [`<Radio>`](#radio) inputs. |
| defaultValue | <code>value: string &#0124; number &#0124; string[] &#0124; undefined</code>                     | `undefined` | No        | This sets the default radio group value. It should be the same as one of the values in the child [`<Radio>`](#radio) inputs.                                                                                                     |
| onChange     | <code>(value: string &#0124; number &#0124; string[] &#0124; undefined) => any</code>            | `undefined` | No        | This callback fires each time the checked value changes                                                                                                                                                                          |
| children     | <code>React.ReactNode &#0124; React.ReactNode[] &#0124; JSX.Element[] &#0124; JSX.Element</code> |

### `useRadioGroup()`

A React hook that returns the [`RadioGroupContextValue`](#radiogroupcontextvalue) for the nearest `<RadioGroup>` parent.

### `RadioGroupContextValue`

```typescript
interface RadioGroupContextValue {
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
```

### `<Radio>`

Creates a visually hidden radio input that is focusable and accessible via keyboard navigation.
All props passed to this component are applied to the `<input>`. This also creates a context
provider enabling the other components in this library to access the radio's state
deep in the tree.

#### Props

| Prop     | Type                                                                                                           | Default     | Required? | Description               |
| -------- | -------------------------------------------------------------------------------------------------------------- | ----------- | --------- | ------------------------- |
| children | <code>React.ReactNode &#124; React.ReactNode[] &#124; ((context: RadioContextValue) => React.ReactNode)</code> | `undefined` | No        | Your custom styled radio. |

### `<Mark>`

A convenient component for conditionally adding class names and styles when the `<Radio>` component is checked/unchecked. It must be a child of a `<Radio>`.

#### Props

| Prop           | Type                  | Default            | Required? | Description                                                                         |
| -------------- | --------------------- | ------------------ | --------- | ----------------------------------------------------------------------------------- |
| uncheckedClass | `string`              | `undefined`        | No        | This class name will be applied to the child element when the radio is `unchecked`. |
| checkedClass   | `string`              | `"radio--checked"` | No        | This class name will be applied to the child element when the radio is `checked`.   |
| uncheckedStyle | `React.CSSProperties` | `undefined`        | No        | These styles will be applied to the child element when the radio is `unchecked`.    |
| checkedStyle   | `React.CSSProperties` | `undefined`        | No        | These styles name will be applied to the child element when the radio is `checked`. |
| children       | `React.ReactNode`     | `undefined`        | Yes       | The child you wish to render when the radio is checked.                             |

### `<Checked>`

The child of this component will only render when the `<Radio>` is in
a `checked` state. It must be a child of a `<Radio>`.

#### Props

| Prop     | Type              | Default     | Required? | Description                                             |
| -------- | ----------------- | ----------- | --------- | ------------------------------------------------------- |
| children | `React.ReactNode` | `undefined` | Yes       | The child you wish to render when the radio is checked. |

### `<Unchecked>`

The child of this component will only render when the `<Radio>` is in
an `unchecked` state. It must be a child of a `<Radio>`.

#### Props

| Prop     | Type              | Default     | Required? | Description                                               |
| -------- | ----------------- | ----------- | --------- | --------------------------------------------------------- |
| children | `React.ReactNode` | `undefined` | Yes       | The child you wish to render when the radio is unchecked. |

### `useRadio()`

A React hook that returns the [`RadioContextValue`](#radiocontextvalue) for the nearest `<Radio>` parent.

### `RadioContextValue`

```typescript
interface RadioContextValue {
  // Does the radio have a `checked` property?
  checked: boolean
  // Is the radio currently focused?
  focused: boolean
  // Checks the radio
  check: () => void
  // Unchecks the radio
  uncheck: () => void
}
```

### `useChecked()`

Returns `true` when the `<Radio>` is checked, otherwise `false`

### `useFocused()`

Returns `true` when the `<Radio>` is focused, otherwise `false`

### `useControls()`

This hook provides access to the `<Radio>`'s `check` and `uncheck` functions

#### Example

```jsx harmony
const Component = () => {
  const {check} = useControls()
  return <button onClick={check}>Check me</button>
}
```

## LICENSE

MIT
