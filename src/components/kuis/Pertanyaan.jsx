import React, { useEffect, useState, useRef } from "react";
import "../../App.css";

const Pertanyaan = ({ pertanyaan, jawaban, pilihJawaban, onAnswerSelect }) => {
  // Ref untuk menyimpan soal sebelumnya
  const pertanyaanSebelumnyaRef = useRef(null);

  // State untuk menyimpan array jawaban yang telah diacak
  const [acakJawaban, setAcakJawaban] = useState([]);

  // State untuk menyimpan banyak array jawaban yang telah diacak

  // Mengacak array jawaban hanya jika soal berubah
  useEffect(() => {
    if (pertanyaanSebelumnyaRef.current !== pertanyaan) {
      const acakArray = [...jawaban]; // Buat salinan array answers
      acakArray.sort(() => Math.random() - 0.5); // Mengacak urutan array
      setAcakJawaban(acakArray); // Menyimpan array yang telah diacak ke dalam state
      pertanyaanSebelumnyaRef.current = pertanyaan; // Memperbarui soal sebelumnya dengan soal saat ini
    }
  }, [jawaban, pertanyaan]);

  return (
    <div className="w-full h-auto text-white font-mono font-semibold">
      <h1 className="text-6xl">Soal</h1>
      <br />
      <h2 className="text-4xl">{pertanyaan}</h2>
      <br />
      <ul>
        {acakJawaban.map((jawaban, index) => (
          <li
            key={index}
            className={`${
              jawaban === pilihJawaban ? "bg-green-500" : ""
            } cursor-pointer mb-4 text-xl lg:text-4xl`}
            onClick={() => onAnswerSelect(jawaban)}
          >
            {jawaban}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pertanyaan;
