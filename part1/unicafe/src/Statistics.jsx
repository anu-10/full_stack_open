import StatisticLine from './StatisticLine'
const Statistics = ({props}) => {
    const {good, neutral, bad} = props
    const empty = good === 0 && neutral === 0 && bad === 0
    return <>
        <h2><br />statistics<br /></h2>
        {(empty) ? <><br/>No feedback given</> : <>
            <table>
                <tbody>
                    <tr>
                        <StatisticLine text="good" value={good} />
                    </tr>
                    <tr>
                        <StatisticLine text="neutral" value={neutral} />
                    </tr>
                    <tr>
                        <StatisticLine text="bad" value={bad} />
                    </tr>
                    <tr>
                        <StatisticLine text="average" value={(good + bad) / Math.max(1, good + neutral + bad)} />
                    </tr>
                    <tr>
                        <StatisticLine text="positive" value={good / Math.max(1, good + neutral + bad) * 100} />
                    </tr>
                </tbody>
            </table>
            
        </>}
    </>
}

export default Statistics