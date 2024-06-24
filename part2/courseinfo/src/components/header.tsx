import React from "react"

const Header = (props) => {
    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    )
}
    // const Total = (props) => {
    //     return (
    //        <div>
    //         <p>
    //             Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}
    //         </p>
    //        </div> 
    //     )
        
    // }

export default Header