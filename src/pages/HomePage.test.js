import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

test("renders Home Page text", () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/Home Page/i);
  expect(linkElement).toBeInTheDocument();
});
