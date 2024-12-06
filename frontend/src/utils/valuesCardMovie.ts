export const convertedMinutesToHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const minutesLeft = minutes % 60;
    
    return `${hours}h ${minutesLeft}min`;
}