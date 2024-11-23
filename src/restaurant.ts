import { Consumer } from './consumer';

// Define the Restaurant class
export class Restaurant {
    name: string;
    address: string;
    restaurantID: string;
    isActive: boolean;
    openTime: number;  // Single open time for all days
    closeTime: number; // Single close time for all days
    closedDays: ourDate[];  // Array of ourDate for closed days
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

// Define the TimeSlot class
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

// Define the Manager class
export class Manager {
    name: string;
    email: string;
    restaurant: Restaurant;

    constructor(name: string, email: string, restaurant: Restaurant) {
        this.name = name;
        this.email = email;
        this.restaurant = restaurant;
    }

    // Create a new restaurant, with option to specify closed days
    createRestaurant(
        name: string,
        address: string,
        restaurantID: string,
        isActive: boolean,
        openTime: number,
        closeTime: number,
        closedDates: ourDate[],  // Specific closed dates as an array of `ourDate`
        tables: number,
        dailySchedule: Schedule[],
        seats: number[]
    ): Restaurant {
        const allTables: Table[] = [];

        // Validate the table count and seat configuration
        if (tables <= 0 || tables !== seats.length || tables >= 8) {
            throw new Error("Number of tables must match the number of seat configurations.");
        }

        // Validate opening and closing times
        if (openTime >= closeTime) {
            throw new Error("Opening time must be earlier than closing time.");
        }

        // Create tables based on seat configurations
        for (let i = 0; i < seats.length; i++) {
            const tableID = `T${i + 1}`;
            const seatsPerTable = seats[i];
            const table = new Table(tableID, seatsPerTable, true);
            allTables.push(table);
        }

        // Create the restaurant object with the specified closed days
        const newRestaurant = new Restaurant(
            name,
            address,
            restaurantID,
            isActive,
            openTime,
            closeTime,
            closedDates,  // Use the closed dates array
            allTables,
            dailySchedule
        );

        this.restaurant = newRestaurant;
        return newRestaurant;
    }

    // Activate the restaurant
    activateRestaurant(): string {
        if (!this.restaurant) {
            return "Restaurant not found.";
        }
        if (this.restaurant.isActive) {
            return "Restaurant is already active.";
        }
        this.restaurant.isActive = true;
        return `${this.restaurant.name} has been activated and is now visible to consumers.`;
    }
}
