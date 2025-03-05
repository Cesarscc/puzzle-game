'use client';

import useGameStore from '@/store/useGameStore';
import { LayoutGridIcon } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { gamesCompleted, puzzleState } = useGameStore();
  const [timeValue, setTimeValue] = useState<number | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const time = puzzleState.reduce(
      (accumulator, puzzle) => accumulator + puzzle.timer,
      -1
    );
    setTimeValue(time);
  }, [puzzleState]);

  return (
    <nav className="bg-[#042e4d] w-full h-16">
      <div className="flex justify-between items-center p-5">
        <i
          className="cursor-pointer rounded"
          onClick={() => {
            router.push('/');
          }}
        >
          <LayoutGridIcon size={25} color="#eff9ff" />
        </i>
        {timeValue ? (
          <>
            <div className="flex gap-x-10 text-[#eff9ff] text-xs md:text-base">
              {pathname.toString() === '/' ? (
                <p className="font-medium ">
                  Tiempo total:{' '}
                  {timeValue !== -1 ? timeValue + 1 + ' seg' : 'Sin Jugar'}
                </p>
              ) : (
                <></>
              )}

              <p className="font-medium">Completados: {gamesCompleted}/12</p>
            </div>
          </>
        ) : (
          <>
            <div className="font-semibold text-[#eff9ff]">Cargando...</div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
