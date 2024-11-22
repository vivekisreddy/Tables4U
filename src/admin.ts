
import { Restaurant } from './restaurant';
import {Reservation} from './restaurant';

class Admin{
    adminID:string;
    name:string;
    email:string;
    restaurant:Restaurant[];
    trackReservation:Reservation[];

    constructor(adminID:string, name:string, email:string, restaurant:Restaurant[], trackReservation:Reservation[]){
        this.adminID = adminID;
        this.name = name;
        this.email = email;
        this.restaurant = restaurant;
        this.trackReservation = trackReservation;
    }
    
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
