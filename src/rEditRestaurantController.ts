import { Restaurant } from "./restaurant";


function editName(r:Restaurant, text:String): Restaurant {
    let restaurant = new Restaurant;
    restaurant = r
    restaurant.name = text
    return restaurant
}

function editAddress(r:Restaurant, text:String): Restaurant {
    let restaurant = new Restaurant;
    restaurant = r
    restaurant.address = text
    return restaurant
}

function editHours(r:Restaurant, day:number, newHour:number, open:Boolean): Restaurant {
    let restaurant = new Restaurant;
    restaurant = r
    if (open) {
        restaurant.openTime[day] = newHour
    } else if (!open) {
        restaurant.closeTime[day] = newHour
    }
    return restaurant
}

function editTables(r:Restaurant, tableID:number, newSeat:number): Restaurant {
    let restaurant = new Restaurant;
    restaurant = r
    for (let table = 0; table < r.tables.length; table ++) {
        if (table.ID == tableID) {
            table.seats = newSeat
        }
    }
    return restaurant
}