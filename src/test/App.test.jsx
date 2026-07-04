import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  test("renders successfully", () => {
    render(<App />);
  });

  test("contains main hero heading", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});