import { AssignmentDetail, NavBar, SubmissionForm, Submissions, Footer } from "../components"

export default function AssignmentPage() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
            <NavBar />
            <div className="min-h-screen">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                        <AssignmentDetail/>
                    </section>
                    <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                        <SubmissionForm/>
                    </section>
                    <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                        <Submissions/>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    )
}