import {Consumer} from './consumer'

export class Restaurant{
    name : string;
    address : string;
    restaurantID : string;
    isActive : boolean;
    openTime: number[];
    closeTime: number[];
    closedDays: number[];
    tables: Table[];
    dailySchedule: Schedule[];

    constructor(name:string, address:string, restaurantID:string, isActive:boolean, openTime:number[], closeTime:number[], closedDays:number[], tables:Table[], dailySchedule:Schedule[]){
        this.name = name;
        this.address = address;
        this.restaurantID = restaurantID;
        this.isActive = false;
        this.openTime = openTime;   //how to do this correctly. how do i make it so each restaurant date as a different number.
        this.closeTime = closeTime;
        this.closedDays = closedDays;
        this.tables = tables;
        this.dailySchedule = dailySchedule;
    }
}

export class Reservation{
    confirmationCode:string;
    consumer:Consumer[];
    restaurant:Restaurant[];
    table:Table[];
    reservationDate:number;
    reservationTime:number;
    partySize:number;

    constructor(confirmationCode:string, consumer:Consumer[], restaurant:Restaurant[], table:Table[], reservationDate:number, reservationTime:number, partySize:number){
        this.confirmationCode = confirmationCode;
        this.consumer = consumer;
        this.restaurant = restaurant;
        this.table = table;
        this.reservationDate = reservationDate;
        this.reservationTime = reservationTime;
        this.partySize = partySize;
    }
}

export class Table{
    tableID:string;
    seats:number;
    isAvailable:boolean;

    constructor(tableID:string, seats:number, isAvailable:boolean){
        this.tableID = tableID;
        this.seats = seats;
        this.isAvailable = isAvailable;
    }
}


export class Schedule{
    date:ourDate[];
    timeSlots:TimeSlot[];
    isClosed:boolean;

    constructor(date:ourDate[], timeSlots:TimeSlot[], isClosed:boolean){
        this.date = date;
        this.timeSlots = timeSlots;
        this.isClosed = isClosed;
    }
}

class ourDate{
    year:number;
    month:string;
    day:number;

    constructor(year:number, month:string, day:number){
        this.year = year;
        this.month = month;
        this.day = day;
    }
}


class TimeSlot{
    time:number;
    availableTables:Table[];
    reservedTables:Consumer[];

    constructor(time:number, availableTables:Table[], reservedTables:Consumer[]){
        this.time = time;
        this.availableTables = availableTables;
        this.reservedTables = reservedTables;
    }

}
