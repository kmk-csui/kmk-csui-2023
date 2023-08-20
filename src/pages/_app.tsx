import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { plusJakartaSans, inter } from "@/fonts";
import { NavBar } from "@/components/elements/Navbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <SessionProvider session={session}>
        <main className={`${plusJakartaSans.variable} ${inter.variable}`}>
          <NavBar />
          <Component {...pageProps} />
        </main>
        <ToastContainer />
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
