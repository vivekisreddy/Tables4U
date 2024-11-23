import { Consumer } from './consumer';

export class Restaurant {
    name: string;
    address: string;
    restaurantID: string;
    isActive: boolean;
    openTime: number;  
    closeTime: number; 
    closedDays: ourDate[];  
    tables: Table[];
    dailySchedule: Schedule[];

    constructor(
        name: string,
        address: string,
        restaurantID: string,
        isActive: boolean,
        openTime: number,  // Single open time for all days
        closeTime: number, // Single close time for all days
        closedDays: ourDate[],  // Array of ourDate for closed days
        tables: Table[],
        dailySchedule: Schedule[]
    ) {
        this.name = name;
        this.address = address;
        this.restaurantID = restaurantID;
        this.isActive = isActive;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.closedDays = closedDays;  // Assign closed days
        this.tables = tables;
        this.dailySchedule = dailySchedule;
    }
}

// Define the Reservation class
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

// Define the Table class
export class Table {
    tableID: string;
    seats: number;
    isAvailable: boolean;

    constructor(tableID: string, seats: number, isAvailable: boolean) {
        this.tableID = tableID;
        this.seats = seats;
        this.isAvailable = isAvailable;
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
