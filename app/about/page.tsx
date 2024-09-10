export const dynamic = "force-static";

import { Metadata } from "next";

const about: string = "Our Social Media Example";

export const metadata: Metadata = {
  title: "About Us",
  description: about,
};

export default async function About() {
  return (
    <main>
      <h1>About</h1>
      <p>{about}</p>
    </main>
  );
}
