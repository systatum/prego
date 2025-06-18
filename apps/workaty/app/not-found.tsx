import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <div className="flex max-w-md flex-col items-center justify-center gap-6 px-4 py-16 text-center md:py-24">
        <div className="flex flex-col gap-2">
          <h1 className="text-9xl font-bold tracking-tighter">404</h1>
          <h2 className="text-3xl font-semibold tracking-tight">
            Page not found
          </h2>
          <p className="text-gray-500 md:text-xl/relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>
        <div className="h-px w-full bg-gray-200" />
        <Button className="bg-black text-white hover:bg-gray-800">
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </div>
  );
}
