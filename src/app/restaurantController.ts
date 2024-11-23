export class RestaurantController {
    createRestaurant(name: string, address: string, openTime:number, closeTime:number, numTables:number, seatsPerTable:number[]): string {
        if (!name || !address) {
            return "Error: Both restaurant name and address are required.";
        }
        const restaurantID = `REST-${Date.now()}`; // Generate a unique restaurant ID
        console.log(`Restaurant Created: ${name}, ${address}, ID: ${restaurantID}`);
        return `Restaurant "${name}" created successfully with ID: ${restaurantID}`;
    }
}