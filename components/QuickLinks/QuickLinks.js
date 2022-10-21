import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./QuickLinks.module.scss";
import { ToggleButtonGroupUI } from "../UI-Components";
import { useEffect, useState } from "react";

export default function QuickLinks() {
  const router = useRouter();
  const [radios, setRadios] = useState([
    { name: "Map", value: "1", href: "/", disabled: "/" === router.route },
    { name: "List", value: "2", href: "/list", disabled: "/list" === router.route },
  ]);
  const [radioValue, setRadioValue] = useState(
    radios.find((d) => d.href === router.route)?.value
  );
  useEffect(() => {
    const href = radios.find((d) => d.value === radioValue)?.href;
    router.push(href)
  }, [radioValue]);
  return (
    <ToggleButtonGroupUI
      label={"View as"}
      radios={radios}
      radioValue={radioValue}
      setRadioValue={setRadioValue}
    />
  );
}
