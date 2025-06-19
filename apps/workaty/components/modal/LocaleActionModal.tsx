import { useLocaleStore } from "@/hooks/contents/useLocaleStore";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./../../../../packages/components/ui/dialog";
import { Globe } from "lucide-react";
import { LOCALES } from "@/constants/Locale";
import { LocaleStateProps } from "@/hooks/types/useLocaleStore";

export default function LocaleActionModal() {
  const { setLocale } = useLocaleStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const onChangeLocale = async (id: string) => {
    const validIds = Object.values(LOCALES).map((locale) => locale.id);

    if (validIds.includes(id as LocaleStateProps)) {
      const localeId = id as LocaleStateProps;
      await setLocale(localeId);
      await setModalOpen(false);
    } else {
      console.error("Invalid locale id: ", id);
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger>
        <div className="cursor-pointer transition hover:opacity-80">
          <Globe />
        </div>
      </DialogTrigger>

      <DialogContent className="flex rounded-xs h-fit w-full max-w-[350px] flex-col gap-1 md:max-w-xl">
        <div className="flex h-fit w-full flex-col justify-between gap-2 py-2">
          <DialogTitle className="font-semibold">
            Change your language
          </DialogTitle>
          <div className="flex w-full flex-col gap-4 py-4">
            {Object.values(LOCALES)?.map((data, index) => (
              <div
                onClick={() => onChangeLocale(data?.id)}
                key={index}
                className="flex cursor-pointer flex-row items-start justify-start rounded-xs px-2 py-2 text-sm font-medium transition-colors hover:bg-gray-300 hover:text-gray-800 active:bg-blue-200"
              >
                <div>{data?.name}</div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
