export const capitalizeTitle = (title: string): string => {
    const formattedTitle = title.replace(/([A-Z])/g, " $1").toLowerCase();
    return formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1);
};
