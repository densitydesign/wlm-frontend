import styles from "./ExportTools.module.scss";
import { ButtonUI, DropdownUI, ToggleButtonGroupUI } from "../UI-Components";
import {
  BsDownload,
  BsFillPlayFill,
  BsArrowRepeat,
  BsXLg as CloseIcon,
  BsDisplay,
  BsPhone,
} from "react-icons/bs";
import classNames from "classnames";
import Map from "../Map";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
export default function ExportTools({ closeFunct, mapData }) {
  const viewboxes = [
    {
      label: <BsPhone  style={{ position: "relative", top: -1.5 }} />,
      value: "mobile",
      width: 400,
      height: 500,
    },
    {
      label: <BsDisplay style={{ position: "relative", top: -1.5 }} />,
      value: "desktop",
      width: 1280,
      height: 720,
    },
  ];
  const overlays = [
    {
      label: "complete",
    },
    {
      label: "compact",
    },
    {
      label: "clean",
    },
  ];
  const formats = [
    {
      label: ".svg",
    },
    {
      label: ".png",
    },
  ];

  const [viewbox, setViewbox] = useState(viewboxes[0].value);
  const [overlay, setOverlay] = useState(overlays[0]);
  const [format, setFormat] = useState(formats[1]);

  const exportRef = useRef();

  const downloadSvg = () => {
    console.log("download svg");
    const filename = "WLM.svg";
    const svg = document.querySelector(`.${styles.exportTools} .ventagli-map`);
    const svgtext = svg.outerHTML;

    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/svg;charset=utf-8," + encodeURIComponent(svgtext)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const downloadPng = async () => {
    console.log("PNGGGGGG");
    const canvas = await html2canvas(exportRef.current);
    const image = canvas.toDataURL("image/png", 1.0);
    const filename = "WLM.png";
    downloadImage(image, filename);
  };

  const download = () => {
    if (format.label === ".svg") {
      downloadSvg();
    } else {
      downloadPng();
    }
  };

  const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };

  return (
    <>
      <div
        className={classNames(
          styles.exportTools,
          "export-tools",
          "d-flex",
          "flex-column",
          "align-items-center",
          "justify-content-between",
          "p-3"
        )}
      >
        <div
          className={classNames(
            "w-100",
            "d-flex",
            "flex-row",
            "justify-content-between"
          )}
        >
          <span className={classNames("d-flex", "flex-row")}>
            <ButtonUI
              content={<CloseIcon style={{ position: "relative", top: -1.5 }} />}
              onClickAction={closeFunct}
            />
          </span>
          <span className={classNames("d-flex", "flex-row")}>
            <ToggleButtonGroupUI
              label="Format"
              boldLabel={true}
              radios={viewboxes}
              radioValue={viewbox}
              setRadioValue={(value) => setViewbox(value)}
            />
          </span>
          <span className={classNames("d-flex", "flex-row")}>
            <DropdownUI
              label="Overlay"
              boldLabel={true}
              items={overlays}
              value={overlay}
              setValue={setOverlay}
              hideReset
            />
          </span>
          <span className={classNames("d-flex", "flex-row")}>
            <DropdownUI
              label="Format"
              boldLabel={true}
              items={formats}
              value={format}
              setValue={setFormat}
              hideReset
            />
          </span>
          <span className={classNames("d-flex", "flex-row")}>
            <ButtonUI
              label="Save"
              boldLabel={true}
              content={<BsDownload style={{ position: "relative", top: -2 }} />}
              onClickAction={download}
            />
          </span>
        </div>
        <div ref={exportRef} className={classNames(styles.preview, "mb-3")}>
          <Map
            {...mapData}
            viewbox={viewboxes.find((v) => v.value === viewbox)}
            overlay={overlay}
          />
        </div>
        <div>
          <p className="small">
            To further edit your visualization in a vector graphics editor,
            download the{" "}
            <a
              href="https://fonts.google.com/noto/specimen/Noto+Sans"
              target="_blank"
              rel="noreferrer"
            >
              Noto Sans font family
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
