import { table } from "console";
import { Restaurant, Table } from "./restaurant";


function editName(r:Restaurant, text:String): Restaurant {
    let restaurant = new Restaurant(text, r.address, r.restaurantID, r.openTime, r.closeTime, r.tables, r.dailySchedule, r.accessRes);
    return restaurant
}

function editAddress(r:Restaurant, text:String): Restaurant {
    let restaurant = new Restaurant(r.name, text, r.restaurantID, r.openTime, r.closeTime, r.tables, r.dailySchedule, r.accessRes);
    return restaurant
}

function editHours(r:Restaurant, day:number, newHour:number, open:Boolean): Restaurant {
    let restaurant = new Restaurant(r.name, r.address, r.restaurantID, r.openTime, r.closeTime, r.tables, r.dailySchedule, r.accessRes);
    if (open) {
        restaurant.openTime[day] = newHour
    } else if (!open) {
        restaurant.closeTime[day] = newHour
    }
    return restaurant
}

function editTables(r:Restaurant, tableAmount:Table[], newSeat:number[]): Restaurant {
    let restaurant = new Restaurant(r.name, r.address, r.restaurantID, r.openTime, r.closeTime, tableAmount, r.dailySchedule, r.accessRes);
    for (let i = 0; i < newSeat.length; i ++) {
        for (let seatNum = 0; seatNum < newSeat[i]; seatNum ++) {
            restaurant.tables[seatNum].seats = newSeat[i]
        }
    }
    return restaurant
}

export function controlEdits(which:number, restaurant:Restaurant) {
    let input:String = "" //from button
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
        editTables(restaurant, restaurant.tables, [3, 2, 1])
    }
}