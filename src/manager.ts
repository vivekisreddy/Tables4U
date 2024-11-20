import { Restaurant } from "./restaurant"

export let managerList: Manager[] = []


export class Manager {
    name : String
    email : String
    restaurant : Restaurant

    constructor(name:String, email:String, restaurant:Restaurant) {
        this.name = name
        this.email = email
        this.restaurant = restaurant
        managerList.push(this)
    }
}