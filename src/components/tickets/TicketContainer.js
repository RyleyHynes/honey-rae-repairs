import { useState } from "react"
import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"

export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState([""])

    return <> 
        <TicketSearch setterFunction={setSearchTerms} /> 
        <TicketList searchTermsState={searchTerms} />
    </>
}

/*
TicketSearch and TicketList cannot sent state to each other so they have to put them both together 
inside a parent component. Take the state you want to share between them, put it in the parent and then pass
the state to one component, pass the setterFunction to a different component (so that one can modify the 
state and one can do something with the state.) 
*/

/*
setterFunction and searchTermsState are props, you can think of them as object keys and values 
but the syntax for them is a little different, here we have variable equals value for both of these
*/