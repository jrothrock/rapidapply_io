// This test does pass, but has issues with the alpha version of React router 6, which uses navigate instead of history (throwing an error)
// will address later when out of alpha version

import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { shallow, configure } from "enzyme";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignIn from "./SignIn";

configure({ adapter: new Adapter() });

describe("SignIn", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    shallow(<SignIn />);
  });
});

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("handlers server error", async () => {
  server.use(
    rest.post(`${location.origin}/api/v1/auth/signin`, (req, res, ctx) => {
      return res(ctx.status(404));
    })
  );

  render(<SignIn />);

  fireEvent.change(screen.getByTestId("email"), {
    target: { value: "test@test.com" },
  });
  fireEvent.change(screen.getByTestId("password"), {
    target: { value: "password" },
  });
  fireEvent.click(screen.getByText("Sign In"));

  await waitFor(() =>
    expect(
      screen.getByText("The Username or Password Is Incorrect")
    ).toHaveClass("failure-rounded")
  );
});
