import React from "react";

const Total = (parts) => {
    const total = parts.parts.reduce((s, p) => {
        s = s + p.exercises
        return s
    }, 0)
    return(
        <div>
            <strong>total of {total} exercises</strong>
        </div>
    )
}

export default Total