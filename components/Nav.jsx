"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleBropDown, setToggleBropDown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex items-center gap-x-2">
        <Image
          src="/assets/images/logo.svg"
          alt="Logo"
          width={50}
          height={50}
          className="object-contain"
        />
        <h1 className="hidden md:block md:text-2xl md:font-bold">Promptia</h1>
      </Link>

      {/* {alert(providers)} */}

      {/* DESKTOP NAVIGATION */}
      <div className="hidden md:block">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link className="black_btn" href="/create-prompt">
              Create Prompt
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign out
            </button>

            <Link href="/profile">
              <Image
                src={session.user.image}
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full object-cover cursor-pointer"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider, i) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* MOBILE NAVIGATION */}
      <div className="flex relative md:hidden">
        {session?.user ? (
          <div>
            <Image
              src={session.user.image}
              alt="Hamburger"
              className="rounded-full object-cover cursor-pointer"
              width={50}
              height={50}
              onClick={() => setToggleBropDown((prev) => !prev)}
            />

            {toggleBropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleBropDown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleBropDown(false)}
                >
                  Create Prompt
                </Link>

                <button
                  className="w-full black_btn"
                  onClick={() => {
                    setToggleBropDown(false);
                    signOut;
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider, i) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
