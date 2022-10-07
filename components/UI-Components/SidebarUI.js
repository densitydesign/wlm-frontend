import classNames from "classnames";
import styles from "./UI-Components.module.scss";
import NavMenu from "../NavMenu";

export default function SidebarUI() {
  return (
    <div className={classNames(styles.sideBar, "d-flex", "flex-column")}>
      <NavMenu page="about"/>
    </div>
  );
}
