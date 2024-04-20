import { RootState } from "@/redux/store";
import { CircularProgress, Dialog } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  const isActive = useSelector((state: RootState) => state.loader.isActive);

  return (
    <Dialog
      open={isActive}
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
};

export default Loader;
