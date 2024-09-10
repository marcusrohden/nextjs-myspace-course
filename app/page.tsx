import { getServerSession } from "next-auth";
import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(`session: ${JSON.stringify(session)}`);

  if (!session) {
    redirect("/api/auth/signin");
  }
  return <main className={styles.main}></main>;
}
