import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Button } from "react-bootstrap";

export const MyProfile = () => {
  const [cookies, setCookie] = useCookies([
    "userID",
    "firstName",
    "lastName",
    "rank",
    "supervisorID",
    "isSupervisor",
    "isManager",
    "enabled",
  ]);
  const [rank, setRank] = useState("");
  const [teamName, setTeamName] = useState([]);
  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/ranks/`)
      .then((res) => res.json())
      .then((data) => {
        setRank(data.filter((ranks) => ranks.rank_id === cookies.rank));
        setRanks(data);
      });
    fetch(`http://localhost:8080/calendar_team/${cookies.userID}`)
      .then((res) => res.json())
      .then((data) => {
        setTeamName(data);
      });
  }, [cookies.rank, cookies.userID]);

  const textStyle = {
    color: "white",
  };

  const handleEdit = () => {
    if (
      document.getElementById("editButton").innerHTML === "Edit Personal Info"
    ) {
      document.querySelectorAll("dd.personalInfo").forEach((element) => {
        element.contentEditable = true;
        element.style.background = "gray";
        element.style.color = "black";
      });
      document.querySelector("select.rankInfo").disabled = false;
      document.querySelector("select.rankInfo").style.background = "gray";
      document.querySelector("select.rankInfo").style.color = "black";
      document.getElementById("editButton").innerHTML = "Save Personal Info";
      console.log(document.querySelectorAll("dd.personalInfo"));
    } else {
      fetch(`http://localhost:8080/userprofile/edit/${cookies.userID}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: document.querySelector("#fname").innerHTML,
          last_name: document.querySelector("#lname").innerHTML,
          rank: document.getElementById("rank").value,
        }),
      }).then((res) => {
        if (res.status === 201) {
          setCookie("rank", document.getElementById("rank").value);
          document.querySelectorAll("dd.personalInfo").forEach((element) => {
            element.contentEditable = true;
            element.style.background = "";
            element.style.color = "white";
          });
          document.querySelector("select.rankInfo").disabled = true;
          document.querySelector("select.rankInfo").style.background = "none";
          document.querySelector("select.rankInfo").style.color = "white";
          document.getElementById("editButton").innerHTML =
            "Edit Personal Info";
        }
      });
    }
  };

  return (
    <>
      {teamName[0] && rank[0] && ranks[0] ? (
        <>
          <h1
            style={textStyle}
          >{`${rank[0].name} ${cookies.firstName} ${cookies.lastName}'s Profile`}</h1>
          <div className="user_profile-box" style={textStyle}>
            <h2>User Profile:</h2>
            <dl>
              <dt>First Name:</dt>
              <dd className="personalInfo" id="fname">
                {cookies.firstName}
              </dd>
              <dt>Last Name:</dt>
              <dd className="personalInfo" id="lname">
                {cookies.lastName}
              </dd>
              <dt>Rank:</dt>
              <dd>
                <select
                  id="rank"
                  className="rankInfo"
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    background: "none",
                    border: "none",
                    color: "white",
                  }}
                  disabled
                >
                  {ranks.map((ranks) =>
                    ranks.name === rank[0].name ? (
                      <option value={ranks.rank_id} selected>
                        {ranks.name}
                      </option>
                    ) : (
                      <option value={ranks.rank_id}>{ranks.name}</option>
                    )
                  )}
                </select>
              </dd>
              <dt>Team:</dt>
              <dd>{teamName[0].name}</dd>
              <dt>Account Status:</dt>
              <dd>{cookies.enabled === false ? "Disabled" : "Active"}</dd>
            </dl>
            <Button id="editButton" onClick={() => handleEdit()}>
              Edit Personal Info
            </Button>
          </div>
        </>
      ) : (
        []
      )}
    </>
  );
};
