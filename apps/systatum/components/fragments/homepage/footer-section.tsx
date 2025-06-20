import { RiLinkedinBoxFill } from "@remixicon/react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex md:flex-row flex-col py-10 md:py-4 gap-4 md:gap-2 w-full px-10 items-center">
      <div className="flex text-sm md:text-start text-center font-mono flex-col gap-1 w-full max-w-[140px]">
        <span>Hakuraku Hills</span>
        <span>15-34 Yokohama</span>
        <span>Japan</span>
      </div>
      <span
        aria-label="divider-horizontal"
        className="border h-[2px] w-full"
      ></span>
      <div className="flex flex-col-reverse md:flex-row items-center gap-2 text-sm">
        <Link
          href={"mailto:adam@systatum.com"}
          className="font-medium font-mono"
        >
          adam@systatum.com
        </Link>

        <Link href={"https://www.linkedin.com/company/systatum"}>
          <RiLinkedinBoxFill size={40} />
        </Link>
      </div>
    </div>
  );
}
