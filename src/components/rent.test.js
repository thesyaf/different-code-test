import React from 'react'
import Rent from './rent'
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  shallow(<Rent />);
});