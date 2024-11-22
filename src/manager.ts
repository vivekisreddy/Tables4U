
import { Restaurant } from './restaurant';
import { Table } from './restaurant';
import { Schedule } from './restaurant';

export class Manager {
    name: string;
    email: string;
    restaurant: Restaurant[];

    constructor(name: string, email: string, restaurant: Restaurant[]) {
        this.name = name;
        this.email = email;
        this.restaurant = restaurant;
    }

    createRestaurant(
        name: string,
        address: string,
        restaurantID: string,
        isActive: boolean,
        openTime: number[],
        closeTime: number[],
        closedDays: number[],
        tables: number,
        dailySchedule: Schedule[],
        seats: number[],
    ): Restaurant {
        const allTables: Table[] = [];

        if (tables <= 0 || tables !== seats.length || tables >= 8) {
            throw new Error("Number of tables must match the number of seat configurations.");
        }

        for (let i = 0; i < openTime.length; i++) {
            if (openTime[i] >= closeTime[i]) {
                throw new Error(`Opening time must be earlier than closing time for day ${i}.`);
            }
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
            isActive,
            openTime,
            closeTime,
            closedDays,
            allTables,
            dailySchedule
        );

        this.restaurant.push(newRestaurant);
        return newRestaurant;
    }

    activateRestaurant(restaurantID: string) : string { 
        const restaurant = this.restaurant.find((res) => res.restaurantID === restaurantID);
        if (!restaurant) {
          return "Restaurant not found.";
        }
        if (restaurant.isActive) {
          return "Restaurant is already active.";
        }
        restaurant.isActive = true;
        return `${restaurant.name} has been activated and is now visible to consumers.`;
    }
}

