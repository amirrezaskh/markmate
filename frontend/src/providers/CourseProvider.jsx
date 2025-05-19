import { useEffect, useState } from "react";
import { CourseContext, ThemeContext } from "../contexts";

export default function CourseProvider({children}) {
    const [courses, setCourses] = useState([]);

    async function loadCourses () {
        const response = await fetch("http://localhost:8000/courses/",{
            method: "GET",
            headers: {
                "Authorization": `Token ${JSON.parse(sessionStorage.getItem("userInfo")).token}`,
                "Content-Type": "application/json"
            }
        });
        const data = await response.json()
        setCourses(data);
    }

    function addCourse(course) {
        setCourses(courses => [
            ...courses,
            course
        ])
    }

    function removeCourse(course) {
        setCourses(courses => courses.filter(eachCourse => eachCourse.id !== course.id));
    }

    return (
        <CourseContext.Provider value={{courses, addCourse, removeCourse, loadCourses}}>
            {children}
        </CourseContext.Provider>
    );
}