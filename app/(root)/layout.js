import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import RightBar from "@/components/RightBar";
import BottomBar from "@/components/BottomBar";
import ToastProvider from "@/providers/toastProvider";
import { fetchUser } from "@/lib/fetchUser";
import ModalProvider from "@/providers/modalProvider";
import { fetchSuggestedUsers } from "@/lib/fetchSuggestions";
import { ThemeProvider } from "@/providers/themeprovider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Threads-Instagram",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const user = await fetchUser();
  const suggestions = await fetchSuggestedUsers();

  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={cn("dark:bg-black text-white")}>
          <ThemeProvider>
            <NavBar />
            <ModalProvider />
            <ToastProvider />
            <div className='flex flex-row'>
              <Sidebar userId={user?.id} userImage={user?.image} />
              <main className='flex min-h-screen flex-1 flex-col items-center overflow-auto'>
                <section className='w-full max-w-xl'>{children}</section>
              </main>
              <RightBar suggestions={suggestions} currentUser={user} />
            </div>

            <BottomBar />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
