export default function Spinner() {
  return (
    <div className="flex min-h-[calc(100vh-70px)] items-center justify-center bg-stone-50">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-red-700" />
    </div>
  );
}