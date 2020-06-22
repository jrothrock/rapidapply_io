// This test does pass, but has issues with the alpha version of React router 6, which uses navigate instead of history (throwing an error)
// will address later when out of alpha version

import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
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

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Account Already Created", async () => {
  server.use(
    rest.post(`${location.origin}/api/v1/auth/signup`, (req, res, ctx) => {
      return res(ctx.status(409));
    })
  );

  render(<SignUp />);

  fireEvent.change(screen.getByTestId("firstname"), {
    target: { value: "test" },
  });
  fireEvent.change(screen.getByTestId("lastname"), {
    target: { value: "test" },
  });
  fireEvent.change(screen.getByTestId("email"), {
    target: { value: "test@test.com" },
  });
  fireEvent.change(screen.getByTestId("password"), {
    target: { value: "password" },
  });
  fireEvent.change(screen.getByTestId("password_confirmation"), {
    target: { value: "password" },
  });
  fireEvent.click(screen.getByText("Sign Up"));

  await waitFor(() =>
    expect(screen.getByText("Account Already Exists")).toHaveClass(
      "failure-rounded"
    )
  );
});

test("Invalid Email", async () => {
  server.use(
    rest.post(`${location.origin}/api/v1/auth/signup`, (req, res, ctx) => {
      return res(
        ctx.status(400),
        ctx.json({
          email: true,
        })
      );
    })
  );

  render(<SignUp />);

  fireEvent.change(screen.getByTestId("firstname"), {
    target: { value: "test" },
  });
  fireEvent.change(screen.getByTestId("lastname"), {
    target: { value: "test" },
  });
  fireEvent.change(screen.getByTestId("email"), {
    target: { value: "invalidemail.com" },
  });
  fireEvent.change(screen.getByTestId("password"), {
    target: { value: "password" },
  });
  fireEvent.change(screen.getByTestId("password_confirmation"), {
    target: { value: "password" },
  });
  fireEvent.click(screen.getByText("Sign Up"));

  await waitFor(() =>
    expect(screen.getByText("Needs to be a valid email")).toHaveClass(
      "failure-rounded"
    )
  );
});
