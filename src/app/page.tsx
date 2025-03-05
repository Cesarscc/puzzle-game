'use client';
import Image from 'next/image';
import Link from 'next/link';
import useGameStore from '@/store/useGameStore';

import React from 'react';

const Home = () => {
  const { puzzleState } = useGameStore();

  return (
    <main className="w-full h-full bg-[#b6e5ff] pb-10 pt-16">
      <h1 className="text-xl sm:text-2xl xl:text-3xl font-semibold text-center text-[#064974]">
        ¡PUZZLE GAME!
      </h1>

      <h2 className="text-lg xl:text-xl font-medium text-center text-[#064974]">
        ELIGE UNO DE LOS PUZZLES
      </h2>
      <div className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 lg:gap-x-5 w-full h-full">
        {puzzleState.map((puzzle) => (
          <div
            key={puzzle.id}
            className="flex flex-col justify-center items-center"
          >
            <h2 className="text-xl font-semibold my-2 text-[#042e4d] uppercase">
              {puzzle.title}
            </h2>
            <Link href={puzzle.url}>
              <div className="w-[350px] h-[250px] relative border-2 border-[#0068ab]">
                <Image
                  src={`/images/img${puzzle.srcindex}.jpg`}
                  alt="image"
                  fill
                  className={`object-contain max-w-[350px] mx-auto ${
                    puzzle.completed ? 'blur-0' : 'blur-sm'
                  } select-none none`}
                />
                <div className="absolute top-1/3 left-1/4">
                  {puzzle.completed ? (
                    <>
                      <p className="text-xl text-center font-semibold text-green-600 border-4 border-green-500 rounded-md py-2 px-4 bg-green-100">
                        COMPLETADO <br />
                        <span className="text-sm">
                          Resuelto en: {puzzle.timer} seg.
                        </span>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-xl font-semibold text-red-600 border-4 border-red-500 rounded-md py-2 px-4 bg-red-100">
                        INCOMPLETO
                      </p>
                    </>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {/*  */}
    </main>
  );
};

export default Home;
