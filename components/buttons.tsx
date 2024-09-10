"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function SignInButton() {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === "loading") {
    return <>...</>;
  } else if (status === "authenticated") {
    return (
      <Link href="/dashboard">
        <img
          src={session?.user?.image ?? "/mememan.webp"}
          alt={session?.user?.name ?? "No name"}
          width={32}
          height={32}
        />
      </Link>
    );
  }

  return <button onClick={() => signIn()}>Sign In</button>;
}

export function SignOutButton() {
  return <button onClick={() => signOut()}>Sign Out</button>;
}
