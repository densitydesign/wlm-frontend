import { colors } from "../../utils/ventagli.utils";

export default function StatusSymbol({ status }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: "0.7rem",
        height: "0.7rem",
        backgroundColor: colors[status],
        borderRadius: "50%",
        border: "1px solid #333",
      }}
    />
  );
}
