import React, { useCallback, useState } from "react";

import { Table, EmptyCard, PageLoader } from "../../../components";
import {
  CollaboratorsColumnDef,
  defaultCollaboratorsColumnsData,
} from "../../../components/table/tableColumnDef";

const DashboardCollaborators = ({ members, isLoading }) => {
  const [sortBy, setSortBy] = useState("");
  const [selectedNow, setSelectedNow] = useState(false);
  const getMembers = () => members;

  const updateSelectedRow = useCallback(
    (updatedState) => setSelectedNow(updatedState),
    []
  );

  return (
    <div className="card h-full">
      <div className="h-full overflow-hidden">
        <div>
          {!isLoading ? (
            <>
              <Table
                sortBy={sortBy}
                selectedNow={selectedNow}
                setSelectedNow={updateSelectedRow}
                data={getMembers}
                columns={CollaboratorsColumnDef}
                fieldsToHideOnMobile={["role", "id"]}
                maxHeight="42%"
              >
                <div className="header">
                  <div className="title">
                    <div className="icon">* User icon *</div>
                    <span>Collaborators and team members</span>
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
                    <option value="id">id</option>
                    <option value="role">role</option>
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
        </div>
      </div>
    </div>
  );
};

export default DashboardCollaborators;
