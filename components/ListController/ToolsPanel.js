import { colors, labelsDict, glossary } from "../../utils/ventagli.utils";
import styles from "./ListController.module.scss";
import classNames from "classnames";
import NavMenu from "../NavMenu";
import { DropdownUI } from "../UI-Components";
import {color as d3color} from "d3"


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
      <h6>Glossary</h6>
      {/* <ul style={{
        paddingLeft: 0,
        fontSize: "0.8rem"
      }}>
        {
          Object.entries(labelsDict).map(key => {
            console.log(colors[key[0]])
            return <li style={{listStyle: "none"}}>
                <span style={{
                    display: "inline-block",
                    backgroundColor: colors[key[0]],
                    width: 20,
                    height: 10,
                    marginRight: 10,
                    borderRadius: "2px",
                    border: "1.5px solid #333",
                    borderColor: d3color(colors[key[0]] || "#fff").darker(1),
                  }}>
                </span>
                  {labelsDict[key[0]].explained}
              </li>
          })
        }
      </ul> */}
      <div style={{
        fontSize: "0.8rem"
      }}>
        {glossary.map(glossary => (
          <p key={glossary}>{glossary}</p>
        ))}
      </div>
    </div>
  );
}
