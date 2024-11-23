
export class RestaurantController {
    createRestaurant(name: string, address: string, openTime:number, closeTime:number, numTables:number, seatsPerTable:number[]): string {
        if (!name || !address) {
            return "Error: Both restaurant name and address are required.";
        }
        if (openTime >= closeTime) {
            return "Error: Opening time must be earlier than closing time.";
        }
        if (numTables <= 0 || seatsPerTable.length !== numTables) {
            return "Error: Number of tables must match the number of seat configurations.";
        }

        const restaurantID = `REST-${Date.now()}`; // Generate a unique restaurant ID
        console.log(`Restaurant Created: ${name}, ${address}, ID: ${restaurantID}`);
        return `Restaurant "${name}" created successfully with ID: ${restaurantID}`;
    }

    /*
    editRestaurant(name:string, address:string, openTime:number, closeTime:number, numTables:number, seatsPerTable:number[]):string{
        
    }
    */
}