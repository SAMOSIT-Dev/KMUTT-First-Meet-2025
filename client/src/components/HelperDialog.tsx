import { Dialog, Toggle } from "radix-ui";
import { motion } from "framer-motion";
import { CircleQuestionMark, Languages, X } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "../libs/utils";

import HeartIcon from "../assets/icons/Heart";
import DiamondIcon from "../assets/icons/Diamond";
import SpadeIcon from "../assets/icons/Spade";
import ClubIcon from "../assets/icons/Club";

type Language = "EN" | "TH";

interface LanguageSelectionProps {
  onChange?: (value: Language) => void;
  defaultLanguage?: Language;
}

function LanguageSelection({
  defaultLanguage = "TH",
  onChange,
}: LanguageSelectionProps) {
  const [selection, setSelection] = useState<Language>(defaultLanguage);
  useEffect(() => {
    onChange?.(selection);
  }, [setSelection, selection]);
  return (
    <Toggle.Root
      aria-label="Toggle lanaguage selection"
      onPressedChange={(value) => {
        setSelection((prev) => {
          if (value) {
            return defaultLanguage === "EN" ? "TH" : "EN";
          }
          return prev === "TH" ? "EN" : "TH";
        });
      }}
      className="font-poppins font-bold text-2xl flex items-center px-px py-2"
    >
      <span className="mr-3">
        <Languages />
      </span>
      {selection}
    </Toggle.Root>
  );
}

function ThaiContent() {
  return (
    <div className="mt-4 font-poppins">
      <div className="space-y-2">
        <h1 className="font-semibold tracking-wider text-xl">วิธีการเล่น</h1>
        <p>
          รูปแบบของการ์ดจะมีทั้งหมด 12 ตัวเลขและ 4 สัญลักษณ์{"  "}
          <span className="inline-flex items-center align-middle *:size-4 space-x-1">
            <HeartIcon className="text-red-500" />{" "}
            <DiamondIcon className="text-red-500" /> <SpadeIcon /> <ClubIcon />
          </span>
        </p>
        <div>
          <p className="font-semibold">1. Pair</p>
          <p>ต้องจับกลุ่มให้มีเลขเหมือนกัน 2 ใบ ทั้งหมด 2 ชุด</p>
        </div>
        <div>
          <p className="font-semibold">2. Three of a Kind</p>
          <p>ต้องจับกลุ่มให้มีเลขเหมือนกัน 3 ทั้งหมด 2 ชุด</p>
        </div>
        <div>
          <p className="font-semibold">3. Four of a Kind</p>
          <p>ต้องจับกลุ่มให้มีเลขเหมือนกัน 4 ทั้งหมด 2 ชุด</p>
        </div>
        <div>
          <p className="font-semibold">4. Straight</p>
          <p>ต้องจับกลุ่มให้ตัวเลขเรียงกันทั้งหมด 5 ใบ</p>
        </div>
        <div>
          <p className="font-semibold">5. Flush</p>
          <p>ต้องจับกลุ่มให้สัญลักษณ์เดียวกันทั้งหมด 5 ใบ</p>
        </div>
      </div>
    </div>
  );
}

function EnglishContent() {
  return (
    <div className="mt-4 font-poppins">
      <div className="space-y-2">
        <h1 className="font-bold tracking-wide text-xl">How to Play</h1>
        <p>
          The cards consist of 12 numbers and 4 symbols.{"  "}
          <span className="inline-flex items-center align-middle *:size-4 space-x-1">
            <HeartIcon className="text-red-500" />{" "}
            <DiamondIcon className="text-red-500" /> <SpadeIcon /> <ClubIcon />
          </span>
        </p>
        <div>
          <p className="font-semibold">1. Pair</p>
          <p>
            Group two identical cards together. Two sets of two cards with the
            same number.
          </p>
        </div>
        <div>
          <p className="font-semibold">2. Three of a Kind</p>
          <p>
            Group three cards with the same number. Two sets of three cards
            each.
          </p>
        </div>
        <div>
          <p className="font-semibold">3. Four of a Kind</p>
          <p>
            Group four cards with the same number. Two sets of four cards each.
          </p>
        </div>
        <div>
          <p className="font-semibold">4. Straight</p>
          <p>Group five cards in consecutive number order.</p>
        </div>
        <div>
          <p className="font-semibold">5. Flush</p>
          <p>Group five cards with the same symbol.</p>
        </div>
      </div>
    </div>
  );
}

export default function HelperDialog() {
  const [lanaguage, setLanaguage] = useState<Language>("TH");

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <motion.button
          whileHover={{ backgroundColor: "oklch(0.92 0 0)" }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "fixed right-0 size-14 bottom-0 m-4 flex flex-col items-center justify-center p-2 cursor-pointer z-50",
            "rounded-full bg-neutral-50/90"
          )}
        >
          <CircleQuestionMark size={30} />
        </motion.button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="w-screen h-screen fixed inset-0 bg-white/90 z-50 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed bg-white w-[90dvw] h-[90dvh] top-1/2 left-1/2 -translate-1/2 flex z-60  flex-col p-4 antialiased rounded-2xl border-1 border-neutral-50"
        >
          <Dialog.Title className="flex items-center justify-between">
            <LanguageSelection onChange={setLanaguage} />
            <Dialog.Close className="size-12 flex items-center justify-center cursor-pointer">
              <X size={30} />
            </Dialog.Close>
          </Dialog.Title>
          <div className="h-full min-h-0 overflow-y-auto">
            {lanaguage === "TH" ? <ThaiContent /> : <EnglishContent />}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
