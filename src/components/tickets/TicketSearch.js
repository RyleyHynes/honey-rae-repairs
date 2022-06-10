/*because we put the setter function as the parameter this TicketSearch component now has access to 
the setSearchTerms function via this property of setterFunction which is located in the TicketContainer*/
export const TicketSearch = ({setterFunction}) => {
    return (
        <div>
            <input 
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Enter search terms" />
        </div>
    )
}

/*the value of the setterFunction variable (being used as a parameter in the TicketSearch function) is now the 
setter function for the state variable in the parent */

