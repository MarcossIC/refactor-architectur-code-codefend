import React, { useCallback, useState } from "react";
import { EmptyCard, PageLoader } from "../../../../components";
import { Table } from "src/app/views/components/standalones/Table";

const DashboardVulnerabilities: React.FC<{
  topVulnerabilities: any;
  isLoading: boolean;
}> = ({ topVulnerabilities, isLoading }) => {
  const [sortBy, setSortBy] = useState("");
  const [selectedNow, setSelectedNow] = useState(false);

  const updateSelectedRow = useCallback(
    (updatedState: boolean) => setSelectedNow(updatedState),
    []
  );
  const getTopVulnerabilities = useCallback(() => topVulnerabilities, []);

  return (
    <div className="card">
      <div>
        {!isLoading ? (
          <>
            {/* AQUI VA UNA TABLA */}
            <Table />  
          </>
        ) : (
          <>
            <PageLoader />
          </>
        )}

        {!isLoading && topVulnerabilities.length === 0 && <EmptyCard />}
      </div>
    </div>
  );
};

export default DashboardVulnerabilities;
