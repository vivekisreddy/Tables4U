import { Restaurant } from './restaurant';
import { Table } from './restaurant';
import { Schedule } from './restaurant';
import { ourDate } from './restaurant'

export let managerList: Manager[] = [];

export class Manager {
    name: string;
    email: string;
    restaurant: Restaurant;

    constructor(name: string, email: string, restaurant: Restaurant) {
        this.name = name;
        this.email = email;
        this.restaurant = restaurant;
        managerList.push(this);
    }
}
