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
  2022: "/#explorationModePar=wlm&showDeltaPar=true&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&selectedTimeFrameLabel=Custom%20interval&dateFrom=2022-08-31&dateTo=2022-09-30",
  2021: "/#explorationModePar=wlm&showDeltaPar=true&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&selectedTimeFrameLabel=Custom%20interval&dateFrom=2021-08-31&dateTo=2021-09-30",
  2020: "/#explorationModePar=wlm&showDeltaPar=true&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&selectedTimeFrameLabel=Custom%20interval&dateFrom=2020-08-31&dateTo=2020-09-30",
  2019: "/#explorationModePar=wlm&showDeltaPar=true&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&selectedTimeFrameLabel=Custom%20interval&dateFrom=2019-08-31&dateTo=2019-09-30",
  2018: "/#explorationModePar=wlm&showDeltaPar=true&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&selectedTimeFrameLabel=Custom%20interval&dateFrom=2018-08-31&dateTo=2018-09-30",
  2017: "/#explorationModePar=wlm&showDeltaPar=true&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&selectedTimeFrameLabel=Custom%20interval&dateFrom=2017-08-31&dateTo=2017-09-30",
  2016: "/#explorationModePar=wlm&showDeltaPar=true&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&selectedTimeFrameLabel=Custom%20interval&dateFrom=2016-08-31&dateTo=2016-09-30",
  2015: "/#explorationModePar=wlm&showDeltaPar=true&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&selectedTimeFrameLabel=Custom%20interval&dateFrom=2015-08-31&dateTo=2015-09-30",
  2014: "/#explorationModePar=wlm&showDeltaPar=true&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&selectedTimeFrameLabel=Custom%20interval&dateFrom=2014-08-31&dateTo=2014-09-30",
  2013: "/#explorationModePar=wlm&showDeltaPar=true&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&selectedTimeFrameLabel=Custom%20interval&dateFrom=2013-08-31&dateTo=2013-09-30",
  2012: "/#explorationModePar=wlm&showDeltaPar=true&filterDataParams=photographed%3Atrue%3BinContest%3Afalse%3BonWiki%3Afalse&selectedTimeFrameLabel=Custom%20interval&dateFrom=2012-08-31&dateTo=2012-09-30",
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
    <Dropdown className={classNames("mb-3")} autoClose={true}>
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
