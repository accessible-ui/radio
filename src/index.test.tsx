/* jest */
import * as React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {renderHook} from '@testing-library/react-hooks'
import {
  RadioGroup,
  Radio,
  Checked,
  Unchecked,
  Mark,
  useFocused,
  useControls,
} from './index'

describe('<Radio>', () => {
  it('should render as a radio button', () => {
    const result = render(<Radio name="me" value="foo" />)
    expect(result.asFragment()).toMatchSnapshot(
      'type=radio, value=foo, no name'
    )
  })

  it('should not be checked', () => {
    const result = render(<Radio checked value="a" data-testid="a" />)

    expect((result.getByTestId('a') as HTMLInputElement).checked).toBe(false)
  })

  it('should not be default checked', () => {
    const result = render(<Radio defaultChecked value="a" data-testid="a" />)

    expect((result.getByTestId('a') as HTMLInputElement).checked).toBe(false)
  })

  it('should fire onChange events', () => {
    let value
    const mockOnChange = checked => (value = checked)

    const result = render(
      <RadioGroup name="test">
        <Radio value="a" data-testid="a" onChange={mockOnChange} />
      </RadioGroup>
    )

    fireEvent.click(result.getByTestId('a'))
    expect(value).toBe(true)
  })

  it('should fire onFocus events', () => {
    const mockOnFocus = jest.fn()

    const result = render(
      <Radio value="a" data-testid="a" onFocus={mockOnFocus} />
    )

    fireEvent.focus(result.getByTestId('a'))
    expect(mockOnFocus).toBeCalled()
  })

  it('should fire onBlur events', () => {
    const mockOnBlur = jest.fn()

    const result = render(
      <Radio value="a" data-testid="a" onBlur={mockOnBlur} />
    )

    fireEvent.blur(result.getByTestId('a'))
    expect(mockOnBlur).toBeCalled()
  })

  it('should provide context to function child', () => {
    let cxt

    render(
      <Radio value="foo">
        {context => {
          cxt = context
          return <div />
        }}
      </Radio>
    )

    expect(cxt).toMatchSnapshot()
  })
})

describe('<RadioGroup>', () => {
  it('should render radio input names', () => {
    const result = render(
      <RadioGroup name="me">
        <Radio value="a" />
        <Radio value="b" />
      </RadioGroup>
    )

    expect(result.asFragment()).toMatchSnapshot(
      'name=me value=a, name=me value=b'
    )
  })

  it('should render checked when `value` matches', () => {
    const result = render(
      <RadioGroup name="me" value="a">
        <Radio value="a" data-testid="a" />
        <Radio value="b" data-testid="b" />
      </RadioGroup>
    )

    expect((result.getByTestId('a') as HTMLInputElement).checked).toBe(true)
    expect((result.getByTestId('b') as HTMLInputElement).checked).toBe(false)
  })

  it('should render checked when `defaultValue` matches', () => {
    const result = render(
      <RadioGroup name="me" defaultValue="b">
        <Radio value="a" data-testid="a" />
        <Radio value="b" data-testid="b" />
      </RadioGroup>
    )

    expect((result.getByTestId('a') as HTMLInputElement).checked).toBe(false)
    expect((result.getByTestId('b') as HTMLInputElement).checked).toBe(true)
  })

  it('should not render checked when `value` does not match', () => {
    const result = render(
      <RadioGroup name="me" value="c">
        <Radio value="a" data-testid="a" />
        <Radio value="b" data-testid="b" />
      </RadioGroup>
    )

    expect((result.getByTestId('a') as HTMLInputElement).checked).toBe(false)
    expect((result.getByTestId('b') as HTMLInputElement).checked).toBe(false)
  })

  it('should not render checked when `defaultValue` does not match', () => {
    const result = render(
      <RadioGroup name="me" defaultValue="c">
        <Radio value="a" data-testid="a" />
        <Radio value="b" data-testid="b" />
      </RadioGroup>
    )

    expect((result.getByTestId('a') as HTMLInputElement).checked).toBe(false)
    expect((result.getByTestId('b') as HTMLInputElement).checked).toBe(false)
  })

  it('should call onChange when value changes', () => {
    const mockOnChange = jest.fn()

    const result = render(
      <RadioGroup name="me" onChange={mockOnChange}>
        <Radio value="a" data-testid="a" />
        <Radio value="b" data-testid="b" />
      </RadioGroup>
    )

    fireEvent.click(result.getByTestId('a'))
    expect(mockOnChange).toBeCalledWith('a')
    expect(mockOnChange).not.toBeCalledWith('b')
    fireEvent.click(result.getByTestId('b'))
    expect(mockOnChange).toBeCalledWith('b')
  })
})

describe('<Checked>', () => {
  it('should be null when unchecked', () => {
    const result = render(
      <RadioGroup name="test">
        <Radio value="a">
          <Checked>Checked</Checked>
        </Radio>
      </RadioGroup>
    )

    expect(result.asFragment()).toMatchSnapshot('[blank]')
  })

  it('should be `Checked` when checked', () => {
    const result = render(
      <RadioGroup name="test" value="a">
        <Radio value="a">
          <Checked>Checked</Checked>
        </Radio>
      </RadioGroup>
    )

    expect(result.asFragment()).toMatchSnapshot('Checked')
  })
})

describe('<Unchecked>', () => {
  it('should be null when checked', () => {
    const result = render(
      <RadioGroup name="test" value="a">
        <Radio value="a">
          <Unchecked>Unchecked</Unchecked>
        </Radio>
      </RadioGroup>
    )

    expect(result.asFragment()).toMatchSnapshot('[blank]')
  })

  it('should be `Unchecked` when unchecked', () => {
    const result = render(
      <RadioGroup name="test">
        <Radio value="a">
          <Unchecked>Unchecked</Unchecked>
        </Radio>
      </RadioGroup>
    )

    expect(result.asFragment()).toMatchSnapshot('Unchecked')
  })
})

describe('<Mark>', () => {
  it('should have `checked` class name when checked', () => {
    const result = render(
      <RadioGroup name="test" defaultValue="a">
        <Radio value="a" data-testid="a">
          <Mark checkedClass="checked">
            <span>Checkmark A</span>
          </Mark>
        </Radio>
        <Radio value="b" data-testid="b">
          <Mark checkedClass="checked">
            <span>Checkmark B</span>
          </Mark>
        </Radio>
      </RadioGroup>
    )

    expect(result.asFragment()).toMatchSnapshot('a=checked')
    fireEvent.click(result.getByTestId('b'))
    expect(result.asFragment()).toMatchSnapshot('a=unchecked, b=checked')
  })

  it('should have `unchecked` class name when unchecked', () => {
    const result = render(
      <RadioGroup name="test" defaultValue="a">
        <Radio value="a" data-testid="a">
          <Mark uncheckedClass="unchecked">
            <span>Checkmark A</span>
          </Mark>
        </Radio>
        <Radio value="b" data-testid="b">
          <Mark uncheckedClass="unchecked">
            <span>Checkmark B</span>
          </Mark>
        </Radio>
      </RadioGroup>
    )

    expect(result.asFragment()).toMatchSnapshot('a=checked, b=unchecked')
    fireEvent.click(result.getByTestId('b'))
    expect(result.asFragment()).toMatchSnapshot('a=unchecked, b=checked')
  })

  it('should apply checked and unchecked styles', () => {
    const result = render(
      <RadioGroup name="test" defaultValue="a">
        <Radio value="a" data-testid="a">
          <Mark
            checkedStyle={{display: 'block'}}
            uncheckedStyle={{display: 'none'}}
          >
            <span>Checkmark A</span>
          </Mark>
        </Radio>
        <Radio value="b" data-testid="b">
          <Mark
            checkedStyle={{display: 'block'}}
            uncheckedStyle={{display: 'none'}}
          >
            <span>Checkmark B</span>
          </Mark>
        </Radio>
      </RadioGroup>
    )

    expect(result.asFragment()).toMatchSnapshot('a=checked, b=unchecked')
    fireEvent.click(result.getByTestId('b'))
    expect(result.asFragment()).toMatchSnapshot('a=unchecked, b=checked')
  })
})

describe('useFocused()', () => {
  it('should be `true` when focused, `false` when blurred', () => {
    const Focusable = () => {
      return <>{String(useFocused())}</>
    }

    const result = render(
      <Radio value="a" data-testid="a">
        <Focusable />
      </Radio>
    )

    expect(result.asFragment()).toMatchSnapshot('false')
    fireEvent.focus(result.getByTestId('a'))
    expect(result.asFragment()).toMatchSnapshot('true')
    fireEvent.blur(result.getByTestId('a'))
    expect(result.asFragment()).toMatchSnapshot('false')
  })
})

describe('useControls()', () => {
  it('should have `check` and `uncheck` keys', () => {
    const {result} = renderHook(() => useControls(), {
      wrapper: ({children}) => <Radio value="a" children={children} />,
    })
    expect(Object.keys(result.current)).toStrictEqual(['check', 'uncheck'])
  })

  it('should change checked state', () => {
    const Component = () => {
      const {check, uncheck} = useControls()
      return (
        <>
          <button data-testid="check" onClick={check} />
          <button data-testid="uncheck" onClick={uncheck} />
        </>
      )
    }

    const result = render(
      <RadioGroup name="test">
        <Radio value="a" data-testid="a">
          <Component />
        </Radio>
      </RadioGroup>
    )

    fireEvent.click(result.getByTestId('check'))
    expect((result.getByTestId('a') as HTMLInputElement).checked).toBe(true)
    fireEvent.click(result.getByTestId('uncheck'))
    expect((result.getByTestId('a') as HTMLInputElement).checked).toBe(false)
  })
})
