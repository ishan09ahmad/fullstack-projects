import { Outlet } from "react-router";
import Header from "../components/Header";

export default function RootLayout() {
  return (
    <div className="min-h-screen max-w-full">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
