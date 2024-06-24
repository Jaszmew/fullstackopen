import React from "react";

const Total = (parts) => {
    console.log(parts)
    let total = 0
    parts.parts.map( part => 
        total = part.exercises + total
    )
    return(
        <div>
            <strong>total of {total} exercises</strong>
        </div>
    )
}

export default Total