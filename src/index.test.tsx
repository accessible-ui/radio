/* jest */
import * as React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {RadioGroup, Radio, Checked, Unchecked, Mark} from './index'

describe('<Radio>', () => {
  it('should render as a radio button', () => {
    // @ts-expect-error
    const result = render(<Radio name='me' value='foo' />)
    expect(result.asFragment()).toMatchSnapshot(
      'type=radio, value=foo, no name'
    )
  })

  it('should not be checked', () => {
    // @ts-expect-error
    render(<Radio checked value='a' data-testid='a' />)
    expect(screen.getByTestId('a')).not.toBeChecked()
  })

  it('should not be default checked', () => {
    // @ts-expect-error
    render(<Radio defaultChecked value='a' data-testid='a' />)

    expect(screen.getByTestId('a')).not.toBeChecked()
  })

  it('should fire onChange events', () => {
    let value
    const mockOnChange = (checked) => (value = checked)

    render(
      <RadioGroup name='test'>
        <Radio value='a' data-testid='a' onChange={mockOnChange} />
      </RadioGroup>
    )

    userEvent.click(screen.getByTestId('a'))
    expect(value).toBe(true)
  })

  it('should fire onFocus events', () => {
    const mockOnFocus = jest.fn()

    render(<Radio value='a' data-testid='a' onFocus={mockOnFocus} />)

    fireEvent.focus(screen.getByTestId('a'))
    expect(mockOnFocus).toBeCalled()
  })

  it('should fire onBlur events', () => {
    const mockOnBlur = jest.fn()

    render(<Radio value='a' data-testid='a' onBlur={mockOnBlur} />)

    fireEvent.blur(screen.getByTestId('a'))
    expect(mockOnBlur).toBeCalled()
  })
})

describe('<RadioGroup>', () => {
  it('should render radio input names', () => {
    const result = render(
      <RadioGroup name='me'>
        <Radio value='a' />
        <Radio value='b' />
      </RadioGroup>
    )

    expect(result.asFragment()).toMatchSnapshot(
      'name=me value=a, name=me value=b'
    )
  })

  it('should render checked when `value` matches', () => {
    render(
      <RadioGroup name='me' value='a'>
        <Radio value='a' data-testid='a' />
        <Radio value='b' data-testid='b' />
      </RadioGroup>
    )

    expect(screen.getByTestId('a')).toBeChecked()
    expect(screen.getByTestId('b')).not.toBeChecked()
  })

  it('should render checked when `defaultValue` matches', () => {
    render(
      <RadioGroup name='me' defaultValue='b'>
        <Radio value='a' data-testid='a' />
        <Radio value='b' data-testid='b' />
      </RadioGroup>
    )

    expect(screen.getByTestId('a')).not.toBeChecked()
    expect(screen.getByTestId('b')).toBeChecked()
  })

  it('should not render checked when `value` does not match', () => {
    render(
      <RadioGroup name='me' value='c'>
        <Radio value='a' data-testid='a' />
        <Radio value='b' data-testid='b' />
      </RadioGroup>
    )

    expect(screen.getByTestId('a')).not.toBeChecked()
    expect(screen.getByTestId('b')).not.toBeChecked()
  })

  it('should not render checked when `defaultValue` does not match', () => {
    render(
      <RadioGroup name='me' defaultValue='c'>
        <Radio value='a' data-testid='a' />
        <Radio value='b' data-testid='b' />
      </RadioGroup>
    )

    expect(screen.getByTestId('a')).not.toBeChecked()
    expect(screen.getByTestId('b')).not.toBeChecked()
  })

  it('should call onChange when value changes', () => {
    const mockOnChange = jest.fn()

    render(
      <RadioGroup name='me' onChange={mockOnChange}>
        <Radio value='a' data-testid='a' />
        <Radio value='b' data-testid='b' />
      </RadioGroup>
    )

    userEvent.click(screen.getByTestId('a'))
    expect(mockOnChange).toBeCalledWith('a', undefined)
    expect(mockOnChange).not.toBeCalledWith('b')
    userEvent.click(screen.getByTestId('b'))
    expect(mockOnChange).toBeCalledWith('b', 'a')
  })
})

describe('<Checked>', () => {
  it('should be null when unchecked', () => {
    render(
      <RadioGroup name='test'>
        <Radio value='a'>
          <Checked>Checked</Checked>
        </Radio>
      </RadioGroup>
    )

    expect(screen.queryByText('Checked')).not.toBeInTheDocument()
  })

  it('should be `Checked` when checked', () => {
    render(
      <RadioGroup name='test' value='a'>
        <Radio value='a'>
          <Checked>Checked</Checked>
        </Radio>
      </RadioGroup>
    )

    expect(screen.getByText('Checked')).toBeInTheDocument()
  })
})

describe('<Unchecked>', () => {
  it('should be null when checked', () => {
    render(
      <RadioGroup name='test' value='a'>
        <Radio value='a'>
          <Unchecked>Unchecked</Unchecked>
        </Radio>
      </RadioGroup>
    )

    expect(screen.queryByText('Unchecked')).not.toBeInTheDocument()
  })

  it('should be `Unchecked` when unchecked', () => {
    render(
      <RadioGroup name='test'>
        <Radio value='a'>
          <Unchecked>Unchecked</Unchecked>
        </Radio>
      </RadioGroup>
    )

    expect(screen.getByText('Unchecked')).toBeInTheDocument()
  })
})

describe('<Mark>', () => {
  it('should have `checked` class name when checked', () => {
    render(
      <RadioGroup name='test' defaultValue='a'>
        <Radio value='a' data-testid='a'>
          <Mark checkedClass='checked'>
            <span>Checkmark A</span>
          </Mark>
        </Radio>
        <Radio value='b' data-testid='b'>
          <Mark checkedClass='checked'>
            <span>Checkmark B</span>
          </Mark>
        </Radio>
      </RadioGroup>
    )

    expect(screen.getByText('Checkmark A')).toHaveAttribute('class', 'checked')
    expect(screen.getByText('Checkmark B')).not.toHaveAttribute(
      'class',
      'checked'
    )
    userEvent.click(screen.getByTestId('b'))
    expect(screen.getByText('Checkmark A')).not.toHaveAttribute(
      'class',
      'checked'
    )
    expect(screen.getByText('Checkmark B')).toHaveAttribute('class', 'checked')
  })

  it('should have `unchecked` class name when unchecked', () => {
    render(
      <RadioGroup name='test' defaultValue='a'>
        <Radio value='a' data-testid='a'>
          <Mark uncheckedClass='unchecked'>
            <span>Checkmark A</span>
          </Mark>
        </Radio>
        <Radio value='b' data-testid='b'>
          <Mark uncheckedClass='unchecked'>
            <span>Checkmark B</span>
          </Mark>
        </Radio>
      </RadioGroup>
    )

    expect(screen.getByText('Checkmark A')).not.toHaveAttribute(
      'class',
      'unchecked'
    )
    expect(screen.getByText('Checkmark B')).toHaveAttribute(
      'class',
      'unchecked'
    )
    userEvent.click(screen.getByTestId('b'))
    expect(screen.getByText('Checkmark A')).toHaveAttribute(
      'class',
      'unchecked'
    )
    expect(screen.getByText('Checkmark B')).not.toHaveAttribute(
      'class',
      'unchecked'
    )
  })

  it('should apply checked and unchecked styles', () => {
    render(
      <RadioGroup name='test' defaultValue='a'>
        <Radio value='a' data-testid='a'>
          <Mark
            checkedStyle={{display: 'block'}}
            uncheckedStyle={{display: 'none'}}
          >
            <span>Checkmark A</span>
          </Mark>
        </Radio>
        <Radio value='b' data-testid='b'>
          <Mark
            checkedStyle={{display: 'block'}}
            uncheckedStyle={{display: 'none'}}
          >
            <span>Checkmark B</span>
          </Mark>
        </Radio>
      </RadioGroup>
    )

    expect(screen.getByText('Checkmark A')).toHaveStyle({display: 'block'})
    expect(screen.getByText('Checkmark B')).toHaveStyle({display: 'none'})
    userEvent.click(screen.getByTestId('b'))
    expect(screen.getByText('Checkmark A')).toHaveStyle({display: 'none'})
    expect(screen.getByText('Checkmark B')).toHaveStyle({display: 'block'})
  })
})
