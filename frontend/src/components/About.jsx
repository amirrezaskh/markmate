export default function About() {
    return (
        <div className="min-h-[calc(100vh-77px)] bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold">About MarkMate 👩🏼‍🏫</h1>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">🎯 Project Overview</h2>
                    <p>
                        <strong>MarkMate</strong> is an intelligent assignment grading platform designed to automate the evaluation of both coding and non-coding submissions. It streamlines the workflow for instructors by enabling easy assignment creation, test case management, and real-time grading — all from a simple interface.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">🚧 The Problem</h2>
                    <p>
                        Grading programming assignments manually is time-consuming and difficult to scale. With inconsistent submissions, edge cases, and tight academic schedules, educators often struggle to manage it all. MarkMate addresses this by automating the grading process, saving educators time while maintaining accuracy and fairness.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">⚙️ Features</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Instructor dashboard for managing courses and assignments</li>
                        <li>Upload and manage public/private test files</li>
                        <li>Auto-grading with test cases or LLM-based grading for non-code submissions</li>
                        <li>Student submission tracking and performance feedback</li>
                        <li>Deadline enforcement with time-zone-aware datetime parsing</li>
                        <li>Secure file uploads with Django and PostgreSQL backend</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">🛠️ Tech Stack</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>Frontend:</strong> React + Tailwind CSS</li>
                        <li><strong>Backend:</strong> Django + Django REST Framework</li>
                        <li><strong>Database:</strong> PostgreSQL</li>
                        <li><strong>AI Tools:</strong> Language Models for non-code auto-grading</li>
                        <li><strong>Dev Tools:</strong> Docker, REST APIs, GitHub</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">👥 Who It{"'"}s For</h2>
                    <p>
                        MarkMate is designed for educators, teaching assistants, and institutions seeking to reduce grading workload while maintaining flexibility and precision.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">🚀 Status & Future Plans</h2>
                    <p>
                        MarkMate is under active development. Planned enhancements include:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Rubric-based grading and detailed feedback</li>
                        <li>Visual analytics and performance charts</li>
                        <li>AI-driven personalized feedback</li>
                        <li>Role-based authentication and deployment to production</li>
                    </ul>
                </section>

                <section className="border-t border-gray-500 pt-6">
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        Built by Amirreza Sokhankhosh — aspiring Full Stack & AI Developer. Connect on <a className="underline" href="https://www.linkedin.com/in/amirreza-sokhankhosh-9b91901a8/" target="_blank" rel="noopener noreferrer">LinkedIn</a> or reach out via email.
                    </p>
                </section>
            </div>
        </div>
    );
}
