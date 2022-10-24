import classNames from "classnames";
import styles from "./UI-Components.module.scss";
import NavMenu from "../NavMenu";
import { Button } from "react-bootstrap";
import { useState } from "react";

import {
  Cookies,
  getCookieConsentValue,
  resetCookieConsentValue,
} from "react-cookie-consent";

export default function SidebarUI() {
  const [clicked, setClicked] = useState(0);
  return (
    <div className={classNames(styles.sideBar, "d-flex", "flex-column")}>
      <NavMenu page="about" />
      <p>
        You can reset cookie consent at any time by clicking this button:
      </p>
      <Button
        size="sm"
        variant="lightBlue"
        onClick={() => {
          resetCookieConsentValue("enableVisitorCount");
          setClicked(clicked + 1);
        }}
      >
        Reset cookie consent
      </Button>
      {clicked > 0 && <p>Your cookie consent is reset</p>}
    </div>
  );
}
