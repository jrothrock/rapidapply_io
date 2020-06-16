import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Footer from "./Footer";

configure({ adapter: new Adapter() });

describe("Footer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    shallow(<Footer />);
  });
});
