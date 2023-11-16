export const scrollToTop = (...elements: (HTMLElement | Window | null)[]): void => {
    elements.forEach((element) => {
        if (element instanceof HTMLElement) {
            element.scrollTo({ top: 0, behavior: "smooth" });
        } else if (element instanceof Window) {
            document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
};
