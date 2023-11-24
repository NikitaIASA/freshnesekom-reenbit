export const scrollToTop = (
    elements: (HTMLElement | Window | null)[],
    smooth: boolean = false 
): void => {
    const behavior = smooth ? "smooth" : "auto";

    elements.forEach((element) => {
        if (element instanceof HTMLElement) {
            element.scrollTo({ top: 0, behavior });
        } else if (element instanceof Window) {
            document.documentElement.scrollTo({ top: 0, behavior });
        }
    });
};
