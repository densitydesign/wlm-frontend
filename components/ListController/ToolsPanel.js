import { colors, labelsDict, glossary } from "../../utils/ventagli.utils";
import styles from "./ListController.module.scss";
import classNames from "classnames";
import NavMenu from "../NavMenu";
import { ButtonUI, DropdownUI, SwitchUI } from "../UI-Components";
import { QuickLinks } from "../QuickLinks";
import { Accordion, Form } from "react-bootstrap";
import { apiBaseUrl } from "../../utils/fetchData.utils";
import { useState } from "react";
import { BsExclamationTriangleFill } from "react-icons/bs";

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
  statusFilter,
  setStatusFilter,
  data,
  setData,
  lastSnapshot,
}) {
  const [downloadError, setDownloadError] = useState(false);
  const handleStatusesFilter = (mode, status) => {
    const _newFilter = [...statusFilter];
    const _mode = _newFilter.find((d) => d.mode === mode.mode);
    const _status = _mode.statuses.find((d) => d.code === status.code);
    _status.active = !_status.active;
    setStatusFilter(_newFilter);
  };
  const downloadFile = (file) => {
    console.log(file);
    fetch(file.href)
      .then((resp) => {
        if (resp.status === 200) {
          return resp.blob();
        }
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        // the filename you want
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        alert("your file has downloaded!"); // or you know, something with better UX...
      })
      .catch((err) => {
        console.error("Can't download your file:", err);
        setDownloadError(true);
      });
  };
  return (
    <div className={classNames("d-flex", "flex-column")}>
      <NavMenu />
      <QuickLinks />
      <Accordion className={styles.accordion} defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header className={styles.accordionHeader}>
            Filters
          </Accordion.Header>
          <Accordion.Body className={styles.accordionBody}>
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
            <h6>Status</h6>
            {statusFilter.map((mode) => (
              <div key={mode.label} className="mb-2">
                <p className="mt-1 mb-0 fw-semibold">{mode.label}</p>
                {mode.statuses.map((status) => (
                  <div key={status.code}>
                    <Form.Check.Input
                      type="checkbox"
                      className={classNames("me-1")}
                      id={"checkbox-" + mode.label}
                      checked={status.active}
                      onChange={() => handleStatusesFilter(mode, status)}
                    />
                    <Form.Check.Label
                      className={classNames("m-0", "p-0")}
                      htmlFor={"checkbox-" + mode.label}
                      style={{ cursor: "pointer" }}
                    >
                      {status.explained}
                    </Form.Check.Label>
                  </div>
                ))}
              </div>
            ))}
            <h6>Curation</h6>
            <SwitchUI
              className={classNames("text-small", "mb-2")}
              label="Waiting for relevant picture"
              checked={toReview}
              setChecked={setToReview}
              disabled={false}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header className={styles.accordionHeader}>
            Glossary
          </Accordion.Header>
          <Accordion.Body className={styles.accordionBody}>
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
        <Accordion.Item eventKey="2">
          <Accordion.Header className={styles.accordionHeader}>
            Downloads
          </Accordion.Header>
          <Accordion.Body className={styles.accordionBody}>
            <p>Download the complete list of monuments</p>
            {downloadError && (
              <div className="mb-3 d-flex align-items-center">
                <BsExclamationTriangleFill
                  className={classNames("me-2", "mb-1")}
                  style={{ fontSize: "1.5rem", color: "var(--bs-interactive)" }}
                />
                <p className="mb-0">An error occurred while downloading your file.</p>
              </div>
            )}
            <div className="d-flex align-items-center">
              <ButtonUI
                className="me-2"
                content=".xlsx"
                onClickAction={() => {
                  const file = {
                    name: `all-monuments-${lastSnapshot}.xlsx`,
                    href: `${apiBaseUrl}/api/monument/xlsx/`,
                  };
                  downloadFile(file);
                }}
              />
              <ButtonUI
                content=".csv"
                onClickAction={() => {
                  const file = {
                    name: `all-monuments-${lastSnapshot}.csv`,
                    href: `${apiBaseUrl}/api/monument/csv/`,
                  };
                  downloadFile(file);
                }}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
