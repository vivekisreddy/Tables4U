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
        openTime: number,  
        closeTime: number, 
        closedDays: ourDate[], 
        tables: number,
        dailySchedule: Schedule[],  
        seats: number[]  
    ): Restaurant {
        const allTables: Table[] = [];

        if (tables <= 0 || tables !== seats.length || tables >= 8) {
            throw new Error("Number of tables must match the number of seat configurations.");
        }

        if (openTime >= closeTime) {
            throw new Error("Opening time must be earlier than closing time.");
        }

         for (let i = 0; i < seats.length; i++) {
            const tableID = `T${i + 1}`;
            const seatsPerTable = seats[i];
            const table = new Table(tableID, seatsPerTable, true);  
            allTables.push(table);
        }

        const newRestaurant = new Restaurant(
            name,
            address,
            restaurantID,
            isActive = false,
            openTime,
            closeTime,
            closedDays,  
            allTables,
            dailySchedule
        );

        this.restaurant = newRestaurant;  
        return newRestaurant;  
    }

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

    editRestaurant(
        updatedName?: string,
        updatedAddress?: string,
        updatedOpenTime?: number,
        updatedCloseTime?: number,
        updatedClosedDays?: ourDate[],
        updatedTables?: Table[],
        updatedSchedule?: Schedule[]
    ): string {
        let changesMade = false; 
            if (updatedName) {
            this.restaurant.name = updatedName;
            changesMade = true;
        }

        return changesMade
            ? `${this.restaurant.name} has been successfully updated.`
            : "No changes were made to the restaurant.";
    }
}
