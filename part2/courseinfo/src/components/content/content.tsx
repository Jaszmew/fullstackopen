import React from "react"
import Part from "./part/part"

const Content = (courses) => {
    return (
        <div>
            <Part key={courses.courses.id} part={courses.courses.parts}/>
        </div>
    )
}

export default Content