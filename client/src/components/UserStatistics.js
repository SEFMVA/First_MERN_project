import { useState, useEffect } from "react";
function UserStatistics() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loadedStatistics, setLoadedStatistics] = useState([]);

  async function getUserStatistics() {
    try {
      if (errorMessage !== false) setErrorMessage(false);
      const response = await fetch("http://127.0.0.1:8501/api/files/getSpace");
      const statistics = await response.json();
      setLoadedStatistics(
        `Used space: ${statistics.usedSpace}/${statistics.maxSpace} MB`
      );
      setIsLoading(false);
    } catch (error) {
      if (isLoading) setIsLoading(false);
      setErrorMessage(JSON.stringify(error));
    }
  }

  useEffect(() => {
    getUserStatistics();
  }, []);

  return (
    <div className="statistics">
      {isLoading
        ? "Loading statistics..."
        : errorMessage
        ? errorMessage
        : loadedStatistics}
    </div>
  );
}

export default UserStatistics;
