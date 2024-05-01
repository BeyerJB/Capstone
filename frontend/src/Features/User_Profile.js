import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Button } from "react-bootstrap";


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
  const [teams, setTeams ] = useState([])
  const [teamName, setTeamName] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8080/api/ranks/`)
      .then((res) => res.json())
      .then((data) => {
        setRank(data.filter(ranks => ranks.rank_id === cookies.rank));
      });
      fetch(`http://localhost:8080/api/teams`)
        .then(res => res.json())
        .then(data => {
          setTeams(data)
        });
      fetch(`http://localhost:8080/calendar_team/${cookies.userID}`)
        .then((res) => res.json())
        .then(data => {
          setTeamName(data)
        });
  }, []);

  const handleEdit = () => {
    if(document.getElementById("editButton").innerHTML === "Edit Personal Info") {
    document.querySelectorAll('input[type=text]').forEach(element => element.disabled = false)
    document.getElementById("editButton").innerHTML = "Save Personal Info"

  }
    else{
      document.querySelectorAll('input[type=text]').forEach(element => element.disabled = true)
      document.getElementById("editButton").innerHTML = "Edit Personal Info"
    }
  }

  return (
    <>
    { teamName[0] ?
    <>
      <h1>{`${rank[0].name} ${cookies.firstName} ${cookies.lastName}'s Profile`}</h1>
      <div className="user_profile-box">
        <h2>User Profile:</h2>
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
            <input type="text" id="rank" name="rank" value={rank[0].name} disabled />
          </dd>
          <dt>Username:</dt>
          <dd>
            <input type="text" id="uname" name="uname" value="johndoe" disabled />
          </dd>
          <dt>Team:</dt>
          <dd>
            {teamName[0].name}

          </dd>
          <dt>Account Status:</dt>
          <dd>{cookies.enabled === false ? "Disabled" : "Active"}</dd>
        </dl>
        <Button id="editButton" onClick={() => handleEdit()}>Edit Personal Info</Button>
      </div>
    </>
    : []
  }
  </>
  );
};
