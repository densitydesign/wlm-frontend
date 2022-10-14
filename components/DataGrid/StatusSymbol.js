import { colors } from "../../utils/ventagli.utils";
import { useState, useRef } from "react";
import { Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function StatusSymbol({ status }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <>
      <OverlayTrigger placement={"right"} overlay={<Tooltip>{status}</Tooltip>}>
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
      </OverlayTrigger>
    </>
  );
}
