import { Restaurant } from './restaurant';
import {Table} from './restaurant'


class Manager{
    name:string;
    email:string;
    restaurants:Restaurant[];

    constructor(name:string, email:string, restaurant:Restaurant[]){
        this.name = name;
        this.email = email;
        this.restaurants = [];
    }


    createRestaurant(name:string, address:string, restaurantID:string, openTime:number, closeTime:number, closedDays:number[], tableCount:number, seats: number[], ifClosed:boolean[]) : Restaurant {
        // Validate table count and seat configuration
    if (tableCount <= 0 || tableCount !== seats.length) {
        throw new Error("Number of tables must match the number of seat configurations.");
      }
  
      // Validate restaurant times
      if (openTime >= closeTime) {
        throw new Error("Opening time must be earlier than closing time.");
      }
  
      // Create tables
      const tables: Table[] = [];
      for (let i = 0; i < tableCount; i++) {
        const tableID = `T${i + 1}`; // Unique table ID
        const table = new Table(tableID, seats[i]); // Seats are validated in Table constructor
        tables.push(table);
      }

      const newRestaurant = new Restaurant (name, address, restaurantID, openTime, closeTime, closedDays, tables)
  
     
      // Add to manager's list of restaurants
      this.restaurants.push(newRestaurant);
  
      return newRestaurant;
    }

    activateRestaurant(restaurantID: string) : string { 
    const restaurant = this.restaurants.find((res) => res.restaurantID === restaurantID);
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