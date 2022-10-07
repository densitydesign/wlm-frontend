import { colors } from "../../utils/ventagli.utils";

export default function StatusSymbol({ status }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: "1rem",
        height: "1rem",
        backgroundColor: colors[status],
        borderRadius: "50%",
        border: "1px solid #333",
      }}
    />
  );
}
