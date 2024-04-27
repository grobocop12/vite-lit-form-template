export function parseDateString(dateString: string | undefined): Date | undefined {
    if (dateString) {
        return new Date(dateString);
    } else {
        return undefined;
    }
}

export function differenceInDays(date1: Date, date2: Date): number {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const differenceInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
    const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsPerDay);
    return differenceInDays;
}