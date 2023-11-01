export const debounce = (func: (arg: string) => void, wait: number): (arg: string) => void => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (arg: string): void => {
        const later = (): void => {
            timeout = null;
            func(arg);
        };

        if (timeout !== null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(later, wait);
    };
};
