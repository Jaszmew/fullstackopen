import Header from "./components/header"
import Content from "./components/content/content"
import Total from "./components/content/total/total"
// 1h30min

const Course = ({ course }) => (
    <div>
        <Header course= { course } />
    </div>
)

const App = () => {
    const course = {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        }
      ]
    }
  
    return (
        <div>
            <Course course={course} />
            <Content course={course} />
            <Total parts={course.parts} />
        </div>
    )
  }
  
  export default App