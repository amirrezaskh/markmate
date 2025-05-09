export default function Welcome() {
    return (
        <main className="h-[calc(100vh-84px)] bg-white dark:bg-gray-800 text-gray-900 dark:text-white flex items-center justify-center px-6">
          <div className="max-w-3xl text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Welcome to <span className="text-sky-500">Mark Mate 👨🏻‍🏫</span>
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-gray-600 dark:text-gray-300">
              Submit assignments, auto-grade with AI, and manage classes seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="px-6 py-3 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition"
              >
                Get Started
              </a>
              <a
                href="/about"
                className="px-6 py-3 border border-sky-500 text-sky-500 rounded-md hover:bg-sky-100 dark:hover:bg-gray-800 transition"
              >
                Learn More
              </a>
            </div>
          </div>
        </main>
      );
}