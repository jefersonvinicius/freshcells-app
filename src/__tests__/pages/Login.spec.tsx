import { it, describe, vi, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../../pages/LoginPage";

import { API, InvalidCredentialsError } from "../../services/api";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

describe("<LoginPage />", () => {
  it("should display invalid credentials error when is invalid email or password", async () => {
    const user = userEvent.setup();
    vi.spyOn(API, "login").mockRejectedValue(new InvalidCredentialsError());
    const content = render(<LoginPage />);

    await user.type(content.getByLabelText("email"), "any@gmail.com");
    await user.type(content.getByLabelText("password"), "123");
    await user.click(content.getByText("login"));

    expect(
      await content.findByText("invalidCredentialsError")
    ).toBeInTheDocument();
  });

  it("should display unexpected error when throws unexpected error", async () => {
    const user = userEvent.setup();
    vi.spyOn(API, "login").mockRejectedValue(new Error("Any"));
    const content = render(<LoginPage />);

    await user.type(content.getByLabelText("email"), "any@gmail.com");
    await user.type(content.getByLabelText("password"), "123");
    await user.click(content.getByText("login"));

    expect(
      await content.findByText("unexpectedLoginError")
    ).toBeInTheDocument();
  });

  it("should navigate to account details when login successfully", async () => {
    const user = userEvent.setup();
    vi.spyOn(API, "login").mockResolvedValue({ jwt: "jwt-token", userID: "1" });

    const inMemoryRouter = createMemoryRouter([
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/details",
        element: <span>DummyDetailsAccount</span>,
      },
    ]);
    const content = render(<RouterProvider router={inMemoryRouter} />);

    await user.type(content.getByLabelText("email"), "any@gmail.com");
    await user.type(content.getByLabelText("password"), "123");
    await user.click(content.getByText("login"));

    expect(await content.findByText("DummyDetailsAccount")).toBeInTheDocument();
  });
});
