import { CustomerForm } from "./CustomerForm"
import { EmployeeForm } from "./EmployeeForm"


export const Profile = () => {
//we need to get honey user out of local storage and right now its just a string 
    const localHoneyUser = localStorage.getItem("honey_user")
    //we need to convert it into an object so that we can use it in our code (now honeyUserObject will be an object with two keys on it ID and Staff)
    const honeyUserObject = JSON.parse(localHoneyUser)

    if (honeyUserObject.staff) {
        return <EmployeeForm />
    }
    else {
        
        return <CustomerForm />
    }

}

