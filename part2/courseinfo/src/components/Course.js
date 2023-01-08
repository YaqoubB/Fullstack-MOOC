

const Part = ({part}) => {
    return (
    <p>{part.name} {part.exercises} </p>
    )
  }
  
  const Total = ({parts}) => {
    const sum = parts.reduce((prev, current) => prev + current.exercises, 0)
    return (
      <div> total of {sum} exercises</div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <>
        <h2>{course.name} </h2>
        <div>
          {course.parts.map(part => 
          <Part key={part.id} part={part} /> 
          )}
        </div>
        <div>
          <Total parts={course.parts} />
        </div>
      </>
    )
  }

export default Course