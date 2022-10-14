import { colors } from "../../utils/ventagli.utils";
import { useState, useRef } from "react";
import { Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";
import {color as d3color} from "d3"

export default function StatusSymbol({ status }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <>
      <OverlayTrigger placement={"right"} overlay={<Tooltip>{status}</Tooltip>}>
        <span
          style={{
            display: "block",
            width: "48px",
            height: "12px",
            backgroundColor: colors[status],
            borderRadius: "4px",
            border: "1.5px solid #333",
            borderColor: d3color(colors[status] || "#fff").darker(1),
            cursor: "help"
          }}
        />
      </OverlayTrigger>
    </>
  );
}
