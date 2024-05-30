import { useState } from 'react'

const Button = (props) => {
    console.log(props)
    const { handleClick, text} = props
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Statistics = (props) => {
    let all = props.good + props.bad + props.neutral
    let average = (props.good + (props.bad * -1)) / all
    let positiveFB = (props.good / all) * 100

    if (!all) {
        return(
            <tbody>
                <tr>
                    <td>No feedback given yet</td>
                </tr>
            </tbody>
            
        )
    }

    return (
        <tbody>
            <StatisticLine text="good" value={props.good}/>
            <StatisticLine text = "neutral" value = {props.neutral}/>
            <StatisticLine text = "bad" value = {props.bad}/>
            <StatisticLine text = "all" value = {all}/>
            <StatisticLine text = "average" value = {average}/>
            <StatisticLine text = "positive" value = {positiveFB}/>
        </tbody>
    )
}

const StatisticLine = (props) => {
    return (
        <tr><td>{props.text} {props.value}</td></tr>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const goodClick = () => {
        setGood(good + 1)
    }

    const badClick = () => {
        setBad(bad + 1)
    }

    const neutClick = () => {
        setNeutral(neutral + 1)
    }

    return (
        <div>
            <h1>Give feedback</h1>
            <Button handleClick={goodClick} text="good"/>
            <Button handleClick={neutClick} text="neutral"/>
            <Button handleClick={badClick} text="bad"/>
            <h1>Statistics</h1>
            <table>
                <Statistics 
                good = {good}
                bad = {bad}
                neutral = {neutral}
                />
            </table>
        </div>
    )
}

export default App