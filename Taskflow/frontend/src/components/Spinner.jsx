import { LoaderCircle } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex min-h-[calc(100vh-70px)] items-center justify-center bg-gray-50">
      <LoaderCircle className="h-10 w-10 animate-spin text-violet-600" />
    </div>
  );
}