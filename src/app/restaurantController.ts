import { Manager } from '../manager';
import { ourDate } from '../restaurant';
import { Schedule, Table } from '../restaurant';

export class RestaurantController {
    private manager: Manager | null;

    constructor() {
        this.manager = null; 
    }

    setManager(manager: Manager) {
        this.manager = manager;
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
        if (!this.manager) {
            return 'No manager is assigned to create a restaurant.';
        }

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
            const restaurant = this.manager.createRestaurant(
                name,
                address,
                `R${Date.now()}`, 
                false, 
                openTime,
                closeTime,
                closedDays,
                numTables,
                dailySchedule,
                seatsPerTable
            );
            return `Restaurant "${restaurant.name}" created successfully.`;
        } catch (error) {
            return `Error creating restaurant: ${(error as Error).message}`;
        }
    }
}


