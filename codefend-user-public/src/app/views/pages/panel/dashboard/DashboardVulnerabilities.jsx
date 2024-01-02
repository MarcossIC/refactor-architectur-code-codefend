import React, { useCallback, useState } from "react";
import { vulnerabilitiesColumnDef } from "../../../components/table";
import { Table, EmptyCard, PageLoader } from "../../../components";
import { vulnerabilitiesColumnDef } from "../../../components/table/tableColumnDef";

const DashboardVulnerabilities = ({ topVulnerabilities, isLoading }) => {
  const [sortBy, setSortBy] = useState("");
  const [selectedNow, setSelectedNow] = useState(false);

  const getTopVulnerabilities = useCallback(
    (updatedState) => setSelectedNow(updatedState),
    []
  );
  const updateSelectedRow = useCallback(() => topVulnerabilities, []);

  return (
    <div className="card vulnerabilities">
      <div>
        {!isLoading ? (
          <>
            <Table
              sortBy={sortBy}
              selectedNow={selectedNow}
              setSelectedNow={updateSelectedRow}
              data={getTopVulnerabilities}
              columns={vulnerabilitiesColumnDef}
              fieldsToHideOnMobile={["name", "score", "creacion"]}
            >
              <div className="header">
                <div className="title">
                  <div className="icon">* Bug icon *</div>
                  <span>Top priority vulnerabilities</span>
                </div>
                <select
                  onChange={(e) => {
                    console.log({ e });
                    setSortBy(e.target.value);
                    setSelectedNow(true);
                  }}
                  className="hidden md:inline bg-transparent ml-10"
                >
                  <option value="" selected disabled>
                    Sort by
                  </option>
                  <option value="creacion">published</option>
                  <option value="score">score</option>
                  <option value="risk">risk</option>
                  <option value="status">status</option>
                </select>
                <div className="actions"></div>
              </div>
            </Table>
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
