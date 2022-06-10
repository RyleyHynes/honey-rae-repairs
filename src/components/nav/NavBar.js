import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
           //we need to get honey user out of local storage and right now its just a string 
    const localHoneyUser = localStorage.getItem("honey_user")
    //we need to convert it into an object so that we can use it in our code (now honeyUserObject will be an object with two keys on it ID and Staff)
    const honeyUserObject = JSON.parse(localHoneyUser)

    if (honeyUserObject.staff) {
        //return employee views
        return <EmployeeNav />
    }
    else {
        //return customer views 
        return <CustomerNav />
    }

}

