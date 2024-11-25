import { Consumer } from './consumer';

export class Restaurant {
    name: string;
    address: string;
    openTime: number;  
    closeTime: number; 
    closedDays: ourDate[];  
    tables: Table[];
    isActive: boolean;

    constructor(
        name: string,
        address: string,
        openTime: number,  // Single open time for all days
        closeTime: number, // Single close time for all days
        closedDays: ourDate[],  // Array of ourDate for closed days
        tables: Table[],
        isActive: boolean,

    ) {
        this.name = name;
        this.address = address;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.closedDays = closedDays;  // Assign closed days
        this.tables = tables;
        this.isActive = isActive;
    }
}


export class Table {
    tableID: string;
    seats: number;
    constructor(tableID: string, seats: number) {
        this.tableID = tableID;
        this.seats = seats;
    }
}

export class Reservation {
    confirmationCode: string;
    consumer: Consumer[];
    restaurant: Restaurant[];
    table: Table[];
    reservationDate: number;
    reservationTime: number;
    partySize: number;

    constructor(
        confirmationCode: string,
        consumer: Consumer[],
        restaurant: Restaurant[],
        table: Table[],
        reservationDate: number,
        reservationTime: number,
        partySize: number
    ) {
        this.confirmationCode = confirmationCode;
        this.consumer = consumer;
        this.restaurant = restaurant;
        this.table = table;
        this.reservationDate = reservationDate;
        this.reservationTime = reservationTime;
        this.partySize = partySize;
    }
}


// Define the Schedule class
export class Schedule {
    date: ourDate;  // Single date for schedule
    timeSlots: TimeSlot[];
    isClosed: boolean;

    constructor(date: ourDate, timeSlots: TimeSlot[], isClosed: boolean) {
        this.date = date;
        this.timeSlots = timeSlots;
        this.isClosed = isClosed;
    }
}

// Define the ourDate class
export class ourDate {
    month: number;
    day: number;
    year: number;

    constructor(month: number, year: number, day: number) {
        this.month = month;
        this.year = year;
        this.day = day;
    }
}

class TimeSlot {
    time: number;
    availableTables: Table[];
    reservedTables: Consumer[];

    constructor(time: number, availableTables: Table[], reservedTables: Consumer[]) {
        this.time = time;
        this.availableTables = availableTables;
        this.reservedTables = reservedTables;
    }
}
