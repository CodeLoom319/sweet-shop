import { render, screen } from "@testing-library/react";
import SweetsPage from "../pages/Sweets";
import { AuthProvider } from "../context/AuthContext";

jest.mock("../services/sweetService", () => ({
  getSweets: () =>
    Promise.resolve([
      { id: 1, name: "Gulab Jamun", quantity: 5 },
      { id: 2, name: "Ladoo", quantity: 8 },
    ]),
}));

test("shows sweets list", async () => {
  render(
    <AuthProvider>
      <SweetsPage />
    </AuthProvider>
  );

  expect(await screen.findByText("Gulab Jamun")).toBeInTheDocument();
  expect(await screen.findByText("Ladoo")).toBeInTheDocument();
});
