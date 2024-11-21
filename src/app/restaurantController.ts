export class RestaurantController {
    createRestaurant(name: string, address: string): string {
        if (!name || !address) {
            return "Error: Both restaurant name and address are required.";
        }

        // Simulate saving the restaurant to a database
        const restaurantID = `REST-${Date.now()}`; // Generate a unique restaurant ID
        console.log(`Restaurant Created: ${name}, ${address}, ID: ${restaurantID}`);

        // Return success message
        return `Restaurant "${name}" created successfully with ID: ${restaurantID}`;
    }
}
