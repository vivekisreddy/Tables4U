import { Consumer } from "./consumer"

class TimeSlot {
    time: Number
    availableTables:Table[]
    
    constructor(t:number, tables:Table[]) {
        this.time = t
        this.availableTables = tables
    }
}

class Date {
    year: Number
    month: Number
    day: Number

    constructor(y:number, m:number, d:number) {
        this.year = y
        this.month = m
        this.day = d
    }
}

class Table {
    ID: number
    seats: number
    isAvailable: Boolean

    constructor(id:number, seat:number) {
        this.ID = id
        this.seats = seat
        this.isAvailable = true
    }
}

class Schedule {
    date: Date[]
    timeSlots: TimeSlot[]
    isClosed: Boolean
    
    constructor(calendar:Date[], times:TimeSlot[]) {
        this.date = calendar
        this.timeSlots = times
        this.isClosed = false
    }
}


export class Restaurant {
    name: String
    address: String
    restaurantID: String
    isActive: Boolean
    openTime:[]
    closeTime:[]
    tables: Table[]
    dailySchedule: Schedule[]


    constructor(title:String, add:String, id:String, opens:[], closes:[], table:Table[], schedule:Schedule[]) {
        this.name = title
        this.address = add
        this.restaurantID = id
        this.isActive = false
        this.openTime = opens
        this.closeTime = closes
        this.tables = table
        this.dailySchedule = schedule

    }
}

export class Reservation {
    confirmationCode:String
    consumer:Consumer
    restaurant:Restaurant
    table:Table
    reservationDate:Date
    reservationTime:Number
    partySize:Number

    constructor(code:String, client:Consumer, rest:Restaurant, table:Table, date:Date, time:Number, party:Number) {
        this.confirmationCode = code
        this.consumer = client
        this.restaurant = rest
        this.table = table
        this.reservationDate = date
        this.reservationTime = time
        this.partySize = party
    }
}