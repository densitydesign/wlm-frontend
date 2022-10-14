import { colors } from "../../utils/ventagli.utils";
import { useState, useRef } from "react";
import { Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function StatusSymbol({ status }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <>
      {/* <span
        ref={target}
        onClick={() => setShow(!show)}
        style={{
          display: "block",
          width: "0.7rem",
          height: "0.7rem",
          backgroundColor: colors[status],
          borderRadius: "50%",
          border: "1px solid #333",
        }}
      >sss</span>
      <Overlay target={target.current} show={show} placement="right" >
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {status}
          </Tooltip>
        )}
      </Overlay> */}
    
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
