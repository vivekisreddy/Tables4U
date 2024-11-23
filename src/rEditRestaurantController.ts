import { Restaurant, Table } from "./restaurant";


function editName(r:Restaurant, text:string): Restaurant {
    let restaurant = new Restaurant(text, r.address, r.restaurantID, false, r.openTime, r.closeTime, r.closedDays, r.tables, r.dailySchedule);
    return restaurant
}

function editAddress(r:Restaurant, text:string): Restaurant {
    let restaurant = new Restaurant(r.name, text, r.restaurantID, false, r.openTime, r.closeTime, r.closedDays, r.tables, r.dailySchedule);
    return restaurant
}

function editHours(r:Restaurant, day:number, newHour:number, open:Boolean): Restaurant {
    if (open) {
        let hours = r.openTime
        hours[day] = newHour
        let restaurant = new Restaurant(r.name, r.address, r.restaurantID, false, hours, r.closeTime, r.closedDays, r.tables, r.dailySchedule);
        return restaurant
    } else  {
        let hours = r.closeTime
        hours[day] = newHour
        let restaurant = new Restaurant(r.name, r.address, r.restaurantID, false, r.openTime, hours, r.closedDays, r.tables, r.dailySchedule);
        return restaurant
    }
}

function editTables(r:Restaurant, table:Table, newSeat:number): Restaurant {
    let restaurant = new Restaurant(r.name, r.address, r.restaurantID, false, r.openTime, r.closeTime, r.closedDays, r.tables, r.dailySchedule);
    table.seats = newSeat
    return restaurant
}

export function controlEdits(which:number, restaurant:Restaurant) {
    let input:string = "" //from button
    let inputID:number = 0 //button ID
    let inputBoolean:Boolean = false// from button name
    if (which == 1) { // if name is edited
        editName(restaurant, input)
    } else if (which == 2) { // if address is edited
        editAddress(restaurant, input)
    } else if (which == 3) { // if hours are edited
        let day = Number(input)
        editHours(restaurant, inputID, day, inputBoolean)
    } else if (which == 4) { // if tables are edited
        let seats = Number(input)
        editTables(restaurant, restaurant.tables, )
    }
}