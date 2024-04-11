import { CircularProgress, Dialog } from "@mui/material";
import React from "react";
import "./loading.sass";

export interface LoadingProps {
  isActive: boolean;
}

const Loader = (props: LoadingProps) => (
  <Dialog
    open={props.isActive}
    PaperProps={{
      style: {
        backgroundColor: "transparent",
        boxShadow: "none",
        overflowY: "hidden",
        overflowX: "hidden",
      },
    }}
  >
    <div className="center-container">
      <CircularProgress className="circular-progress" size={120} />
    </div>
  </Dialog>
);

export default Loader;
