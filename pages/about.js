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
            <p>
              <em>data.wikilovesmonuments.it</em> is a visualization platform
              designed and built around Wiki Loves Monuments Italy (WLM), a
              contest that fosters the Wikimedia Community to depict and share
              photographs of monuments on Wikimedia Commons, under an open
              license. Additionally, it also keeps track of how many Italian
              monuments are depicted on Wikimedia Commons, even if pictures are
              not related to WLM.
            </p>
            <p>
              “Monument” is an umbrella term that collects many definitions of
              cultural properties. In our work, we define a monument starting
              from Wikidata. First we query Wikidata for all items located in
              Italy that present certain types of description, or “instance of”.
              Then we merge them with all the items that participate to the
              Italian WLM contest.
            </p>
            <p>
              Users can explore the data about monuments across temporal ranges,
              geographical areas and themes. Taking into account these
              parameters, the application visualizes a number of data-driven
              fans, one for each geographical entity (regions, provinces,
              municipalities). In a fan, each slice represents a variable time
              unit, like a day, a month, or a year. A slice is divided into
              different areas according to the exploration mode selected by the
              user: “Wiki Loves Monuments” or “All Commons”.
            </p>
            <p>
              For the exploration mode Wiki Loves Monuments, a fan slice is
              divided into three areas, representing how many items fall in the
              following three statuses: gray for the ones that are on Wikidata,
              yellow for the subset that also participate in the contest, and
              green for the ones that, during the contest, have been
              photographed (at least once). For the exploration mode All
              Commons, a slice is divided into two areas, representing in gray
              the amount of monuments that are on Wikidata and in orange the
              amount of photographed ones.
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
