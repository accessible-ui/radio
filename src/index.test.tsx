/* jest */
import * as React from 'react'
import {render} from '@testing-library/react'
import {Radio} from './index'

describe('<Radio>', () => {
  it('should render as a radio button', () => {
    const result = render(<Radio name="me" value="foo" />)
    expect(result.asFragment()).toMatchSnapshot('type=radio')
  })
})
