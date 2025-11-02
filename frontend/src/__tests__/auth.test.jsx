import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../pages/Login";
import { AuthProvider } from "../context/AuthContext";

// mock axios
vi.mock("../services/api", () => ({
  default: {
    post: vi.fn(() =>
      Promise.resolve({
        data: { token: "abcd1234" },
      })
    ),
  },
}));

test("login form works", async () => {
  render(
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );

  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: "test@test.com" },
  });

  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: "123456" },
  });

  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  const success = await screen.findByText(/logging in/i);
  expect(success).toBeInTheDocument();
});
