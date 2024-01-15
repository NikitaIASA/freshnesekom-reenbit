export const preventEnterSubmit: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
    }
};
