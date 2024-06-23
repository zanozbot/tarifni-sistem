import { useEffect, useRef, useState } from "react";
import { Timeline, DataSet } from "vis-timeline/standalone";
import { now, options } from "./utils/timeline";
import {
  generateItems,
  getCurrentTimeBlock,
  isHighSeason,
} from "./utils/time-blocks";
import { Cookies } from "./components/cookies";
import { PRICES } from "./utils/prices";
import { Icons } from "./components/icons";
import { version } from "../package.json";

export function App() {
  const visualizationRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<Timeline | null>(null);
  const [season, setSeason] = useState<"visoki" | "nizki" | undefined>();
  const [currentTimeBlock, setCurrentTimeBlock] = useState<
    number | undefined
  >();

  const moveToCurrentTime = () => {
    timelineRef.current?.moveTo(timelineRef.current?.getCurrentTime());
  };

  useEffect(() => {
    if (!visualizationRef.current || timelineRef.current) {
      return;
    }

    const items = new DataSet(generateItems());

    timelineRef.current = new Timeline(
      visualizationRef.current!,
      items,
      options,
    );
  }, [visualizationRef]);

  useEffect(() => {
    const correctTimeblockAndSeason = () => {
      const date = new Date();
      const timeblock = getCurrentTimeBlock(date);
      setCurrentTimeBlock(timeblock?.id);
      setSeason(isHighSeason(now) ? "visoki" : "nizki");
    };
    correctTimeblockAndSeason();

    const interval = setInterval(() => {
      correctTimeblockAndSeason();
    }, 1000 * 60 * 1); // Every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-dvh flex flex-col relative">
      <a
        className="absolute top-3 right-3 z-10"
        href="https://github.com/zanozbot/tarifni-sistem"
        target="_blank"
      >
        <Icons.github className="w-6 h-6 text-zinc-700 hover:text-red-700 transition-colors" />
      </a>
      <div className="p-6 space-y-2  max-w-screen-lg self-center">
        <h1 className="text-3xl font-bold uppercase">
          Vizualizacija novega tarifnega sistema
        </h1>
        <div>
          Trenutno se nahajamo v <strong>{season}</strong> sezoni, znotraj
          časovnega bloka <strong>{currentTimeBlock}</strong>. Višja sezona
          traja od novembra do februarja, nižja pa od marca do oktobra.
        </div>
        <div>
          Poznamo pet časovnih blokov, v posameznem dnevu pa lahko nastopijo
          trije različni časovni bloki. Najdražji je časovni blok 1, ta se
          pojavi le v višji sezoni, najcenejša uporaba omrežja je v časovnem
          bloku 5, ki nastopi le v nižji sezoni.
        </div>
        <div>
          Cene pri pozameznih časovnih blokih se nanašajo na uporabniško skupino
          0, ki velja za gospodinjstva in male poslovne odjemalce. Vir je
          dostopen na{" "}
          <a
            className="hover:text-red-700 transition-colors underline"
            href="https://www.uradni-list.si/glasilo-uradni-list-rs/vsebina/2023-01-3431/akt-o-dolocitvi-tarifnih-postavk-za-omreznine-elektrooperaterjev"
            target="_blank"
          >
            povezavi
          </a>
          .
        </div>
        <div className="space-y-2">
          <h2 className="text-lg flex flex-col sm:flex-row sm:gap-2 sm:items-center font-bold uppercase">
            <span>Legenda časovnih blokov</span>
            <span className="text-sm font-normal normal-case">
              (od najcenejšega do najdražjega)
            </span>
          </h2>
          <div className="flex gap-4 flex-wrap">
            {PRICES.sort((a, b) => a.energy - b.energy).map((price) => (
              <div key={price.block} className="flex items-center gap-2">
                <div
                  className={`block-${price.block} w-4 h-4 rounded-sm`}
                ></div>
                <div className="text-center">Blok {price.block}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="h-full min-h-[500px] rounded-lg overflow-hidden"
        ref={visualizationRef}
      ></div>
      <div className="mt-2 text-center">
        <button
          className="border border-zinc-200 hover:bg-zinc-200 transition-colors px-2 py-1 rounded-md"
          onClick={moveToCurrentTime}
        >
          Premik na trenutni čas
        </button>
      </div>
      <footer className="p-4 space-y-1">
        <div className="flex gap-4 justify-center">
          <a
            className="hover:text-red-700 text-zinc-700 transition-colors underline text-sm"
            href="https://ozbot.si/privacy-policy"
            target="_blank"
          >
            Politika zasebnosti
          </a>
          <a
            className="hover:text-red-700 text-zinc-700 transition-colors underline text-sm"
            href="https://ozbot.si/contact"
            target="_blank"
          >
            Kontakt
          </a>
        </div>
        <div className="text-center text-sm opacity-50">v{version}</div>
      </footer>
      <Cookies />
    </div>
  );
}
