import React from "react";
import { useLocation,Link } from "react-router-dom";
import "../App.css";

const ReviewKuis = () => {
  const location = useLocation();
  const { reviewData } = location.state;

  // Menghitung statistik jumlah benar, jumlah salah, dan jumlah yang dijawab
  const totalJawaban = reviewData.length;
  const jumlahBenar = reviewData.filter(
    (data) => data.benar === "benar"
  ).length;
  const jumlahSalah = reviewData.filter(
    (data) => data.benar === "salah"
  ).length;
  const jumlahDijawab = reviewData.filter(
    (data) => data.jawabanAnda !== "Tidak dijawab"
  ).length;

  return (
    <div className="w-full min-h-screen py-8 px-4 xl:px-32 bg-slate-900 font-mono text-white">
      <div className="w-full h-auto mb-16 p-4 text-xl font-medium bg-gradient-to-b from-violet-600/[.15] via-transparent shadow-xl">
        <h1 className="text-6xl text-center font-bold">
          Review Jawaban Anda
        </h1>
        <h2>Jumlah Benar = {jumlahBenar}</h2>
        <h2>Jumlah Salah = {jumlahSalah}</h2>
        <h2>Jumlah Yang Dijawab = {jumlahDijawab}</h2>
        <h2 className="mb-8">Total Pertanyaan: {totalJawaban}</h2>
        <Link to={'/'} className="w-full h-14 bg-red-500 block text-3xl text-center font-bold text-white">Review Selesai</Link>
      </div>
      <div className="w-full h-auto flex flex-col gap-10">
        {reviewData.map((data, index) => (
          <div
            className="w-full h-auto text-xl p-4 bg-gradient-to-b from-violet-600/[.15] via-transparent shadow-xl flex flex-col gap-4"
            key={index}
          >
            <h1 className="text-4xl font-bold">Soal Ke {index + 1} </h1>
            <h2 className="text-2xl font-semibold">{data.pertanyaan}</h2>
            <div className="w-full h-auto flex flex-col gap-4">
              {data.jawabanSemua.map((jawaban, index) => {
                const isJawabanBenar = jawaban === data.jawabanBenar;
                const backgroundColorClass = isJawabanBenar
                  ? "bg-green-500"
                  : "bg-red-500";
                return (
                  <h3
                    className={`${backgroundColorClass} font-semibold`}
                    key={index}
                  >
                    {jawaban}
                  </h3>
                );
              })}
            </div>
            <p>Jawaban Anda : {data.jawabanAnda}</p>
            <p>Jawaban yang benar : {data.jawabanBenar}</p>
            <p>Jawaban Anda {data.benar}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewKuis;
