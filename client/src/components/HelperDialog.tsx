import { Dialog, Toggle } from "radix-ui";
import { motion } from "framer-motion";
import { CircleQuestionMark, Languages, X } from "lucide-react";
import { cn } from "../libs/utils";
import { useEffect, useState } from "react";
import { mapCardTypeToIcon } from "./Card";
import { cardTypes } from "../libs/constants";

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
    <div className="mt-4 font-kanit">
      <div className="space-y-2">
        <h1 className="font-semibold tracking-wider text-xl">วิธีการเล่น</h1>
        <p className="text-sm">
          รูปแบบของการ์ดจะมีทั้งหมด 12 ตัวเลขและ 4 สัญลักษณ์
        </p>
        <div className="flex items-center w-fit mt-2 flex-wrap gap-2 bg-neutral-200 p-2 rounded-lg">
          {cardTypes.map((type) => (
            <div
              key={type}
              className="flex items-center justify-center size-10"
            >
              {mapCardTypeToIcon[type]}
            </div>
          ))}
        </div>
        <h2 className="font-semibold tracking-wider text-lg">วิธีการได้แต้ม</h2>
        <div>
          <p className="font-medium">1. Pair</p>
          <p className="text-sm">
            ต้องจับกลุ่มให้มีเลขเหมือนกัน 2 ใบ ทั้งหมด 2 ชุด
          </p>
        </div>
        <div>
          <p className="font-medium">2. Three of a Kind</p>
          <p className="text-sm">จับกลุ่มให้มีเลขเหมือนกัน 3 ทั้งหมด 2 ชุด</p>
        </div>
        <div>
          <p className="font-medium">3. Four of a Kind</p>
          <p className="text-sm">จับกลุ่มให้มีเลขเหมือนกัน 4 ทั้งหมด 2 ชุด</p>
        </div>
        <div>
          <p className="font-medium">4. Straight</p>
          <p className="text-sm">จับกลุ่มให้ตัวเลขเรียงกัน 5 ใบ</p>
        </div>
        <div>
          <p className="font-medium">5. Flush</p>
          <p className="text-sm">จับกลุ่มให้ดอกเดียวกัน 5 ใบ</p>
        </div>
      </div>
    </div>
  );
}

function EnglishConten() {
  return (
    <div className="mt-4 font-poppins">
      <div className="space-y-2">
        <h1 className="font-bold tracking-wide text-xl">How to Play</h1>
        <p className="text-sm">
          The cards consist of 12 numbers and 4 symbols.
        </p>
        <div className="flex items-center w-fit mt-2 flex-wrap gap-2 bg-neutral-200 p-2 rounded-lg">
          {cardTypes.map((type) => (
            <div
              key={type}
              className="flex items-center justify-center size-10"
            >
              {mapCardTypeToIcon[type]}
            </div>
          ))}
        </div>
        <h2 className="font-bold tracking-wide text-lg mt-4">How to Score</h2>
        <div>
          <p className="font-semibold">1. Pair</p>
          <p className="text-sm">
            Group two identical cards together. Two sets of two cards with the
            same number.
          </p>
        </div>
        <div>
          <p className="font-semibold">2. Three of a Kind</p>
          <p className="text-sm">
            Group three cards with the same number. Two sets of three cards
            each.
          </p>
        </div>
        <div>
          <p className="font-semibold">3. Four of a Kind</p>
          <p className="text-sm">
            Group four cards with the same number. Two sets of four cards each.
          </p>
        </div>
        <div>
          <p className="font-semibold">4. Straight</p>
          <p className="text-sm">
            Group five cards in consecutive number order.
          </p>
        </div>
        <div>
          <p className="font-semibold">5. Flush</p>
          <p className="text-sm">Group five cards with the same symbol.</p>
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
            "fixed right-0 size-14 top-0 m-4 flex flex-col items-center justify-center p-2 cursor-pointer z-50",
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
          <div className="h-full min-h-0 overflow-y-auto">{lanaguage === "TH" ? <ThaiContent /> : <EnglishConten />}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
