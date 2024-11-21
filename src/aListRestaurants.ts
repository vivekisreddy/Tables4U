import { Restaurant } from "./restaurant";

export class AdminController { 
    private restaurants : Restaurant[] // i think it can only be accessed by the admin class

    constructor(restaurants: Restaurant[]) { 
        this.restaurants = restaurants
    }

    listRestaurants() : Restaurant[] { 
        return this.restaurants // returns an array of restaurants 
    }
}

