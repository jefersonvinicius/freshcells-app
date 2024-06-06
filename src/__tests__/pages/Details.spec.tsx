import { render } from "@testing-library/react";
import { assert, beforeEach, describe, expect, it, vi } from "vitest";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import AccountDetailsPage from "../../pages/AccountDetailsPage";
import { API } from "../../services/api";
import { getStore } from "../../state/auth";

describe("<AccountDetailsPage />", () => {
  it("should navigate to login page when user is not logged in", async () => {
    const inMemoryRouter = createMemoryRouter(
      [
        {
          path: "/",
          element: <span>DummyLogin</span>,
        },
        {
          path: "/details",
          element: <AccountDetailsPage />,
        },
      ],
      { initialEntries: ["/details"] }
    );
    const content = render(
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={inMemoryRouter} />
      </QueryClientProvider>
    );

    expect(await content.findByText("DummyLogin")).toBeInTheDocument();
  });

  describe("when logged in", () => {
    beforeEach(() => {
      getStore().setState({ authData: { jwt: "any", userID: "1" } });
    });

    it("should display first name and last name", async () => {
      vi.spyOn(API, "fetchUser").mockResolvedValue({
        id: "1",
        email: "any@gmail.com",
        firstName: "Jeferson",
        lastName: "Vinícius",
      });

      const content = render(
        <QueryClientProvider client={new QueryClient()}>
          <AccountDetailsPage />
        </QueryClientProvider>
      );

      const firstNameInput = await content.findByLabelText("firstName");
      const lastNameInput = await content.findByLabelText("lastName");
      assert(firstNameInput instanceof HTMLInputElement);
      assert(lastNameInput instanceof HTMLInputElement);

      expect(firstNameInput.value).toBe("Jeferson");
      expect(lastNameInput.value).toBe("Vinícius");
    });
  });
});
