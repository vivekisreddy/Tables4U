
import { Restaurant } from './restaurant';
import {Reservation} from './restaurant';


export class Consumer{
    consumerID:string;
    name:string;
    email:string;
    reservations:Reservation[];
    ifActive:Restaurant[];

    constructor(consumerID:string, name:string, email:string, reservations:Reservation[], ifActive:Restaurant[]){
        this.consumerID = consumerID;
        this.name = name;
        this.email = email;
        this.reservations = reservations;
        this.ifActive = ifActive;
    }

}