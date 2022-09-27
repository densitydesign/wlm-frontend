import styles from "./ExportTools.module.scss";
import { ButtonUI } from "../UI-Components";
import { BsDownload, BsFillPlayFill, BsArrowRepeat, BsXLg as CloseIcon, BsDisplay, BsPhone } from "react-icons/bs";
import classNames from "classnames";
import { MapVentagli } from "../MapVentagli";
import { useEffect, useState } from "react";
import Head from "next/head";
export default function ExportTools({ closeFunct, mapData }) {
	const dimensions = {
		mobile: {
			width: 400,
			height: 500,
		},
		computer: {
			width: 1280,
			height: 720,
		},
	};

	const [target, setTarget] = useState("mobile");
	const [viewbox, setViewBox] = useState(dimensions["mobile"]);

	const downloadSvg = () => {
		console.log("download svg")
		const filename = "WLM.svg"
		const text = document.querySelector(`.${styles.exportTools} svg`).outerHTML

		var element = document.createElement('a');
    element.setAttribute('href', 'data:text/svg;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    
    element.style.display = 'none';
    document.body.appendChild(element);
    
    element.click();
    
    document.body.removeChild(element);
	};

	return (
		<>
			<div className={classNames(styles.exportTools, "d-flex", "flex-column", "align-items-center", "justify-content-between", "p-3")}>
				<div className={classNames(styles.preview, { [styles.computer]: target === "computer" }, { [styles.mobile]: target === "mobile" }, "mb-3")}>
					<MapVentagli key="export-map" {...mapData} viewbox={viewbox} />
				</div>

				<div className={classNames("w-100", "d-flex", "flex-row", "justify-content-between")}>
					<span className={classNames("d-flex", "flex-row", "justify-content-center")} style={{ flex: "1 1 0px" }}>
						<ButtonUI content={<CloseIcon />} onClickAction={closeFunct} />
						<span>Export snapshot</span>
					</span>
					<span className={classNames("d-flex", "flex-row", "justify-content-center")} style={{ flex: "1 1 0px" }}>
						<ButtonUI
							content={<BsPhone />}
							onClickAction={() => {
								setViewBox(dimensions["mobile"]);
								setTarget("mobile");
							}}
						/>
						<ButtonUI
							content={<BsDisplay />}
							onClickAction={() => {
								setViewBox(dimensions["computer"]);
								setTarget("computer");
							}}
						/>
					</span>
					<span className={classNames("d-flex", "flex-row", "justify-content-center")} style={{ flex: "1 1 0px" }}>
						<ButtonUI label="Save SVG" content={<BsDownload />} onClickAction={downloadSvg} />
					</span>
				</div>
			</div>
		</>
	);
}
