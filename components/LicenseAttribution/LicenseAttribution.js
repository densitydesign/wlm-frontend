import styles from "./LicenseAttribution.module.scss";

export default function LicenseAttribution() {
	return (
		<p className="text-small">
			<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
				<img alt="Licenza Creative Commons" style={{ borderWidth: 0, maxHeight: 16 }} src="https://upload.wikimedia.org/wikipedia/commons/9/9e/CC-BY.svg" />
			</a>{" "}
			This{" "}
			<span xmlnsDct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" rel="dct:type">
				work
			</span>{" "}
			by
			<span xmlnsCc="http://creativecommons.org/ns#" property="cc:attributionName">
				DensityDesign Research Lab, Politecnico di Milano / Wikimedia Italia
			</span>{" "}
			is licensed under a{" "}
			<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
				Creative Commons Attribution 4.0 International
			</a>
			.
		</p>
	);
}
