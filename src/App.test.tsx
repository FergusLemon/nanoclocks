import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './setupTests';
import { shallow } from 'enzyme';
import getElement from './common/utils/getElement';

const DEFAULT_VALUE = undefined;
const setup = (input = {}) => (
  {
    value: input.value || DEFAULT_VALUE
  }
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("App", () => {
  it('passes the value in state to the PriceInput component', () => {
    const testEnv = setup({ value: DEFAULT_VALUE });
    const wrapper = shallow(<App {...testEnv} />);
    expect(wrapper.find('PriceInput').props().value).toBe(testEnv.value);
  });
});
