import { motion, type Transition } from "framer-motion";

import FadeInWhenVisible from "./FadeInWhenVisible";
import { useEffect, useState } from "react";
import { cn } from "../libs/utils";
import HeartIcon from "../assets/icons/Heart";
import DiamondIcon from "../assets/icons/Diamond";
import SpadeIcon from "../assets/icons/Spade";
import ClubIcon from "../assets/icons/Club";

const spring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 40,
};

export const mapCardTypeToIcon = {
  Hearts: <HeartIcon className="fill-red-500 text-red-500 size-30" />,
  Diamonds: <DiamondIcon className="fill-red-500 text-red-500" />,
  Clubs: <ClubIcon className="fill-neutral-50 text-neutral-50" />,
  Spades: <SpadeIcon className="fill-neutral-50 text-neutral-50" />,
} as const;

export type CardType = keyof typeof mapCardTypeToIcon;

const mapCardAmbient = {
  Hearts: "shadow-red-500/30",
  Diamonds: "shadow-red-500/30",
  Clubs: "shadow-white/30",
  Spades: "shadow-white/30",
} as const;

function CardCover() {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden border-5 rounded-4xl border-neutral-100 relative select-none shadow-[0px_0px_30px_1px] shadow-white/10">
      <div className="absolute inset-0 w-full h-full card-bg"></div>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-neutral-900 via-stone-900/90 to-neutral-900 shadow-[inset_0px_0px_30px_1px] shadow-white/30"></div>
      <div className="m-auto relative z-20 text-center text-white px-2 select-none">
        <FadeInWhenVisible>
          <p className="text-lg font-poppins tracking-wider font-bold">
            Gacha Cards
          </p>
          <p className="text-3xl font-climate-crisis tracking-wider text-white">
            KMUTT FIRST MEET 2025
          </p>
          <p className="text-xs font-poppins leading-7 tracking-wider text-neutral-400">
            School of Information Technology
          </p>
        </FadeInWhenVisible>
      </div>
    </div>
  );
}

interface CardDetailProps {
  number?: number;
  type?: CardType;
}

export function CardDetail({ number, type }: CardDetailProps) {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden border-5 rounded-4xl border-neutral-100 relative select-none">
      <div className="absolute inset-0 w-full h-full card-bg"></div>
      <div
        className={cn(
          "absolute inset-0 w-full h-full bg-gradient-to-b from-neutral-900 via-stone-900/40 to-neutral-900 shadow-[inset_0px_0px_64px_10px]",
          mapCardAmbient[type ?? "Diamonds"]
        )}
      ></div>
      <div className="absolute top-0 flex justify-between items-end w-full p-4">
        <div className="text-end text-white p-2 order-last">
          <p className="text-[0.5em] font-poppins tracking-wider font-bold">
            Gacha Cards
          </p>
          <p className="text-[0.75em] font-climate-crisis tracking-wider text-white">
            KMUTT FIRST MEET 2025
          </p>
          <p className="text-[0.5em] font-poppins tracking-wider text-neutral-400">
            School of Information Technology
          </p>
        </div>
        <span
          className="size-17 items-center justify-center flex flex-col mr-5"
          style={{ width: type == "Diamonds" ? "49px" : "" }}
        >
          {type && mapCardTypeToIcon[type]}
        </span>
      </div>
      <div className="text-[10rem] font-black m-auto relative z-auto font-poppins tracking-wider text-white">
        {number && number}
      </div>
      <div className="absolute bottom-0 flex justify-between items-end w-full p-4">
        <div className="text-start text-white p-2">
          <p className="text-[0.5em] font-poppins tracking-wider font-bold">
            Gacha Cards
          </p>
          <p className="text-[0.75em] font-climate-crisis tracking-wider text-white">
            KMUTT FIRST MEET 2025
          </p>
          <p className="text-[0.5em] font-poppins tracking-wider text-neutral-400">
            School of Information Technology
          </p>
        </div>
        <span
          className="size-17 items-center justify-center flex flex-col ml-5"
          style={{ width: type == "Diamonds" ? "49px" : "" }}
        >
          {type && mapCardTypeToIcon[type]}
        </span>
      </div>
    </div>
  );
}

type CardProps = {
  fold?: boolean;
  number?: number;
  allowTapping?: boolean;
} & CardDetailProps;

export default function Card({
  number,
  type,
  allowTapping = false,
}: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (allowTapping) {
      setIsFlipped(!isFlipped);
    }
  };

  useEffect(() => {
    if (!type || !number || number === 0 || type === "" as CardType) {
      setIsFlipped(false)
    }
  }, [number, type])

  return (
    <motion.div
      className="perspective-distant transform-3d w-full h-full"
      transition={spring}
      onClick={handleClick}
    >
      <div className="perspective-distant transform-3d w-full h-full">
        <motion.div
          whileTap={{ scale: 1.1 }}
          animate={{ rotateY: isFlipped ? -180 : 0 }}
          transition={spring}
          className="w-full h-full backface-hidden absolute"
          style={{ zIndex: isFlipped ? 0 : 1 }}
        >
          <CardCover />
        </motion.div>
        <motion.div
          initial={{ rotateY: 180 }}
          animate={{ rotateY: isFlipped ? 0 : 180 }}
          transition={spring}
          className="w-full h-full backface-hidden absolute"
          style={{ zIndex: isFlipped ? 1 : 0 }}
        >
          <CardDetail number={number} type={type} />
        </motion.div>
      </div>
    </motion.div>
  );
}
