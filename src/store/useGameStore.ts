import { create } from 'zustand';

interface PuzzleState {
  id: string; // Identificador único para cada rompecabezas
  gridPosition: (number | null)[];
  completed: boolean;
  grid_size: number;
  title: string;
  src: string;
  url: string;
  srcindex: number;
  timer: number;
}

interface GameStore {
  gamesCompleted: number;
  setGamesCompleted: () => void;
  puzzleState: PuzzleState[];
  setGridState: (id: string, gridPosition: (number | null)[]) => void;
  setPuzzleCompleted: (id: string, completed: boolean) => void;
  setTimerUpdated: (id: string, time: number) => void;
}

const useGameStore = create<GameStore>((set) => ({
  gamesCompleted: 0,
  setGamesCompleted: () =>
    set((state) => ({ gamesCompleted: state.gamesCompleted + 1 })),
  // Inicializamos 3 rompecabezas con sus piezas ordenadas
  puzzleState: [
    {
      id: 'puzzle-1',
      gridPosition: Array(9).fill(null),
      completed: false,
      grid_size: 3,
      title: 'Valorant 1',
      src: '/images/img1.jpg',
      url: '/puzzle/puzzle-1',
      srcindex: 1,
      timer: 0,
    },
    {
      id: 'puzzle-2',
      gridPosition: Array(16).fill(null),
      completed: false,
      grid_size: 4,
      title: 'Valorant 2',
      src: '/images/img2.jpg',
      url: '/puzzle/puzzle-2',
      srcindex: 2,
      timer: 0,
    },
    {
      id: 'puzzle-3',
      gridPosition: Array(16).fill(null),
      completed: false,
      grid_size: 4,
      title: 'Valorant 3',
      src: '/images/img3.jpg',
      url: '/puzzle/puzzle-3',
      srcindex: 3,
      timer: 0,
    },
    {
      id: 'puzzle-4',
      gridPosition: Array(16).fill(null),
      completed: false,
      grid_size: 4,
      title: 'Valorant 4',
      src: '/images/img4.jpg',
      url: '/puzzle/puzzle-4',
      srcindex: 4,
      timer: 0,
    },
    {
      id: 'puzzle-5',
      gridPosition: Array(16).fill(null),
      completed: false,
      grid_size: 4,
      title: 'Valorant 5',
      src: '/images/img5.jpg',
      url: '/puzzle/puzzle-5',
      srcindex: 5,
      timer: 0,
    },
    {
      id: 'puzzle-6',
      gridPosition: Array(16).fill(null),
      completed: false,
      grid_size: 3,
      title: 'Valorant 6',
      src: '/images/img6.jpg',
      url: '/puzzle/puzzle-6',
      srcindex: 6,
      timer: 0,
    },
    {
      id: 'puzzle-7',
      gridPosition: Array(16).fill(null),
      completed: false,
      grid_size: 4,
      title: 'League Of Legends 7',
      src: '/images/img7.jpg',
      url: '/puzzle/puzzle-7',
      srcindex: 7,
      timer: 0,
    },
    {
      id: 'puzzle-8',
      gridPosition: Array(16).fill(null),
      completed: false,
      grid_size: 3,
      title: 'League Of Legends 8',
      src: '/images/img8.jpg',
      url: '/puzzle/puzzle-8',
      srcindex: 8,
      timer: 0,
    },
    {
      id: 'puzzle-9',
      gridPosition: Array(16).fill(null),
      completed: false,
      grid_size: 3,
      title: 'League Of Legends 9',
      src: '/images/img9.jpg',
      url: '/puzzle/puzzle-9',
      srcindex: 9,
      timer: 0,
    },
    {
      id: 'puzzle-10',
      gridPosition: Array(16).fill(null),
      completed: false,
      grid_size: 3,
      title: 'League Of Legends 10',
      src: '/images/img10.jpg',
      url: '/puzzle/puzzle-10',
      srcindex: 10,
      timer: 0,
    },
    {
      id: 'puzzle-11',
      gridPosition: Array(16).fill(null),
      completed: false,
      grid_size: 4,
      title: 'League Of Legends 11',
      src: '/images/img11.jpg',
      url: '/puzzle/puzzle-11',
      srcindex: 11,
      timer: 0,
    },
    {
      id: 'puzzle-12',
      gridPosition: Array(16).fill(null),
      completed: false,
      grid_size: 3,
      title: 'League Of Legends 12',
      src: '/images/img12.jpg',
      url: '/puzzle/puzzle-12',
      srcindex: 12,
      timer: 0,
    },
  ],
  // Actualiza la posición de las piezas en un rompecabezas específico
  setGridState: (id, gridPosition) =>
    set((state) => ({
      puzzleState: state.puzzleState.map((puzzle) =>
        puzzle.id === id ? { ...puzzle, gridPosition } : puzzle
      ),
    })),
  // Marca un rompecabezas como completado o no
  setPuzzleCompleted: (id, completed) =>
    set((state) => ({
      puzzleState: state.puzzleState.map((puzzle) =>
        puzzle.id === id ? { ...puzzle, completed } : puzzle
      ),
    })),
  setTimerUpdated: (id, time) =>
    set((state) => ({
      puzzleState: state.puzzleState.map((puzzle) =>
        puzzle.id === id ? { ...puzzle, timer: time } : puzzle
      ),
    })),
}));

export default useGameStore;
