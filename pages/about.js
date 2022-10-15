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
              <strong>data.wikilovesmonuments.it</strong> is an online
              visualization that keeps track of how many Italian monuments are
              documented on Wikidata, and how many of those are photographed at
              least once.
            </p>
            <p>
              “Monument” is an umbrella term that collects many definitions of
              cultural properties. In this project, it is considered a monument
              any{" "}
              <a href="https://www.wikidata.org/wiki/Help:Items">
                Wikidata item
              </a>{" "}
              located in Italy which is an instance of peculiar types (for
              example Church, Castle, …) or that participates in the{" "}
              <a href="https://it.wikipedia.org/wiki/Progetto:Wiki_Loves_Monuments_2022">
                Italian Wiki Loves Monument contest
              </a>
              .
            </p>
            <p>
              The goal is to provide a geographical and temporal overview of the
              evolution of photographic documentation, both in relation to the
              “Wiki Loves Monuments” contest and to the Commons in general.
            </p>
            <p>
              In the first case, you can see the monuments aggregated into three
              main categories: an estimate of monuments present on Wikidata,
              monuments that are part of the context, and monuments photographed
              one or more times. The second category is needed due to{" "}
              <a href="https://en.wikipedia.org/wiki/Freedom_of_panorama#Italy">
                a limitation introduced by the Italian government
              </a>{" "}
              stating that you need authorization from the monument’s owner to
              upload a picture of it using a Creative Commons license compliant
              with the Commons policies.
            </p>
            <p>
              The second view allows you to see two main categories: the
              monuments documented on Wikidata and the ones that have at least
              one picture on the Commons depicting them. Some monuments have
              been photographed outside the Wiki Loves Monuments contest.
            </p>
            <p>
              You can filter space and time in both views, moving from the
              national overview to single municipalities.
            </p>
            <p>
              Finally, you can explore the monuments in a given area in a
              tabular form, checking their status at the current moment.
            </p>
            <p>
              The project is realized by{" "}
              <a href="https://densitydesign.org/">DensityDesign Lab</a> and{" "}
              <a href="https://www.wikimedia.it/">Wikimedia Italia</a>, with the
              help of <a href="https://inmagik.com/">Inmagik</a>.
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
