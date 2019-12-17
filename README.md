<hr>
<div align="center">
  <h1 align="center">
    @accessible/radio
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
import {Radio, Mark} from '@accessible/radio'

const MyRadio = () => (
  <label className="my-radio">
    <Radio name="my-field-name">
      <span className="my-radio">
        <Mark checkedClass="checked" uncheckedClass="unchecked">
          <span className="checkmark" />
        </Mark>
      </span>
    </Radio>
    Check me!
  </label>
)
```

## API

### `<Radio>`

Creates a visually hidden radio input that is focusable and accessible via keyboard navigation.
All props passed to this component are applied to the `<input>`. This also creates a context
provider enabling the other components in this library to access the radio's state
deep in the tree.

#### Props

| Prop           | Type                                                                                                           | Default     | Required? | Description                                                                                                           |
| -------------- | -------------------------------------------------------------------------------------------------------------- | ----------- | --------- | --------------------------------------------------------------------------------------------------------------------- |
| id             | `string`                                                                                                       | `undefined` | No        | Creates an `id` that overrides the default auto id.                                                                   |
| checked        | `boolean`                                                                                                      | `undefined` | No        | Makes the radio a controlled component which can no longer be updated with `check`, `uncheck`, and `toggle` controls. |
| defaultChecked | `boolean`                                                                                                      | `undefined` | No        | Set this to `true` to make the radio `checked` by default.                                                            |
| children       | <code>React.ReactNode &#124; React.ReactNode[] &#124; ((context: RadioContextValue) => React.ReactNode)</code> | `undefined` | No        | Your custom styled radio.                                                                                             |

### `<Mark>`

A convenient component for conditionally adding class names and styles when the component is checked/unchecked.

#### Props

| Prop           | Type                  | Default               | Required? | Description                                                                         |
| -------------- | --------------------- | --------------------- | --------- | ----------------------------------------------------------------------------------- |
| uncheckedClass | `string`              | `undefined`           | No        | This class name will be applied to the child element when the radio is `unchecked`. |
| checkedClass   | `string`              | `"checkbox--checked"` | No        | This class name will be applied to the child element when the radio is `checked`.   |
| uncheckedStyle | `React.CSSProperties` | `undefined`           | No        | These styles will be applied to the child element when the radio is `unchecked`.    |
| checkedStyle   | `React.CSSProperties` | `undefined`           | No        | These styles name will be applied to the child element when the radio is `checked`. |
| children       | `React.ReactNode`     | `undefined`           | Yes       | The child you wish to render when the radio is checked.                             |

### `<Checked>`

The child of this component will only render when the radio is in
a `checked` state.

#### Props

| Prop     | Type              | Default     | Required? | Description                                             |
| -------- | ----------------- | ----------- | --------- | ------------------------------------------------------- |
| children | `React.ReactNode` | `undefined` | Yes       | The child you wish to render when the radio is checked. |

### `<Unchecked>`

The child of this component will only render when the radio is in
an `unchecked` state.

#### Props

| Prop     | Type              | Default     | Required? | Description                                               |
| -------- | ----------------- | ----------- | --------- | --------------------------------------------------------- |
| children | `React.ReactNode` | `undefined` | Yes       | The child you wish to render when the radio is unchecked. |

### `<Toggle>`

This component clones its child and adds an `onClick` handler to toggle the radio between
`checked` and `unchecked` states.

#### Props

| Prop     | Type              | Default     | Required? | Description                                               |
| -------- | ----------------- | ----------- | --------- | --------------------------------------------------------- |
| children | `React.ReactNode` | `undefined` | Yes       | The child you wish to render when the radio is unchecked. |

### `useRadio()`

A React hook that returns the [`RadioContextValue`](#radiocontextvalue)

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
  // Toggles the radio `checked` property
  toggle: () => void
  // This is the `id` of the <input>
  id: string
}
```

### `useChecked()`

Returns `true` when the radio is checked, otherwise `false`

### `useFocused()`

Returns `true` when the radio is focused, otherwise `false`

### `useControls()`

This hook provides access to the radio's `check`, `uncheck`, and `toggle` functions

#### Example

```jsx harmony
const Component = () => {
  const {check, uncheck, toggle} = useControls()
  return <button onClick={toggle}>Toggle me</button>
}
```

## LICENSE

MIT
