const formattedHours = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    return new Date(date).toLocaleTimeString([], options);
};

const formatedDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };
    return new Date(date).toLocaleDateString([], options);
};

export { formattedHours, formatedDate };