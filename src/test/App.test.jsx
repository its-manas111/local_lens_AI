import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {

    test("renders successfully", () => {
        render(<App />);
    });

    test("contains heading", () => {
        render(<App />);

        expect(
            screen.getByRole("heading")
        ).toBeInTheDocument();
    });

});