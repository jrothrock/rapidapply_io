import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import SignIn from "./SignIn";

configure({ adapter: new Adapter() });

describe("SignIn", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    shallow(<SignIn />);
  });

  // it("should update state when fields updated", () => {
  //   const setState = jest.fn();
  //   const wrapper = mount(<SignIn />);
  //   const useStateSpy = jest.spyOn(React, 'useState')
  //   useStateSpy.mockImplementation((init) => [init, setState]);
  //   wrapper.find('#email').simulate('change', {target: {value: 'test@test.com'}});
  //   wrapper.find('#email').props().onChange('test');
  //   expect(setState).toHaveBeenCalledWith('test@test.com');
  //   wrapper.find('#password').simulate('change', {target: {value: 'test'}});
  //   expect(setState).toHaveBeenCalledTimes(1);
  // });
});
