import { JobType } from "./jobFetch";

export const dayToLetter = ["N/A", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const monthToLetter = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const monthToLetterFull = ["N/A", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function dateMaker(job: JobType) {
    const date = new Date(job.year, job.month-1, job.day);
    const nowDate = new Date();
    let dateString: string;
    if (nowDate.getDate()+1 == job.day && nowDate.getFullYear() === job.year) {
        dateString = "Tomorrow"
    } else {
        dateString = `${dayToLetter[date.getDay()]}, ${monthToLetter[date.getMonth()]} ${job.day}, ${job.year}`;
    }
    return(`${dateString}. ${job.hour}:${job.minute<10?"0":""}${job.minute} ${job.pm ? "PM" : "AM"}`);
}

export function getDaysInAmonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
};