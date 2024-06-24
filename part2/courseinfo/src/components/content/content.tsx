import React from "react"
import Part from "./part/part"

const Content = (course) => {
    return (
        <div>
            {course.course.parts.map(part => 
                <Part key={part.id} part={part.name} exercises={part.exercises}/>
            )}
        </div>
    )
}

export default Content