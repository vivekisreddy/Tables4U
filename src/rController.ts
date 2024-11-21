import {Restaurant} from './restaurant'

function createName(r:Restaurant, text:string){
    let restaurant = new Restaurant(text, r.address, r.restaurantID, r.isActive, r.openTime, r.closeTime, r.closedDays, r.tables, r.dailySchedule)
    return restaurant;
}
