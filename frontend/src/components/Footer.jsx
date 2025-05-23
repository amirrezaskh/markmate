export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
        <div>
          <h4 className="font-semibold mb-2">About This Project</h4>
          <p>MarkMate is a full-stack web app for autograding assignments through agentic systems.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">About Me</h4>
          <p>Hi, I{"'"}m <strong>Amirreza 👋</strong>, a Full Stack Developer with a focus on AI-powered tools. I{"'"}m actively looking for opportunities in software engineering and AI.</p>
          <p className="mt-2">
            <a href="mailto:youremail@gmail.com" className="hover:underline">amirreza.skhn@gmail.com</a><br />
            <a href="https://yourportfolio.com" target="_blank" className="hover:underline">Portfolio</a> • <a href="https://www.linkedin.com/in/amirreza-sokhankhosh-9b91901a8/" target="_blank" className="hover:underline">LinkedIn</a> • <a href="https://github.com/amirrezaskh/markmate" target="_blank" className="hover:underline">GitHub</a>
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Tech Stack</h4>
          <p>Django, React, Tailwind CSS, PostgreSQL, Docker</p>
          <p className="mt-4">© 2025 Amirreza Sokhankhosh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
