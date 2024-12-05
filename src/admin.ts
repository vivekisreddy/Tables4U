import { Restaurant } from './restaurant';
import { Reservation } from './restaurant';

class Admin {
    adminID: string;
    name: string;
    email: string;
    restaurants: Restaurant[];
    reservations: Reservation[];

    constructor(adminID: string, name: string, email: string, restaurants: Restaurant[], reservations: Reservation[]) {
        this.adminID = adminID;
        this.name = name;
        this.email = email;
        this.restaurants = restaurants;
        this.reservations = reservations;
    }

    // Method to log in the admin
    logIn(email: string, pass: string): string {
        if (email === this.email) {
            if (pass === this.adminID) {
                return 'Login successful! Redirecting to admin home page.';
            } else {
                return 'Error: Password is incorrect.';
            }
        } else {
            return 'Error: An admin account with this email does not exist.';
        }
    }
}
