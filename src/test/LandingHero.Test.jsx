import { render } from "@testing-library/react";
import LandingHero from "../components/LandingHero";

describe("Landing Hero", () => {
    test("renders successfully", () => {
        render(<LandingHero />);
    });
});