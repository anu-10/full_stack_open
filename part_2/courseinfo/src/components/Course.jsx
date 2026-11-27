const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <article className="course-card">
      <div className="course-card__heading">
        <div>
          <p className="eyebrow">Course</p>
          <h2>{course.name}</h2>
        </div>
        <span className="course-total">{course.parts.length} topics</span>
      </div>
      <ul className="part-list">
        {course.parts.map((part) => (
          <li className="part-row" key={part.id}>
            <span>{part.name}</span>
            <span className="part-count">{part.exercises} exercises</span>
          </li>
        ))}
      </ul>
      <footer className="course-card__footer">
        <span>Total exercises</span>
        <strong>{total}</strong>
      </footer>
    </article>
  );
};

export default Course;
