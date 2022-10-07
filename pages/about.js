import Link from "next/link";
import Head from "next/head";

import { Col, Container, Row } from "react-bootstrap";
import classNames from "classnames";

import styles from "../styles/index.module.scss";
import SidebarUI from "../components/UI-Components/SidebarUI";
import LicenseAttribution from "../components/LicenseAttribution/LicenseAttribution";

const wikimedia = [
  "Dario Crespi",
  "Marta Arosio",
  "Catrin Vimercati",
  "Iolanda Pensa",
];

const densitydesign = [
  "Tommaso Elli",
  "Andrea Benedetti",
  "Ángeles Briones",
  "Francesca Gheli",
  "Alessandro Quets",
  "Michele Mauri",
];

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
          <Col
            className={classNames("pe-sm-3", "pe-md-0", "aboutContent")}
            lg={{ span: 7, offset: 1 }}
          >
            <blockquote>
              <em>WikiLovesMonuments - Data visualization</em> is an online
              visualization keeps track of how many Italian monuments are mapped
              on Wikidata, and how many of those are photographed at least once.
            </blockquote>

            <p>
              &#8220;Monument&#8221; is an umbrella term that collects many
              definitions of cultural properties. In our work, we define a
              monument starting from Wikidata. First we query Wikidata for all
              items located in Italy (
              <span className="font-monospace">?monument wdt:P17 wd:Q38</span>)
              that present{" "}
              <a
                href="https://github.com/densitydesign/wlm-backend/blob/server/server/wlm/main/WIKI_CANDIDATE_TYPES.csv"
                target="_blank"
              >
                certain types of description
              </a>
              , or &#8220;instance of&#8221; (
              <span className="font-monospace">
                ?monument wdt:P31/wdt:P279* ?types
              </span>
              ). Then we merge them with all the items that participate to the
              Italian WLM contest (
              <span className="font-monospace">?monument p:P2186 ?wlmId</span>).
            </p>

            <p>
              Users can explore the data about monuments across temporal
              horizons, geographical areas and themes. For every parameter
              configuration, the application visualizes a number of data-driven
              fan, one for each geographical entity (regions, provinces,
              municipalities).
            </p>

            <p>
              In a fan, each slice represents a variable time unit like a day, a
              month or a year. A slice is divided into different areas according
              to the exploration mode selected by the user: Wiki Loves Monuments
              or All Commons.
            </p>
            <p>
              In the first case (explore Wiki Loves Monuments) a slice is
              divided into three concentric areas, representing how many items
              fall in the following three status: gray for the ones that are on
              Wikidata, yellow for the subset of monuments that participate in
              the contest, and green for the ones that, during the contest, have
              been photographed at least once.
              <br />
              In the second case (explore all Commons) a slice is divided into
              two areas, representing in grey the amount of monuments that are
              on Wikidata and in orange the amount of photographed ones.
            </p>
            <p>
              It is necessary to perform this differentiation due to a
              limitation introduced by the Italian &#8220;Code of Cultural
              Heritage and Landscape&#8221; (Legislative Decree No. 42, dated
              January 22, 2004, and its subsequent amendments). The legislative
              decree allows the reproduction of Italian cultural property for
              personal use or study, but requires a further authorization for
              any other purpose, such as the commercial use.
            </p>
            <p>
              The project is realized by DensityDesign Lab and Wikimedia Italia,
              with the help of Inmagik.
            </p>

            <div className="credits">
              <em>Credits:</em>
              <div>
                <em>Wikimedia Italia</em>
                <ul>
                  {wikimedia.map((wm) => (
                    <li key={wm}>{wm}</li>
                  ))}
                </ul>
              </div>
              <div>
                <em>DensityDesign Lab</em>
                <ul>
                  {densitydesign.map((dd) => (
                    <li key={dd}>{dd}</li>
                  ))}
                </ul>
              </div>
              <div>
                <em>Inmagik</em>
                <ul>
                  {["Mauro Bianchi"].map((dd) => (
                    <li key={dd}>{dd}</li>
                  ))}
                </ul>
              </div>
            </div>
            <LicenseAttribution />
          </Col>
        </Row>
      </Container>
    </>
  );
}
