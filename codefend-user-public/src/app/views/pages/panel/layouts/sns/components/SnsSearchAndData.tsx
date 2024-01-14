import { PageLoader } from '../../../../../../views/components';
import { ApiHandlers, User, useAuthState } from '../../../../../../data';
import React, { useState, useEffect } from 'react';

interface SubIntel {
  [key: string]: unknown;
}

interface IntelDataItem {
  name: string;
  value: SubIntel[];
}

const SnsSearchAndData: React.FC = () => {
  const [searchData, setSearchData] = useState('');
  const [searchClass, setSearchClass] = useState<string | null>(null);
  const [intelData, setIntelData] = useState<IntelDataItem[]>([]);
  const [loading, setLoading] = useState(false);

  const { getUserdata } = useAuthState();

  const user = getUserdata as unknown as User;

  useEffect(() => {
    if (!user) return;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('search')) {
      setSearchData(urlParams.get('search') || '');
    }
    if (urlParams.get('className')) {
      setSearchClass(urlParams.get('className'));
    }

    if (searchClass && searchData) {
      procSearch(undefined!, user.companyID);
    }
  }, []);

  const procSearch = (e: React.FormEvent, companyID: string): any => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true);
    setIntelData([]);
    ApiHandlers.initializeSnsData(
      {
        keyword: searchData,
        className: searchClass,
      },
      companyID,
    )
      .then((res: any) => {
        const arrayOfObjects = Object.entries(
          res.data.response.results,
        ).map(([key, value]) => {
          const name = key.split('_').slice(1, -2).join('_');
          return { name, value: value as SubIntel[] };
        });
        setIntelData(arrayOfObjects);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="search-bar">
        <div className="search-item">
          <form onSubmit={(e) => procSearch(e, user.companyID)}>
            <input
              type="text"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              placeholder="Search"
              className="text"
              required
            />
            <div className="drop">
              <select
                className="select"
                value={searchClass!}
                onChange={(e) => setSearchClass(e.target.value)}>
                <option value="email" selected>
                  email
                </option>
                <option value="username">username</option>
                <option value="password">password</option>
                <option value="name">full name</option>
              </select>

              <button type="submit" className="btn btn-primary">
                {/* <AiOutlineFileSearch /> */}
              </button>
            </div>
          </form>
        </div>
      </div>
      {!loading ? (
        <div>
          {intelData.map((intel, index) => (
            <div key={index} className="search-result">
              <div className="header">
                <div className="title">
                  {intel?.name}
                </div>
              </div>
              <div className="info">
                {intel?.value.map(
                  (subIntel: SubIntel, subIndex: number) => (
                    <div
                      key={subIndex}
                      className="text"
                      style={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '260px',
                        overflow: 'hidden',
                      }}>
                      {Object.keys(subIntel).map(
                        (subIntelVal, subIntelValIndex) => (
                          <div key={subIntelValIndex}>
                            {`${subIntelVal}: ${subIntel[subIntelVal]}`}
                          </div>
                        ),
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <PageLoader />
      )}
    </>
  );
};

export default SnsSearchAndData;
