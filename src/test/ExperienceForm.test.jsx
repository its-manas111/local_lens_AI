import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ExperienceForm from "../components/ExperienceForm";

describe("ExperienceForm", () => {
    const renderForm = () =>
        render(
            <ExperienceForm
                onSubmit={vi.fn()}
                onBack={vi.fn()}
            />
        );

    test("renders step 1", () => {
        renderForm();

        expect(
            screen.getByText(/Where does your story take place/i)
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText(/Enter any destination/i)
        ).toBeInTheDocument();
    });

    test("Continue button is disabled initially", () => {
        renderForm();

        expect(
            screen.getByRole("button", { name: /continue/i })
        ).toBeDisabled();
    });

    test("user can type a custom destination", () => {
        renderForm();

        const input = screen.getByPlaceholderText(
            /Enter any destination/i
        );

        fireEvent.change(input, {
            target: { value: "Jaipur" },
        });

        expect(input.value).toBe("Jaipur");
    });

    test("Continue button becomes enabled after entering destination", () => {
        renderForm();

        const input = screen.getByPlaceholderText(
            /Enter any destination/i
        );

        fireEvent.change(input, {
            target: { value: "Jaipur" },
        });

        expect(
            screen.getByRole("button", { name: /continue/i })
        ).not.toBeDisabled();
    });

    test("moves to step 2 after clicking Continue", () => {
        renderForm();

        fireEvent.change(
            screen.getByPlaceholderText(/Enter any destination/i),
            {
                target: { value: "Jaipur" },
            }
        );

        fireEvent.click(
            screen.getByRole("button", { name: /continue/i })
        );

        expect(
            screen.getByText(/How do you want to feel today/i)
        ).toBeInTheDocument();
    });
});