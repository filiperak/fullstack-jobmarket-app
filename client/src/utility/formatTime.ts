export const formatTime = (dateToLocale: string): string => {
    const now: Date = new Date();
    const pastDate: Date = new Date(dateToLocale);
    const timeDiff: number = now.getTime() - pastDate.getTime();

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const isToday = now.toDateString() === pastDate.toDateString();
    const isYesterday = days === 1 && now.getDate() - pastDate.getDate() === 1;

    if (isToday) {
        const hours = pastDate.getHours().toString().padStart(2, '0');
        const minutes = pastDate.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    } else if (isYesterday) {
        return "yesterday";
    } else {
        const day = pastDate.getDate().toString().padStart(2, '0');
        const month = (pastDate.getMonth() + 1).toString().padStart(2, '0');
        const year = pastDate.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    }
};
