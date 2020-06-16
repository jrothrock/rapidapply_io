import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Nav from "./Nav";

configure({ adapter: new Adapter() });

describe("Nav", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    shallow(<Nav />);
  });
});
