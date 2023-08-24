import React from "react";
import { RiRefreshLine } from "react-icons/ri";

const RefreshButton = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <button
      onClick={handleRefresh}
      style={{ border: "none", background: "none" }}
    >
      <RiRefreshLine size={20} />
    </button>
  );
};

export default RefreshButton;
