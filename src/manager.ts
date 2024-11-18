import { Restaurant } from "./restaurant"

export let managerList: Manager[] = []


export class Manager {
    name : String
    email : String
    restaurant : Restaurant

    constructor(title:String, mail:String, rest:Restaurant) {
        this.name = title
        this.email = mail
        this.restaurant = rest
        managerList.push(this)
    }
}