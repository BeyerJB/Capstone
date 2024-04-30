import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";


export const MyProfile = () => {
  const [cookies] = useCookies([
    "userID",
    "firstName",
    "lastName",
    "rank",
    "supervisorID",
    "isSupervisor",
    "isManager",
    "enabled"
  ]);
  const [rank, setRank] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/ranks/`)
      .then((res) => res.json())
      .then((data) => {
        setRank(data.filter(ranks => ranks.rank_id === cookies.rank));
      });
  }, []);

  return (
    <>
      <h1>{`${rank[0].name} ${cookies.firstName} ${cookies.lastName}'s Profile`}</h1>
      <div className="user_profile-box">
        User Profile:
        <dl>
          <dt>First Name:</dt>
          <dd>
            <input type="text" id="fname" name="fname" value={cookies.firstName} disabled />
          </dd>
          <dt>Last Name:</dt>
          <dd>
            <input type="text" id="lname" name="lname" value={cookies.lastName} disabled />
          </dd>
          <dt>Rank:</dt>
          <dd>
            <input type="text" id="rank" name="rank" value={rank} disabled />
          </dd>
          <dt>Username:</dt>
          <dd>
            <input type="text" id="uname" name="uname" value="johndoe" disabled />
          </dd>
          <dt>Team:</dt>
          <dd>
            <select id="tname" name="tname" disabled>
              <option value="John" selected="selected">
                John
              </option>
            </select>
          </dd>
          <dt>Account Status:</dt>
          <dd>{cookies.enabled === false ? "Disabled" : "Active"}</dd>
        </dl>
      </div>
    </>
  );
};
