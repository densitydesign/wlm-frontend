import { forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dropdown, DropdownButton, Button } from "react-bootstrap";
import styles from "./NavMenu.module.scss";
import { HiMenu } from "react-icons/hi";
import { GoHeart } from "react-icons/go";
import { GiSpottedBug } from "react-icons/gi";
import classNames from "classnames";

const contestsPaths = {
  2022: "/#explModeValue=wlm&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&showDeltaPar=true&dateFrom=2022-09-01&dateTo=2022-09-30&selectedTimeFramePar=Custom%20interval",
  2021: "/#explModeValue=wlm&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&showDeltaPar=true&dateFrom=2021-09-01&dateTo=2021-09-30&selectedTimeFramePar=Custom%20interval",
  2020: "/#explModeValue=wlm&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&showDeltaPar=true&dateFrom=2020-09-01&dateTo=2020-09-30&selectedTimeFramePar=Custom%20interval",
  2019: "/#explModeValue=wlm&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&showDeltaPar=true&dateFrom=2019-09-01&dateTo=2019-09-30&selectedTimeFramePar=Custom%20interval",
  2018: "/#explModeValue=wlm&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&showDeltaPar=true&dateFrom=2018-09-01&dateTo=2018-09-30&selectedTimeFramePar=Custom%20interval",
  2017: "/#explModeValue=wlm&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&showDeltaPar=true&dateFrom=2017-09-01&dateTo=2017-09-30&selectedTimeFramePar=Custom%20interval",
  2016: "/#explModeValue=wlm&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&showDeltaPar=true&dateFrom=2016-09-01&dateTo=2016-09-30&selectedTimeFramePar=Custom%20interval",
  2015: "/#explModeValue=wlm&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&showDeltaPar=true&dateFrom=2015-09-01&dateTo=2015-09-30&selectedTimeFramePar=Custom%20interval",
  2014: "/#explModeValue=wlm&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&showDeltaPar=true&dateFrom=2014-09-01&dateTo=2014-09-30&selectedTimeFramePar=Custom%20interval",
  2013: "/#explModeValue=wlm&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&showDeltaPar=true&dateFrom=2013-09-01&dateTo=2013-09-30&selectedTimeFramePar=Custom%20interval",
  2012: "/#explModeValue=wlm&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&showDeltaPar=true&dateFrom=2012-09-01&dateTo=2012-09-30&selectedTimeFramePar=Custom%20interval",
};

const HairyMenu = forwardRef(({ children, onClick }, ref) => (
  <Button
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    size="sm"
    variant="lightBlue"
    className={classNames(
      styles.btnWlm,
      "w-100",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    )}
  >
    <span>{children}</span>
    <HiMenu className={classNames("ms-1")} />
  </Button>
));

HairyMenu.displayName = "HairyMenu";

export default function NavMenu(props) {
  const { basePath } = useRouter();
  const router = useRouter();

  const forceNavigation = (e, href) => {
    e.preventDefault();
    router.push(href);
    router.reload();
  };

  const pageStatus = props.page;

  return (
    <Dropdown className={classNames("mb-2")} autoClose={true}>
      <Dropdown.Toggle as={HairyMenu} id="dropdown-autoclose-false">
        Wiki
        <GoHeart />
        Monuments{" "}
        <span
          className="small"
          style={{ textTransform: "uppercase", opacity: 0.7, fontWeight: 500 }}
        >
          alpha 0.2
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu className={classNames("w-100")}>
        <Link href={`/`} passHref>
          <Dropdown.Item>Home</Dropdown.Item>
        </Link>
        <Link href={`/about`} passHref>
          <Dropdown.Item>About the project</Dropdown.Item>
        </Link>
        <Link
          href={`https://github.com/densitydesign/wlm-frontend/issues`}
          passHref
        >
          <Dropdown.Item>
            <span style={{ color: "var(--bs-indigo)" }}>
              Report a bug <GiSpottedBug />
            </span>
          </Dropdown.Item>
        </Link>
        {/* <Link href={`/about`} passHref>
					<Dropdown.Item>About</Dropdown.Item>
				</Link> */}
        <Dropdown.Item href="https://www.wikimedia.it/wiki-loves-monuments/">
          WikiLovesMonuments
        </Dropdown.Item>
        {router.route === "/" && (
          <>
            <Dropdown.Header>Contests</Dropdown.Header>
            {Object.keys(contestsPaths)
              .reverse()
              .map((d, i) => (
                <Dropdown.Item
                  key={"cp" + i}
                  href={contestsPaths[d]}
                  onClick={(e) => forceNavigation(e, contestsPaths[d])}
                >
                  {d}
                </Dropdown.Item>
              ))}
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
