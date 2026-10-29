import Part from './Part'
const Content = ({ parts }) => {
  return (
    <div>
        <Part key={0} part={parts[0]} />
        <Part key={1} part={parts[1]} />
        <Part key={2} part={parts[2]} />
    </div>
  )
}

export default Content