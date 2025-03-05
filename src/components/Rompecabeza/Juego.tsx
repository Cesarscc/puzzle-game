'use client';
import useGameStore from '@/store/useGameStore';
import { dataUrls } from '@/utils/data';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const generateInitialPositions = (grid_size: number): number[] => {
  return Array.from({ length: grid_size * grid_size }, (_, index) => index);
};

const shuffleArray = (array: number[]): number[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const getLastTwoParts = () => {
  if (typeof window !== 'undefined') {
    const parts = window.location.pathname;
    return parts;
  }
  return '';
};

interface PropsData {
  id: number;
  title: string;
  url: string;
}

const Puzzle = () => {
  const [url, setUrl] = useState('');
  const [pieces, setPieces] = useState<number[]>([]); // Piezas en la parte superior
  const [grid, setGrid] = useState<(number | null)[]>([]); // Grid vacía
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null); // Guarda la última posición de la pieza en la cuadrícula
  const [data, setData] = useState<PropsData>();
  const [indexPuzzle, setIndexPuzzle] = useState(-1);
  const [counter, setCounter] = useState<number>(0);

  const {
    puzzleState,
    setGridState,
    setPuzzleCompleted,
    setGamesCompleted,
    setTimerUpdated,
  } = useGameStore();

  useEffect(() => {
    setUrl(getLastTwoParts());
  }, []);

  useEffect(() => {
    if (url != '') {
      const valor = dataUrls.findIndex((data) => data.url == url);
      const value = puzzleState.findIndex(
        (data) => data.id == url.split('/')[2]
      );
      setIndexPuzzle(value);
      setGrid(Array(puzzleState[value].grid_size ** 2).fill(null));

      if (puzzleState[value].completed) return;

      const shuffledPieces = shuffleArray(
        generateInitialPositions(puzzleState[value].grid_size)
      );
      setPieces(shuffledPieces);
      setData(dataUrls[valor]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    if (puzzleState[indexPuzzle]) {
      if (grid.every((piece, idx) => piece === idx)) {
        confetti();
        setTimerUpdated(puzzleState[indexPuzzle].id, counter);
        setPuzzleCompleted(puzzleState[indexPuzzle].id, true);
        setGamesCompleted();
      } else {
        setGridState(url.split('/')[2], grid);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid]);
  const handleDragStart = (piece: number, index: number | null) => {
    if (!puzzleState[indexPuzzle].completed) {
      setDraggedPiece(piece);
      setPreviousIndex(index); // Guarda la posición anterior en la cuadrícula
    }
  };

  const handleDrop = (index: number) => {
    if (!puzzleState[indexPuzzle].completed) {
      if (draggedPiece === null) return;

      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];

        // Si la posición está ocupada, no hacer nada
        if (newGrid[index] !== null) return newGrid;

        // Si venía de la cuadrícula, limpiar la posición anterior
        if (previousIndex !== null) {
          newGrid[previousIndex] = null;
        }

        // Colocar la pieza en la nueva posición
        newGrid[index] = draggedPiece;

        // Si la pieza venía de la parte superior, removerla de allí
        setPieces((prevPieces) => prevPieces.filter((p) => p !== draggedPiece));
        return newGrid;
      });

      setDraggedPiece(null);
      setPreviousIndex(null);
    }
  };

  useEffect(() => {
    if (puzzleState[indexPuzzle] && !puzzleState[indexPuzzle].completed) {
      const timerId = setTimeout(() => {
        setCounter((prevState) => prevState + 1);
      }, 1000);

      return () => clearTimeout(timerId); // Evita acumulación de timers
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter, indexPuzzle]);

  return (
    <div className="flex flex-col items-center gap-4 bg-[#b6e5ff] pt-16">
      {indexPuzzle != -1 && !puzzleState[indexPuzzle].completed && data && (
        <>
          <div className="flex justify-around w-full">
            <h1 className="text-2xl underline underline-offset-2 text-[#00588d]">
              {puzzleState[indexPuzzle].title}
            </h1>
            <h2 className="text-[#00588d]">Resuelto en: {counter} seg.</h2>
          </div>
          {/* 🔹 Piezas disponibles (Barra superior) */}
          <div
            className=" gap-2 max-w-[1200px] w-full overflow-x-hidden border-2 border-black min-h-16 md:min-h-24 p-1"
            style={{
              display: puzzleState[indexPuzzle].completed ? 'none' : 'flex',
            }}
          >
            {pieces.map((piece) => (
              <div
                key={piece}
                draggable={!puzzleState[indexPuzzle].completed}
                onDragStart={() => handleDragStart(piece, null)}
                onClick={() => handleDragStart(piece, null)}
                className="w-16 md:w-24 h-16 md:h-24 cursor-pointer border-4 border-[#00588d]"
                style={{
                  backgroundImage: `url(${puzzleState[indexPuzzle].src})`,
                  backgroundSize: '400px 400px',
                  backgroundPosition: `-${
                    (piece % puzzleState[indexPuzzle].grid_size) * 100
                  }px -${
                    Math.floor(piece / puzzleState[indexPuzzle].grid_size) * 100
                  }px`,
                }}
              />
            ))}
          </div>

          {/* 🔹 Cuadrícula de grid*grid */}
          <div className="flex flex-col md:flex-row w-full h-full items-center">
            <div className="w-3/4 md:w-1/2 relative min-h-[200px]">
              <Image
                src={puzzleState[indexPuzzle].src}
                alt="image"
                fill
                className="object-contain max-w-[650px] min-h-[200px] mx-auto blur-md select-none none"
              />
            </div>
            <div
              className={`grid place-items-center border border-[#00588d] my-10 md:my-0`}
              style={{
                gridTemplateColumns: `repeat(${puzzleState[indexPuzzle].grid_size}, 1fr)`,
                width: `${puzzleState[indexPuzzle].grid_size * 110}px`,
                height: `${puzzleState[indexPuzzle].grid_size * 110}px`,
              }}
            >
              {puzzleState[indexPuzzle].gridPosition.map((piece, index) => (
                <div
                  key={index}
                  className="w-24 h-24 flex items-center justify-center border-2 border-[#042e4d]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(index)}
                  onClick={() => handleDrop(index)}
                >
                  {piece !== null && (
                    <div
                      draggable={!puzzleState[indexPuzzle].completed}
                      onDragStart={() => handleDragStart(piece, index)}
                      onClick={() => handleDragStart(piece, index)}
                      className="w-full h-full cursor-pointer"
                      style={{
                        border: `3px solid ${
                          piece === index ? '#06c400' : '#f0251b'
                        } `,
                        backgroundImage: `url(${puzzleState[indexPuzzle].src})`,
                        backgroundSize: '400px 400px',
                        backgroundPosition: `-${
                          (piece % puzzleState[indexPuzzle].grid_size) * 100
                        }px -${
                          Math.floor(
                            piece / puzzleState[indexPuzzle].grid_size
                          ) * 100
                        }px`,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 🔹 Mensaje de victoria */}
      {indexPuzzle != -1 && puzzleState[indexPuzzle].completed && (
        <div className="text-2xl font-bold w-full">
          <h2 className="text-center text-[#074873] pt-5">
            ¡JUEGO COMPLETADO!
          </h2>
          <div className="flex flex-col md:flex-row justify-evenly w-full h-full items-center mb-10">
            <div className="w-full relative min-h-[400px]">
              <Image
                src={puzzleState[indexPuzzle].src}
                alt="image"
                fill
                className="object-contain max-w-[650px] min-h-[400px] mx-auto select-none none w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Puzzle;
