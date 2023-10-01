import React from "react";
import "../../App.css";
import("preline");

const NavKuis = ({currentQuestion,totalQuestions,onNextClick,onPrevClick,}) => {
  return (
    <div className="w-full h-auto flex justify-between py-4">
      <button
        onClick={onPrevClick}
        disabled={currentQuestion === 0}
        type="button"
        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
      >
        Sebelumnya
      </button>
      <button
        onClick={onNextClick}
        disabled={currentQuestion === totalQuestions - 1}
        type="button"
        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
      >
        Berikutnya
      </button>
    </div>
  );
};

export default NavKuis;
