import { render } from "@testing-library/react";
import FeaturedFeed from "../components/FeaturedFeed";

describe("Featured Feed", () => {
    test("renders successfully", () => {
        render(<FeaturedFeed />);
    });
});