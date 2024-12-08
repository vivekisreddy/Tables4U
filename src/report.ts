export class Report {
    date: string;
    time: number;
    utilization: number;
    availability: number;

    constructor (
        date: string,
        time: number,
        utilization: number,
        availability: number,
    ) {
        this.date = date;
        this.time = time;
        this.utilization = utilization;
        this.availability = availability;
    }
}