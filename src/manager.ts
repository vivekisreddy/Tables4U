import { Restaurant } from './restaurant';
import {Table} from './restaurant'
import { Schedule } from './restaurant'
import {WeeklyOpenSchedule} from './restaurant'

class Manager{
    name:string;
    email:string;
    restaurant:Restaurant[];

    constructor(name:string, email:string, restaurant:Restaurant[]){
        this.name = name;
        this.email = email;
        this.restaurant = restaurant;
    }


    createRestaurant(name:string, address:string, restaurantID:string, isActive:boolean, openTime:number[], closeTime:number[], closedDays:number[], tables:number, dailySchedule: Schedule[], seats: number[], ifClosed:boolean[]){
        const allTables: Table[] = [];
        const weeklySchedule:WeeklyOpenSchedule[] = [];

        for (let i = 0; i < seats.length; i++) {
            const tableID = `T${i + 1}`; 
            const seatsPerTable = seats[i];  
            const table = new Table(tableID, seatsPerTable, true);  
            allTables.push(table);  
        }

        //mon = 0; sun = 6
        for(let i = 0; i < 7; i++){
            const openTimePerDay = openTime[i];
            const closeTimePerDay = closeTime[i];
            const ifClosedPerDay = ifClosed[i];
            const weeklySchPerDay = new WeeklyOpenSchedule(openTimePerDay, closeTimePerDay, ifClosedPerDay);
            weeklySchedule.push(weeklySchPerDay)
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
            dailySchedule,
            weeklySchedule,
        );

        this.restaurant.push(newRestaurant);
        return newRestaurant;


    }
}