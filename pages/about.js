import Link from "next/link";
import Head from "next/head";

import { Col, Container, Row } from "react-bootstrap";
import classNames from "classnames";

import styles from "../styles/index.module.scss";
import SidebarUI from "../components/UI-Components/SidebarUI";
import LicenseAttribution from "../components/LicenseAttribution/LicenseAttribution";

const wikimedia = ["Dario Crespi", "Marta Arosio", "Catrin Vimercati", "Iolanda Pensa"]

const densitydesign = ["Tommaso Elli", "Andrea Benedetti", "Ángeles Briones", "Francesca Gheli", "Alessandro Quets", "Michele Mauri"]


export default function Page() {
	return (
		<>
			<Head>
				<title>About</title>
			</Head>
			
			<Container className={"aboutContainer"} fluid>
			<Row className={classNames("h-100")}>
				<Col className={classNames("pe-sm-3", "pe-md-0")} lg={3}>
					<SidebarUI />
				</Col>
				<Col className={classNames("pe-sm-3", "pe-md-0", "aboutContent")} lg={{span: 7, offset: 1}}>
					
					<blockquote><em>WikiLovesMonuments - Data visualization</em> is designed and developed by DensityDesign Lab, InMagik Srl in collaboration with Wikimedia Italia. The online visualization keeps track of how many "monuments" (an umbrella term that collects many definitions of cultural heritage) are mapped on Wikidata, and how many of those are photographed at least once during WikiLovesMonuments contests.</blockquote>

					<p>Users can explore the data across different temporal horizons, from the last seven days to the entire historical timeframe that starts in 2012. For each time aggregation, a data-driven fan is presented to the user, one for each geographical entity: from regions to municipalities in Italy.</p>

					<p>In a fan, each slice represents a variable time unit, like days or months. Each slice is divided into three areas representing three categories of monuments: the gray ones have a Wikidata entry, the yellow ones are monuments that have been authorized by local italian authorities to be photographed, and finally the green ones are those monuments that have been photographed for the first time, at least once.</p>

					<div className="credits">
					<em>A project developed by:</em>
						<div>
							<em>Wikimedia Italia</em>
							<ul>
								{wikimedia.map(wm => (
								<li key={wm}>{wm}</li>
								))}
							</ul>
						</div>
						<div>
							<em>DensityDesign Lab</em>
							<ul>
								{densitydesign.map(dd => (
								<li key={dd}>{dd}</li>
								))}
							</ul>
						</div>
						<div><em>In collaboration with InMagic Srl</em></div>
					</div>
					<LicenseAttribution />
				</Col>
				</Row>
			</Container>
		</>
	);
}
