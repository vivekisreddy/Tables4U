import { Manager } from '../manager';
import { ourDate } from '../restaurant';
import { Schedule, Table, Restaurant } from '../restaurant';

export class RestaurantController {
    private manager: Manager | null;

    constructor() {
        this.manager = null;
    }

    private validateCreateRestaurantInput(
        name: string,
        address: string,
        openTime: number,
        closeTime: number,
        numTables: number,
        seatsPerTable: number[]
    ): string | null {
        if (!name.trim()) return 'Restaurant name is required.';
        if (!address.trim()) return 'Address is required.';
        if (openTime < 0 || openTime > 24) return 'Invalid opening time. Must be between 0 and 24.';
        if (closeTime <= openTime || closeTime > 24)
            return 'Closing time must be after opening time and within 0-24 hours.';
        if (numTables <= 0 || numTables !== seatsPerTable.length || numTables > 8)
            return 'Number of tables must match the number of seat configurations and be between 1 and 8.';
        if (seatsPerTable.some((seats) => seats <= 0))
            return 'Each table must have at least one seat.';
        return null;
    }

    createRestaurant(
        name: string,
        address: string,
        openTime: number,
        closeTime: number,
        numTables: number,
        seatsPerTable: number[]
    ): string {
        const validationError = this.validateCreateRestaurantInput(
            name,
            address,
            openTime,
            closeTime,
            numTables,
            seatsPerTable
        );
        if (validationError) return validationError;

        const closedDays: ourDate[] = [];
        const dailySchedule: Schedule[] = [];

        try {
            // Generate a unique restaurant ID as a 4-digit number
            const restaurantID = Math.floor(1000 + Math.random() * 9000).toString();

            // Create a new Restaurant instance
            const newRestaurant = new Restaurant(
                name,
                address,
                restaurantID,
                false, // isActive
                openTime,
                closeTime,
                closedDays,
                [], // Tables will be added later
                dailySchedule
            );

            // Assign the manager
            this.manager = new Manager(name, newRestaurant);

            return `Restaurant "${name}" created successfully. Manager credentials: Name="${name}", ID="${restaurantID}".`;
        } catch (error) {
            return `Error creating restaurant: ${(error as Error).message}`;
        }
    }

    editRestaurant(
        name: string,
        address: string,
        openTime: number,
        closeTime: number,
        numTables: number,
        seatsPerTable: number[]
    ): string {

        try {
            const restaurant = this.manager.editRestaurant(
                name,
                address,
                openTime,
                closeTime,
                numTables,
                seatsPerTable
            );
            return `Restaurant "${restaurant.name}" edited successfully.`;
        } catch (error) {
            return `Error editing restaurant: ${(error as Error).message}`;
        }
    }
}
