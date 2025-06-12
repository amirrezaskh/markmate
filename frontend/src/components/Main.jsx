import { useEffect, useState } from "react"
import { FaUser, FaEnvelope, FaUserTag, FaBook, FaClipboardCheck, FaClipboardList, FaCheckCircle } from "react-icons/fa"
import { Link } from "react-router"
import { useAssignment, useCourse } from "../hooks"
const BASE_URL = import.meta.env.VITE_API_URL;

export default function Main() {
    const { courses, loadCourses } = useCourse();
    const { assignments, loadAssignments } = useAssignment();
    const [submissions, setSubmissions] = useState([])
    
    useEffect(() => {
        (async () => {
            await loadCourses();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await loadAssignments();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${BASE_URL}/users/submissions/`,{
                method: "GET",
                headers: {
                    "Authorization": `Token ${JSON.parse(sessionStorage.getItem("userInfo")).token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json()
            setSubmissions(data);
        })();
    }, []);

    const coursesElements = courses.map((course, i) => (
        <Link
            to={`/course/${course.id}`}
            key={course.id || i}
            className="flex items-center gap-4 p-4 rounded-lg border border-sky-300 bg-gradient-to-r from-sky-50 to-sky-100 dark:from-sky-700 dark:to-sky-800 hover:from-sky-100 hover:to-sky-200 dark:hover:from-sky-600 dark:hover:to-sky-700 transition-shadow shadow-md hover:shadow-lg cursor-pointer"
        >
            <FaBook className="text-sky-500 dark:text-sky-300 text-xl flex-shrink-0" />
            <span className="font-semibold text-sky-900 dark:text-sky-200">{course.title}</span>
        </Link>
    ))

    const assignmentsElements = assignments.map((assignment, i) => (
        <Link
            to={`/assignment/${assignment.id}`}
            key={assignment.id || i}
            className="flex items-center gap-4 p-4 rounded-lg border border-purple-300 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-700 dark:to-purple-800 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-600 dark:hover:to-purple-700 transition-shadow shadow-md hover:shadow-lg cursor-pointer"
        >
            <FaClipboardList className="text-purple-500 dark:text-purple-300 text-xl flex-shrink-0" />
            <span className="font-semibold text-purple-900 dark:text-purple-200">{assignment.title}</span>
        </Link>
    ))

    const submissionsElements = submissions.map((submission, i) => (
        <li
            key={submission.id || i}
            className="flex items-center gap-4 p-4 rounded-lg border border-green-300 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-700 dark:to-green-800 hover:from-green-100 hover:to-green-200 dark:hover:from-green-600 dark:hover:to-green-700 transition-shadow shadow-md hover:shadow-lg cursor-pointer"
        >
            <FaCheckCircle className="text-green-500 dark:text-green-300 text-xl flex-shrink-0" />
            <span className="font-semibold text-green-900 dark:text-green-200">Submission #{submission.id}</span>
        </li>
    ))

    const userInfo = sessionStorage.getItem("userInfo");
    if (!userInfo) return null;
    const { first_name, username, email, role } = JSON.parse(userInfo);

    return (
        <main className="min-h-[calc(100vh-77px)] bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900">
                    <h2 className="text-2xl font-bold mb-5">My Courses</h2>
                    {courses.length === 0 ?
                        <p className="text-gray-500 dark:text-gray-400">No courses found.</p>
                        :
                        <div className="space-y-3">
                            {coursesElements}
                        </div>
                    }
                </section>

                <section className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900">
                    <h2 className="text-2xl font-bold mb-5">My Assignments</h2>
                    {assignments.length === 0 ?
                        <p className="text-gray-500 dark:text-gray-400">No assignments found.</p>
                        :
                        <div className="space-y-3">
                            {assignmentsElements}
                        </div>
                    }
                </section>

                <section className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900">
                    <h2 className="text-2xl font-bold mb-5">My Marks</h2>
                    {submissions.length === 0 ?
                        <p className="text-gray-500 dark:text-gray-400">No submissions found.</p>
                        :
                        <ul className="space-y-3">
                            {submissionsElements}
                        </ul>
                    }
                </section>

                <section className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900">
                    <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Profile Info</h2>

                    <div className="flex items-center space-x-6 mb-6">
                        <div className="w-20 h-20 rounded-full bg-sky-200 dark:bg-sky-700 flex items-center justify-center text-sky-600 dark:text-sky-300 text-3xl font-bold">
                            {username?.[0].toUpperCase()}
                        </div>
                        <div>
                            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{first_name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back!</p>
                        </div>
                    </div>

                    <div className="space-y-4 text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-3">
                            <FaUser className="text-yellow-500" />
                            <span className="font-semibold w-40">Username:</span>
                            <span className="flex-1 truncate">{username}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaEnvelope className="text-red-500" />
                            <span className="font-semibold w-40">Email:</span>
                            <span className="flex-1 truncate">{email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaUserTag className="text-purple-500" />
                            <span className="font-semibold w-40">Role:</span>
                            <span className="flex-1 capitalize">{role}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaBook className="text-sky-500" />
                            <span className="font-semibold w-40">Courses Enrolled:</span>
                            <span className="flex-1">{courses.length}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaClipboardCheck className="text-green-500" />
                            <span className="font-semibold w-40">Assignments Submitted:</span>
                            <span className="flex-1">{submissions.length}</span>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}