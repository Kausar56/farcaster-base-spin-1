import Modal from "@/components/common/Modal";
import React, { useEffect, useState } from "react";
import ScoreCheckDialog from "./ScoreCheckDialog";

const ScoreCheck = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hasSeenDialog = JSON.parse(
      localStorage.getItem("hasCheckedScore") || "false"
    );
    if (!hasSeenDialog) {
      setShow(true);
    }
  }, []);
  return show && <ScoreCheckDialog setShow={setShow} />;
};

export default ScoreCheck;
