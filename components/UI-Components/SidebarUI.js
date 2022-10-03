
import {
  BsExclamationTriangleFill,
  BsDownload,
  BsFillPlayFill,
  BsArrowRepeat,
} from "react-icons/bs";
import classNames from "classnames";
import styles from "./UI-Components.module.scss";
import NavMenu from "../NavMenu";
import LicenseAttribution from "../LicenseAttribution/LicenseAttribution";


const wikimedia = ["Iolanda Pensa", "Catrin Vimercati", "Dario Crespi", "Marta Arosio"]

const densitydesign = ["Michele Mauri", "Tommaso Elli", "Andrea Benedetti", "Ángeles Briones", "Francesca Gheli", "Alessandro Quets", "Beatrice Gobbo"]

const inmagik = ["Mauro Bianchi"]

export default function SidebarUI() {
  return (
    <div className={classNames(styles.sideBar, "d-flex", "flex-column")}>
      <NavMenu page="about"/>
      <div className={classNames(styles.menu)}>
      <h5>A project developed by</h5>
      <h6>Wikimedia Italia</h6>
      <ul>
        {wikimedia.map(wm => (
          <li key={wm}>{wm}</li>
        ))}
      </ul>
      
      <h6>DensityDesign Lab</h6>
      <ul>
        {densitydesign.map(dd => (
          <li key={dd}>{dd}</li>
        ))}
      </ul>

      <h6>InMagik Srl</h6>
      <ul>
        {inmagik.map(im => (
          <li key={im}>{im}</li>
        ))}
      </ul>
      </div>
    </div>
  );
}
