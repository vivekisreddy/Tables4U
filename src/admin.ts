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