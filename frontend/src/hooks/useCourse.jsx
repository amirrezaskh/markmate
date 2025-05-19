import { useContext } from "react";
import { CourseContext } from "../contexts";

export default function useCourse() {
    return useContext(CourseContext);
}