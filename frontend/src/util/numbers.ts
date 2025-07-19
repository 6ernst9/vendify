export function formatNumber(value: number): string {
    const rounded = Math.round(value * 100) / 100;
    if (Number.isInteger(rounded)) {
        return rounded.toLocaleString('en-US');
    }
    return rounded.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

export function formatShortDate(dateString: string): string {
    const date = new Date(dateString);

    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${weekday}, ${day}.${month}.${year}`;
}

export function formatShortDateWithTime(dateString: string): string {
    const date = new Date(dateString);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${formatShortDate(dateString)}, ${hours}:${minutes}`;
}
