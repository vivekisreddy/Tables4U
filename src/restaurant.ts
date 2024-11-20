import { time } from "console"
import { Consumer } from "./consumer"

class TimeSlot {
    time: Number
    availableTables:Table[]
    reservedTables:Table[]
    
    constructor(time:number, availableTables:Table[], reservedTables:Table[]) {
        this.time = time
        this.availableTables = availableTables
        this.reservedTables = reservedTables
    }
}

class Date {
    year: Number
    month: String
    day: Number

    constructor(year:number, month:String, day:number) {
        this.year = year
        this.month = month
        this.day = day
    }
}

export class Table {
    ID: number
    seats: number

    constructor(ID:number, seats:number) {
        this.ID = ID
        this.seats = seats
    }
}

class Schedule {
    date: Date[]
    timeSlots: TimeSlot[]
    isClosed: Boolean
    
    constructor(date:Date[], timeSlots:TimeSlot[]) {
        this.date = date
        this.timeSlots = timeSlots
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


    constructor(name:String, address:String, restaurantID:String, openTime:number[], closeTime:number[], tables:Table[], dailySchedule:Schedule[], accessRes:Reservation[]) {
        this.name = name
        this.address = address
        this.restaurantID = restaurantID
        this.isActive = false
        this.openTime = Array(7).fill(openTime)
        this.closeTime = Array(7).fill(closeTime)
        this.tables = tables
        this.dailySchedule = dailySchedule
        this.accessRes = accessRes

    }
}

export class Reservation {
    confirmationCode:String
    consumer:Consumer
    table:Table
    reservationDate:Date
    reservationTime:TimeSlot
    partySize:Number

    constructor(confirmationCode:String, consumer:Consumer, table:Table, reservationDate:Date, reservationTime:TimeSlot, partySize:Number) {
        this.confirmationCode = confirmationCode
        this.consumer = consumer
        this.table = table
        this.reservationDate = reservationDate
        this.reservationTime = reservationTime
        this.partySize = partySize
    }
}