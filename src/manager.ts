import { Restaurant } from './restaurant';
import { Table } from './restaurant';
import { Schedule } from './restaurant';
import { ourDate } from './restaurant'

export let managerList: Manager[] = [];

export class Manager {
    name: string;
    email: string;
    restaurant: Restaurant;

    constructor(name: string, email: string, restaurant: Restaurant) {
        this.name = name;
        this.email = email;
        this.restaurant = restaurant;
        managerList.push(this);
    }
    createRestaurant(
        name: string,
        address: string,
        restaurantID: string,
        isActive: boolean,
        openTime: number,  // Single open time for all days
        closeTime: number, // Single close time for all days
        closedDays: ourDate[],  // Array of closed days as ourDate[]
        tables: number,
        dailySchedule: Schedule[],  // Daily schedules with time slots
        seats: number[]  // Seats configuration for each table
    ): Restaurant {
        const allTables: Table[] = [];

        // Validate the number of tables and seat configurations
        if (tables <= 0 || tables !== seats.length || tables >= 8) {
            throw new Error("Number of tables must match the number of seat configurations.");
        }

        // Create tables based on seat configurations
        for (let i = 0; i < seats.length; i++) {
            const tableID = `T${i + 1}`;
            const seatsPerTable = seats[i];
            const table = new Table(tableID, seatsPerTable, true);  // Initially all tables are available
            allTables.push(table);
        }

        // Validate that opening time is earlier than closing time
        if (openTime >= closeTime) {
            throw new Error("Opening time must be earlier than closing time.");
        }

        // Create a new Restaurant instance
        const newRestaurant = new Restaurant(
            name,
            address,
            restaurantID,
            isActive,
            openTime,
            closeTime,
            closedDays,  // Use closedDays (ourDate[])
            allTables,
            dailySchedule
        );

        this.restaurant = newRestaurant;  // Set the manager's restaurant
        return newRestaurant;  // Return the newly created restaurant
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
