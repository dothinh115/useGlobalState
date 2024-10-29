import HomePage from "@/components/Home";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      home
      <br />
      <Link href="/protected">Đến route dc protect</Link>
      <div>
        <HomePage />
      </div>
    </div>
  );
}
