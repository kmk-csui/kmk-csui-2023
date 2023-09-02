import React, { useEffect, useState } from "react";
import { Navbar } from "flowbite-react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export const NavBar: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setIsAuth(true);
    }
  }, [status]);

  return (
    <Navbar
      rounded
      className="fixed top-0 z-50 flex w-full justify-between bg-white bg-opacity-90 py-4 font-jakarta shadow-md"
    >
      <Navbar.Brand href="/">
        <div className="flex items-center space-x-3">
          <div className="relative h-10 w-10 md:h-12 md:w-12">
            <Image
              fill
              src="/illustrations/logo-kmk.svg"
              alt="logo-kmk"
              className="object-cover"
            />
          </div>
          <p className="text-xl font-bold">KMK Fasilkom UI</p>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle />

      <Navbar.Collapse className="justify-center">
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link href="/event">Event</Navbar.Link>
        <Navbar.Link href="/division">Division</Navbar.Link>
        <Navbar.Link href="/gallery">Gallery</Navbar.Link>
        {isAuth ? (
          <Navbar.Link onClick={() => signOut({ callbackUrl: "/" })}>
            Logout
          </Navbar.Link>
        ) : (
          <Navbar.Link href="/auth/signIn">Login</Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
