import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./QuickLinks.module.scss";

export default function QuickLinks() {
  const router = useRouter();
  return (
    <p>
      View as {router.route === "/" && <Link href="list">List</Link>}
      {router.route === "/list" && <Link href="/">Map</Link>}
    </p>
  );
}
