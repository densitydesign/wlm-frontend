import { colors, labelsDict, glossary } from "../../utils/ventagli.utils";
import styles from "./ListController.module.scss";
import classNames from "classnames";
import NavMenu from "../NavMenu";
import { DropdownUI, SwitchUI } from "../UI-Components";
import { QuickLinks } from "../QuickLinks";
import { Accordion } from "react-bootstrap";

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
  toReview,
  setToReview,
  data,
  setData,
}) {
  return (
    <div className={classNames("d-flex", "flex-column")}>
      <NavMenu />
      <QuickLinks />
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Glossary</Accordion.Header>
          <Accordion.Body>
            <div
              style={{
                fontSize: "0.8rem",
              }}
            >
              <p className="mb-1">
                <span className="fw-bold">WLM Coverage</span>: photographic
                coverage of monuments in relation to the contest
              </p>
              <p className="mb-1">
                <span className="fw-bold">Commons Coverage</span>: coverage of
                monuments in relation to all traceable pictures from Commons
              </p>
              <p className="mb-1">
                <span className="fw-bold">WLM Pictures</span>: photographs of
                the corresponding monument taken during the contest (all
                editions)
              </p>
              <p className="mb-1">
                <span className="fw-bold">Relevant Pictures</span>: photographs
                of the corresponding monument present on the Wikidata page
              </p>
              <p className="mb-1">
                <span className="fw-bold">Creation date on Wikidata</span>:
                Wikidata page creation date of the corresponding monument
              </p>
              <p className="mb-1">
                <span className="fw-bold">WLM authorization date</span>: date of
                authorization to share pictures under a CC-SA-BY license of the
                corresponding monument. Corresponds to entry in contest
              </p>
              <p className="mb-1">
                <span className="fw-bold">First WLM picture</span>: date of the
                upload of the first image taken in the contest
              </p>
              <p className="mb-1">
                <span className="fw-bold">First WLM picture</span>: date of the
                upload of the first image taken in the contest
              </p>
              <p className="mb-1">
                <span className="fw-bold">First Commons picture</span>: date of
                the upload of the first image, among all the traceable ones
              </p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Filters</Accordion.Header>
          <Accordion.Body>
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
            <SwitchUI
              className={classNames("text-small", "mb-2")}
              label="Monument waiting for relevant picture"
              checked={toReview}
              setChecked={setToReview}
              disabled={false}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
