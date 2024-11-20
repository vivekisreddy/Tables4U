import { Restaurant, Reservation } from "./restaurant"

export class admin {
    adminID:String
    name:String
    email:String
    restaurants:Restaurant[]
    trackReservation:Reservation[]

    constructor(adminID:String, name:String, email:String) {
        this.adminID = adminID
        this.name = name
        this.email = email
        this.restaurants = findRestaraunts()
        this.trackReservation = findReservations()
    }
}