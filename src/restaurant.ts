import { Consumer } from "./consumer"

class TimeSlot {
    time: Number
    availableTables:Table[]
    reservedTables:Consumer[]
    
    constructor(t:number, available:Table[], reserved:Consumer[]) {
        this.time = t
        this.availableTables = available
        this.reservedTables = reserved
    }
}

class Date {
    year: Number
    month: String
    day: Number

    constructor(y:number, m:String, d:number) {
        this.year = y
        this.month = m
        this.day = d
    }
}

export class Table {
    ID: number
    seats: number

    constructor(id:number, seat:number) {
        this.ID = id
        this.seats = seat
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
    openTime:number[]
    closeTime:number[]
    tables: Table[]
    dailySchedule: Schedule[]
    accessRes: Reservation[]


    constructor(title:String, add:String, id:String, opens:number[], closes:number[], table:Table[], schedule:Schedule[], res:Reservation[]) {
        this.name = title
        this.address = add
        this.restaurantID = id
        this.isActive = false
        this.openTime = Array(7).fill(opens)
        this.closeTime = Array(7).fill(closes)
        this.tables = table
        this.dailySchedule = schedule
        this.accessRes = res

    }
}

export class Reservation {
    confirmationCode:String
    consumer:Consumer
    table:Table
    reservationDate:Date
    reservationTime:TimeSlot
    partySize:Number

    constructor(code:String, client:Consumer, table:Table, date:Date, time:TimeSlot, party:Number) {
        this.confirmationCode = code
        this.consumer = client
        this.table = table
        this.reservationDate = date
        this.reservationTime = time
        this.partySize = party
    }
}