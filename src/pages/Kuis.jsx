import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import Pertanyaan from "../components/kuis/Pertanyaan";
import NavKuis from "../components/kuis/NavKuis";
import ButKuis from "../components/kuis/ButKuis";
import "../App.css";
import("preline");

const Kuis = () => {
  const navigasi = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [pertanyaanSaatIni, setPertanyaanSaatIni] = useState(0);
  const [pilihJawaban, setPilihJawaban] = useState("");
  const [jawabanUser, setJawabanUser] = useState(Array(10).fill(""));
  const [timeLeft, setTimeLeft] = useState(300); // 5 menit
  const [kuisSelesai, setKuisSelesai] = useState(false);
  const [confirmSelesai, setConfirmSelesai] = useState(false);
  const dataRef = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api);
        const fetchedData = response.data.results;
        setData(fetchedData);
        dataRef.current = fetchedData;

        if (fetchedData.length > 0) {
          setPilihJawaban("");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(timer);
        if (jawabanUser.every((answer) => answer !== "")) {
          setKuisSelesai(true);
        } else {
          // Membuat objek yang berisi data yang akan dikirim ke halaman review
          const reviewData = data.map((pertanyaan, index) => ({
            pertanyaan: pertanyaan.question,
            jawabanAnda: jawabanUser[index] || "Tidak dijawab", // Mengganti jawaban kosong dengan "Tidak dijawab"
            jawabanBenar: pertanyaan.correct_answer,
            jawabanSemua: [
              ...pertanyaan.incorrect_answers,
              pertanyaan.correct_answer,
            ],
            benar:
              jawabanUser[index] === pertanyaan.correct_answer
                ? "benar"
                : "salah",
          }));

          // Navigasi ke halaman review saat waktu habis
          navigasi("/kuis/review", { state: { reviewData } }); // Gantilah dengan path yang sesuai
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, navigasi, jawabanUser, data]);

  const pertanyaanSelanjutnya = () => {
    if (pertanyaanSaatIni + 1 < data.length) {
      setPertanyaanSaatIni(pertanyaanSaatIni + 1);
      setPilihJawaban(jawabanUser[pertanyaanSaatIni + 1] || "");
    }
  };

  const pertanyaanSebelumnya = () => {
    if (pertanyaanSaatIni - 1 >= 0) {
      setPertanyaanSaatIni(pertanyaanSaatIni - 1);
      setPilihJawaban(jawabanUser[pertanyaanSaatIni - 1] || "");
    }
  };

  const handlePilihJawaban = (answer) => {
    setPilihJawaban(answer);

    const updatedAnswers = [...jawabanUser];
    updatedAnswers[pertanyaanSaatIni] = answer;
    setJawabanUser(updatedAnswers);
  };

  const selesaiKuis = () => {
    setKuisSelesai(true);

    // Membuat objek yang berisi data yang akan dikirim ke halaman review
    const reviewData = data.map((pertanyaan, index) => ({
      pertanyaan: pertanyaan.question,
      jawabanAnda: jawabanUser[index] || "Tidak dijawab", // Mengganti jawaban kosong dengan "Tidak dijawab"
      jawabanBenar: pertanyaan.correct_answer,
      jawabanSemua: [
        ...pertanyaan.incorrect_answers,
        pertanyaan.correct_answer,
      ],
      benar:
        jawabanUser[index] === pertanyaan.correct_answer ? "benar" : "salah",
    }));

    // Navigasi ke halaman review saat menyelesaikan kuis
    navigasi("/kuis/review", { state: { reviewData } }); // Gantilah dengan path yang sesuai
  };

  return (
    <main className="w-full min-h-screen bg-slate-900 py-8 px-4 xl:px-32">
      {error && <h1>{error}</h1>}
      {data.length === 0 ? (
        <div className="w-full h-screen text-center leading-[100vh]">
          <div
            className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="w-full h-auto xl:h-[35rem] flex flex-col xl:flex-row bg-gradient-to-b from-violet-600/[.15] via-transparent shadow-xl">
          <div className="w-full xl:w-1/3 h-auto xl:h-[35rem] px-8 py-4 flex flex-col justify-between">
            <div className="w-full h-auto">
              <div className="w-full h-40 mb-8 flex flex-col justify-between">
                <h1 className="text-6xl font-mono font-bold text-white">
                  Navigasi Kuis
                </h1>
                <span className="w-full h-auto font-mono font-medium bg-red-500 text-white p-4 rounded-lg">
                  Waktu Tersisa :{Math.floor(timeLeft / 60)}:
                  {(timeLeft % 60).toString().padStart(2, "0")}
                </span>
              </div>
              <div className="w-full h-auto 2xl:h-60 flex flex-wrap gap-4">
                {data.map((item, index) => (
                  <div className="w-auto h-24" key={index}>
                    <ButKuis
                      index={index}
                      pertanyaanSaatIni={pertanyaanSaatIni}
                      onClick={(index) => {
                        setPertanyaanSaatIni(index);
                        setPilihJawaban(jawabanUser[index] || "");
                      }}
                      jawabanUser={jawabanUser}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full h-auto py-4">
              {!kuisSelesai &&
                (confirmSelesai === false ? (
                  <button
                    onClick={() => setConfirmSelesai(!confirmSelesai)}
                    type="button"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Selesai
                  </button>
                ) : (
                  <div
                    className="bg-blue-50 border border-blue-200 rounded-md p-4"
                    role="alert"
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-4 w-4 text-blue-600 mt-1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-gray-800 font-semibold">
                          Apakah anda mau menyelesaikan kuisnya
                        </h3>
                        <div className="mt-2 text-sm text-gray-600">
                          Jika sudah klik iya, jika belum klik tidak
                        </div>
                        <div className="mt-4">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => setConfirmSelesai(!confirmSelesai)}
                              type="button"
                              className="inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-medium text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                            >
                              Tidak
                            </button>
                            <button
                              onClick={selesaiKuis}
                              type="button"
                              className="inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-medium text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                            >
                              Iya
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="w-full h-auto xl:h-[35rem] xl:w-2/3 px-8 py-4 flex flex-col justify-between">
            <Pertanyaan
              pertanyaan={data[pertanyaanSaatIni].question}
              jawaban={[
                ...data[pertanyaanSaatIni].incorrect_answers,
                data[pertanyaanSaatIni].correct_answer,
              ]}
              pilihJawaban={pilihJawaban}
              onAnswerSelect={handlePilihJawaban}
            />
            <NavKuis
              pertanyaanSaatIni={pertanyaanSaatIni}
              totalQuestions={data.length}
              onNextClick={pertanyaanSelanjutnya}
              onPrevClick={pertanyaanSebelumnya}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Kuis;
