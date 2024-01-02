import React, { useState } from "react";

const DashboardVulnerabilities = ({ topVulnerabilities, isLoading }) => {
  const [sortBy, setSortBy] = useState("");
  const [selectedNow, setSelectedNow] = useState(false);

  const getTopVulnerabilities = () => topVulnerabilities;
  console.log({ topVulnerabilities: getTopVulnerabilities() });

  return (
    <div class="card vulnerabilities">
      <div>
        {!isLoading ? (
          <></>
        ) : (
          <>
            <PageLoader />
          </>
        )}
      </div>

      <Show when={!isLoading} fallback={() => <PageLoader />}>
        <Table
          sortBy={sortBy}
          selectedNow={selectedNow}
          setSelectedNow={setSelectedNow}
          data={getTopVulnerabilities}
          columns={vulnerabilitiesColumnDef}
          fieldsToHideOnMobile={["name", "score", "creacion"]}
          // maxHeight="42%"
        >
          <div class="header">
            <div class="title">
              <div class="icon">
                <FaSolidBug />
              </div>
              <span>Top priority vulnerabilities</span>
            </div>
            <select
              onChange={(e) => {
                console.log({ e });
                setSortBy(e.target.value);
                setSelectedNow(true);
              }}
              class="hidden md:inline bg-transparent ml-10"
            >
              <option value="" selected disabled>
                Sort by
              </option>
              <option value="creacion">published</option>
              <option value="score">score</option>
              <option value="risk">risk</option>
              <option value="status">status</option>
            </select>
            <div class="actions"></div>
          </div>
        </Table>
      </Show>
      {/* </div> */}
      <Show when={!props.isLoading && props.topVulnerabilities.length === 0}>
        <EmptyCard />
      </Show>
    </div>
  );
};

export default DashboardVulnerabilities;
