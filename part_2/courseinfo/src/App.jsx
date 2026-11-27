import Course from "./components/Course";
import "./index.css";

const courses = [
  {
    name: "Half Stack application development",
    id: 1,
    parts: [
      { name: "Fundamentals of React", exercises: 10, id: 1 },
      { name: "Using props to pass data", exercises: 7, id: 2 },
      { name: "State of a component", exercises: 14, id: 3 },
      { name: "Redux", exercises: 11, id: 4 },
    ],
  },
  {
    name: "Node.js",
    id: 2,
    parts: [
      { name: "Routing", exercises: 3, id: 1 },
      { name: "Middlewares", exercises: 7, id: 2 },
    ],
  },
];

const App = () => (
  <main className="course-app">
    <header className="page-heading">
      <p className="eyebrow">Full Stack Open · Part 2</p>
      <h1>Web development curriculum</h1>
      <p className="intro">A quick overview of the topics and exercises in each course.</p>
    </header>
    <section className="course-list" aria-label="Courses">
      {courses.map((course) => <Course key={course.id} course={course} />)}
    </section>
  </main>
);

export default App;
