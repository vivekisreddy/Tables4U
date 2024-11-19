import { Restaurant, Reservation } from "./restaurant"

export class admin {
    adminID:String
    name:String
    email:String
    restaurants:Restaurant[]
    trackReservation:Reservation[]

    constructor(id:String, title:String, mail:String) {
        this.adminID = id
        this.name = title
        this.email = mail
        this.restaurants = findRestaraunts()
        this.trackReservation = findReservations()
    }
}