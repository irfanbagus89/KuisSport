import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import("preline");

const Home = () => {
  return (
    <main className="w-full h-auto">
      {/* <!-- Hero --> */}
      <div className="bg-slate-900 h-screen max-h-screen w-full flex flex-col items-center justify-center">
        <div className="bg-gradient-to-b from-violet-600/[.15] via-transparent">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
            {/* <!-- Title --> */}
            <div className="max-w-3xl text-center mx-auto">
              <h1 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Selamat Datang Di Kuis Sport
              </h1>
            </div>
            {/* <!-- End Title --> */}

            <div className="max-w-3xl text-center mx-auto">
              <p className="text-lg text-gray-400">
                Preline is a large open-source project, crafted with Tailwind
                CSS framework by Hmlstream.
              </p>
            </div>

            {/* <!-- Buttons --> */}
            <div className="text-center">
              <Link
                to={"/kuis"}
                className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800"
                href="#"
              >
                Get started
              </Link>
            </div>
            {/* <!-- End Buttons --> */}
          </div>
        </div>
      </div>
      {/* <!-- End Hero --> */}
    </main>
  );
};

export default Home;
