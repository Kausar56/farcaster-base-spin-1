import React, { useEffect, useState } from "react";
import useAuth from "../useAuth";

const AppConfig = () => {
  const { configData, isConfigLoading, updateConfig, isUpdatingConfig } =
    useAuth();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [pauseSpin, setPauseSpin] = useState(false);
  const [pauseQuiz, setPauseQuiz] = useState(false);

  useEffect(() => {
    if (configData && configData.isSuccess) {
      setMaintenanceMode(configData?.config?.maintenanceMode);
      setPauseSpin(configData?.config?.isSpinPaused);
      setPauseQuiz(configData?.config?.isQuizPaused);
    }
  }, [configData]);

  const handleUpdateConfig = () => {
    updateConfig({
      maintenanceMode,
      isSpinPaused: pauseSpin,
      isQuizPaused: pauseQuiz,
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div>
        <h1 className="text-white text-xl font-bold text-center">Config</h1>
      </div>
      <div className="bg-indigo-200/20 text-gray-200 backdrop-blur-md shadow-sm rounded-xl w-full grid grid-cols-2 gap-2 p-3">
        <div className="rounded-md overflow-hidden text-sm">
          Maintenance:{" "}
          <input
            type="checkbox"
            checked={maintenanceMode}
            onChange={(e) => setMaintenanceMode(e.target.checked)}
          />
        </div>
        <div className="rounded-md overflow-hidden text-sm">
          Pause spin:{" "}
          <input
            type="checkbox"
            checked={pauseSpin}
            onChange={(e) => setPauseSpin(e.target.checked)}
          />
        </div>
        <div className="rounded-md overflow-hidden text-sm">
          Pause quiz:{" "}
          <input
            type="checkbox"
            checked={pauseQuiz}
            onChange={(e) => setPauseQuiz(e.target.checked)}
          />
        </div>
      </div>

      <button
        onClick={handleUpdateConfig}
        disabled={isConfigLoading || isUpdatingConfig}
        className="bg-indigo-500 text-white rounded-md px-4 py-2"
      >
        {isUpdatingConfig ? "Updating..." : "Update config"}
      </button>
    </div>
  );
};

export default AppConfig;
