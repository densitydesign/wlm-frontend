import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./QuickLinks.module.scss";
import { ToggleButtonGroupUI, DropdownUI } from "../UI-Components";
import { useEffect, useState } from "react";

export default function QuickLinks() {
  const router = useRouter();

  const [radios, setRadios] = useState([
    { label: "Map", value: "1", href: "/", disabled: "/" === router.route },
    { label: "List", value: "2", href: "/list", disabled: "/list" === router.route },
  ]);

  // For the toggleGroup
  const [radioValue, setRadioValue] = useState(
    radios.find((d) => d.href === router.route)?.value
  );
  useEffect(() => {
    const href = radios.find((d) => d.value === radioValue)?.href;
    router.push(href)
  }, [radioValue]);

  // For the dropdown
  const [radioValueDD, setRadioValueDD] = useState(
    radios.find((d) => d.href === router.route)
  );
  useEffect(() => {
    const href = radios.find((d) => d === radioValueDD)?.href;
    router.push(href)
  }, [radioValueDD]);

  return (
    <>
      {/* <ToggleButtonGroupUI
        label={"View as"}
        radios={radios}
        radioValue={radioValue}
        setRadioValue={setRadioValue}
      /> */}
      <DropdownUI
          label="View as"
          items={radios}
          value={radioValueDD}
          setValue={setRadioValueDD}
          hideReset={true}
        />
    </>
  );
}
