import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import SignUp from "./SignUp";

configure({ adapter: new Adapter() });

describe("SignUp", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    shallow(<SignUp />);
  });
});
