import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./WhatsNew.module.scss";
import { colors } from "../../utils/ventagli.utils";
import classNames from "classnames";
import { max as d3Max } from "d3";

const labelsDict = {
  onWIki: {
    explained: "Monuments on Wikidata",
  },
  inContest: {
    explained: "Monuments in contest",
  },
  photographed: {
    explained: "Photographed for the first time",
  },
};

export default function WhatsNew({ data, filterData, setFilterData }) {
  const [max, setMax] = useState();
  useEffect(() => {
    const scaleMax = d3Max(
      data.extent.map((group) => group.value[1] - group.value[0])
    );
    setMax(scaleMax);
  }, [data]);
  return (
    <>
      <h6>What&apos;s new</h6>
      <div className="mb-3">
        {data.extent.map((d, i) => (
          <Group
            key={i}
            group={d}
            max={max}
            filterData={filterData}
            setFilterData={setFilterData}
          />
        ))}
      </div>
    </>
  );
}

function Group({ group, max, filterData, setFilterData }) {
  const initialStatus = filterData.find((f) => group.label === f.label).active;
  const [checked, setChecked] = useState(initialStatus);
  const [isDisabled, setIsDisabled] = useState(false);

  const amount = useMemo(() => {
    return group.value[1] - group.value[0];
  }, [group]);

  const barWidth = useMemo(() => {
    return (amount / max) * 100;
  }, [amount, max]);

  useEffect(() => {
    const newFilterData = [...filterData];
    newFilterData.find((f) => group.label === f.label).active = checked;
    setFilterData(newFilterData);
  }, [checked]);

  useEffect(() => {
    const newStatus = filterData.find((f) => group.label === f.label).active;
    setChecked(newStatus);
    const _disabled =
      filterData.filter((d) => d.active).length < 2 && checked === true;
    setIsDisabled(_disabled);
  }, [filterData]);

  return (
    <div className={classNames(styles.group)}>
      <input
        name={group.label}
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        disabled={isDisabled}
      />
      <span className={classNames(styles.bar)}>
        <div
          style={{
            backgroundColor: colors[group.label],
            width: `${barWidth}%`,
          }}
        />
        <span className={classNames(styles.amount)}>
          {amount >= 0 ? "+" : ""}
          {amount}
        </span>
      </span>
      <span className={classNames(styles.explained, "text-small")}>
        {labelsDict[group.label].explained}
      </span>
    </div>
  );
}
