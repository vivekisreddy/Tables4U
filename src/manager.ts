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

    createTables(seats:number[]):Table[] {
        const allTables: Table[] = [];
        for (let i = 0; i < seats.length; i++) {
            const tableID = `T${i + 1}`;
            const seatsPerTable = seats[i];
            const table = new Table(tableID, seatsPerTable, true);  
            allTables.push(table);
        }
        return allTables
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

        if (tables <= 0 || tables !== seats.length || tables >= 8) {
            throw new Error("Number of tables must match the number of seat configurations.");
        }

        if (openTime >= closeTime) {
            throw new Error("Opening time must be earlier than closing time.");
        }

        const newRestaurant = new Restaurant(
            name,
            address,
            restaurantID,
            isActive = false,
            openTime,
            closeTime,
            closedDays,  
            this.createTables(seats),
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
        updatedName: string,
        updatedAddress: string,
        updatedOpenTime: number,
        updatedCloseTime: number,
        tables:number,
        SeatsPerTable:number[]
    ): Restaurant {
        if (tables <= 0 || tables !== SeatsPerTable.length || tables >= 8) {
            throw new Error("Number of tables must match the number of seat configurations.");
        }
        let changesMade = false; 
        if (!changesMade) {
            this.restaurant.name = updatedName;
            this.restaurant.address = updatedAddress;
            this.restaurant.openTime = updatedOpenTime;
            this.restaurant.closeTime = updatedCloseTime;
            this.restaurant.tables = this.createTables(SeatsPerTable);
            changesMade = true;
            return this.restaurant
        }
        return this.restaurant
    }
}
