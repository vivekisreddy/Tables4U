import { Reservation, Restaurant } from "./restaurant"

export class Consumer {
    consumerID:String
    name:String
    email:String
    reservation:Reservation[]
    ifActive: Restaurant[]

    constructor(consumerID:String, name:String, email:String) {
        this.consumerID = consumerID
        this.name = name
        this.email = email
        this.reservation = completeReservation()
        this.ifActive = findActive()
    }
}