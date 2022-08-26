import styles from "./LicenseAttribution.module.scss";
import classNames from "classnames";

export default function LicenseAttribution() {
	const attr_xmlns_cc = {
		"xmlns:cc": "http://creativecommons.org/ns#",
	};
	const attr_xmkns_dc = {
		"xmlns:dct": "http://purl.org/dc/terms/",
	};
	return (
		<p className={classNames("text-small", styles.licenseAttribution)}>
			<a className={classNames("d-flex", "me-1")} rel="license" href="http://creativecommons.org/licenses/by/4.0/">
				<img className={classNames("me-1")} alt="Licenza Creative Commons" style={{ borderWidth: 0, maxHeight: "1rem" }} src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" />
				<img alt="Licenza Creative Commons" style={{ borderWidth: 0, maxHeight: "1rem" }} src="https://mirrors.creativecommons.org/presskit/icons/by.svg" />
			</a>
			<span>
				<span {...attr_xmkns_dc} href="http://purl.org/dc/dcmitype/InteractiveResource" rel="dct:type">
					Work
				</span>{" "}
				by{" "}
				<span {...attr_xmlns_cc} property="cc:attributionName">
					DensityDesign (Politecnico di Milano) &#38; Wikimedia Italia.
				</span>{" "}
				License:{" "}
				<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
					Creative Commons Attribution 4.0 International
				</a>
			</span>
		</p>
	);
}
