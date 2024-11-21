import { Restaurant, Reservation } from "./restaurant"

export class Admin {
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

    // can there be more than one admin or are we assuming there can only be one?
    logIn(email:String, pass:String) {
        if (email == this.email) {
            if (pass == this.adminID) {
                // bring user to admin home page
            }
            else {
                // error = password is incorrect
            }
        }
        else {
            // an admin account with this email does not exist
        }
    }
}
