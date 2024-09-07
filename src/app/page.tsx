import { serverFetch } from "@/utils/api";
import Link from "next/link";

export default async function Home() {
  const story = await serverFetch('https://api.truyenhot.info/story');

  return (<div>

    home
    <br/>
    <Link href="/protected">Đến route dc protect</Link>
  </div>)
}

