import { Reservation, Restaurant } from "./restaurant"

export class Consumer {
    consumerID:String
    name:String
    email:String
    reservation:Reservation[]
    viewRestaurants: Restaurant[]

    constructor(id:String, title:String, mail:String) {
        this.consumerID = id
        this.name = title
        this.email = mail
        this.reservation = completeReservation()
        this.viewRestaurants = findActive()
    }
}