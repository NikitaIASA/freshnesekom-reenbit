export const sortByQuery = (list: string[], query: string): string[] => {
    const lowerCaseQuery = query.toLowerCase();
    return list.filter(item => item.toLowerCase().includes(lowerCaseQuery));
};
