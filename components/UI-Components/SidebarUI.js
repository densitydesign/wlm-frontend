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
import Link from "next/link";

export default function SidebarUI() {
  const [clicked, setClicked] = useState(0);
  return (
    <div className={classNames(styles.sideBar, "d-flex", "flex-column")}>
      <NavMenu page="about" />
      <p>
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
          <img
            alt="Creative Commons License"
            style={{ borderWidth: 0 }}
            src="https://i.creativecommons.org/l/by/4.0/88x31.png"
          />
        </a>
        <br />
        This work is licensed under a{" "}
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
          Creative Commons Attribution 4.0 International License
        </a>
        .
      </p>
      <p>
        The data behind this work are licensed under a <strong>CC0 License</strong>. Weekly dumps
        can be accessed in CSV or XLSX format from the page{" "}
        <Link href="/list">List</Link>.<br />A{" "}
        <a href="https://wlm-it-visual.wmcloud.org/api/schema/swagger-ui/#/">
          dedicated API ednpoint
        </a>{" "}
        is made available for more specific queries.
      </p>
      <p>You can reset cookie consent at any time by clicking this button:</p>
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
