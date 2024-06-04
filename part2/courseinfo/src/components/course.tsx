const Course = () => {

    const Header = (props) => {
        return (
            <div>
                <h1>{props.course.name}</h1>
            </div>
        )
    }
    
    const Part = (props) => {
        return (
            <div>
             <p>
                 {props.part} {props.exercises}
             </p> 
            </div> 
         )
    }
    
    const Content = (props) => {
        return (
            <div>
                <Part part = {props.course.parts[0].name} exercises = {props.course.parts[0].exercises}/>
                <Part part = {props.course.parts[1].name} exercises = {props.course.parts[1].exercises}/>
                <Part part = {props.course.parts[2].name} exercises = {props.course.parts[2].exercises}/>
            </div>
        )
    }
    
    const Total = (props) => {
        return (
           <div>
            <p>
                Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}
            </p>
           </div> 
        )
        
    }

}

export default Course