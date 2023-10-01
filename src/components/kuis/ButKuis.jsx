import React from "react";
import "../../App.css";

const ButKuis = ({ index, pertanyaanSaatIni, onClick, jawabanUser }) => {
  const isAnswered = jawabanUser[index] !== ""; // Mengecek apakah pertanyaan telah dijawab
  const isActive = pertanyaanSaatIni === index; // Mengecek apakah nomor soal sedang aktif

  // Mengatur warna berdasarkan apakah pertanyaan telah dijawab atau aktif
  const buttonClassName = isAnswered
    ? "bg-green-500 text-white"
    : isActive
    ? "bg-blue-500 text-white"
    : "bg-gray-300";

  return (
    <button
      className={`w-14 h-20 rounded-xl text-xl focus:outline-none ${buttonClassName}`}
      onClick={() => onClick(index)}
    >
      {index + 1}
    </button>
  );
};

export default ButKuis;
