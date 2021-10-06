import { useState, useEffect } from "react";
function UserStatistics() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loadedStatistics, setLoadedStatistics] = useState([]);

  async function getUserStatistics() {
    try {
      if (errorMessage !== false) setErrorMessage(false);
      const response = await fetch("http://127.0.0.1:8501/api/files/getSpace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: localStorage.getItem("authToken"),
        }),
      });
      const statistics = await response.json();
      setLoadedStatistics(
        `Used space: ${statistics.message.usedSpace}/${statistics.message.maxSpace} B`
      );
      if (
        parseInt(statistics.message.usedSpace) /
          parseInt(statistics.message.maxSpace) >
        0.9
      ) {
        alert("Almost out of space");
      }
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
