export const debounce = <T extends unknown[]>(
    func: (...args: T) => void,
    wait: number
): (...args: T) => void => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: T): void => {
        const later = (): void => {
            timeout = null;
            func(...args);
        };

        if (timeout !== null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(later, wait);
    };
};
