import React from "react"
import Content from "../content/content"
import Header from "../header"
import Total from "../content/total/total"

const Course = ({ courses }) => {
    console.log(courses)
    return (
        <div>
            {courses.map( course =>
                <div key={course.id}>
                    <Header course={course.name} />
                    <Content courses={course}/>
                    <Total parts={course.parts} />
                </div>
            )}
        </div>
    )
}

export default Course