import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin panel",
  description: "Admin panel",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={inter.className}>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-full overflow-y-auto p-4">{children}</div>
      </div>
    </main>
  );
}