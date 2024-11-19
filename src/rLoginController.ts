import { Manager, managerList } from "./manager";
import { Restaurant } from "./restaurant";

function LogIn(name: String, inputID: String) : Boolean {
    for (let i = 0; i < managerList.length; i ++) {
        let manager: Manager = managerList[i]
        if (manager.name = name) {
            if (manager.restaurant.restaurantID == inputID) {
                return true
            }
        }
    }
    return false
}