import styles from "./ListController.module.scss";
import classNames from "classnames";
import NavMenu from "../NavMenu";
import { DropdownUI } from "../UI-Components";
import { QuickLinks } from "../QuickLinks";

export default function ToolsPanel({
  regionsList,
  setRegionsList,
  region,
  setRegion,
  provincesList,
  setProvincesList,
  province,
  setProvince,
  municipalitiesList,
  setMunicipalitiesList,
  municipality,
  setMunicipality,
  themesList,
  setThemesList,
  theme,
  setTheme,
  data,
  setData,
}) {
  return (
    <div className={classNames("d-flex", "flex-column")}>
      <NavMenu />
      <QuickLinks/>
      <h6>Areas</h6>
      <DropdownUI
        defaultLabel={"Select a region"}
        items={regionsList}
        value={region}
        setValue={setRegion}
        disabled={!regionsList.length}
      />
      <DropdownUI
        defaultLabel={"Select a province"}
        items={provincesList}
        value={province}
        setValue={setProvince}
        disabled={!provincesList.length}
      />
      <DropdownUI
        defaultLabel={"Select a municipality"}
        items={municipalitiesList}
        value={municipality}
        setValue={setMunicipality}
        disabled={!municipalitiesList.length}
      />
      <h6>Themes</h6>
      <DropdownUI
        defaultLabel={"Select a monument type"}
        items={themesList}
        value={theme}
        setValue={setTheme}
        disabled={!themesList.length}
      />
      <h6>Status Filter</h6>
      <h6>Export</h6>
      <h6>Legend</h6>
    </div>
  );
}
