import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [createAccount, setCreateAccount] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    }).then(async (res) => {
      if (res.status === 200) {
        const response = await res.json();
        if (response.enabled === false) {
          alert(
            "Your account has not been created or is disabled please contact your system administrator"
          );
        } else {
          login(response);
          navigate("/mycalendar");
        }
      } else {
        const errorMessage = await res.text();
        alert(`${errorMessage}`);
      }
    });
  };

  return (
    <div className="log-form">
      {createAccount === false ? (
        <>
          <h2>Login to your account</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="username"
              name="username"
              value={loginData.username}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
            />
            <button type="submit" className="btn">
              Login
            </button>
          </form>
          <button className="btn" onClick={() => setCreateAccount(true)}>
            Request Account
          </button>
        </>
      ) : (
        <CreateAccount />
      )}
    </div>
  );
}

const CreateAccount = () => {
  const [teamNames, setTeamNames] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [userType, setUserType] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/teams")
      .then((res) => res.json())
      .then((data) => {
        setTeamNames(data);
      });
    fetch("http://localhost:8080/api/ranks")
      .then((res) => res.json())
      .then((data) => {
        setRanks(data);
      });
    fetch("http://localhost:8080/api/usertypes")
      .then((res) => res.json())
      .then((data) => {
        setUserType(data);
      });
  }, []);


  const [newUserInfo, setnewUserInfo] = useState({user_type: 1, team_id: 1});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setnewUserInfo((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleNewAccount = (event) => {
    if(newUserInfo.first_name === undefined || newUserInfo.last_name === undefined || newUserInfo.password === undefined){
      event.preventDefault();
      alert("Please complete all fields");
    }else{
      event.preventDefault();
    fetch(
      "http://localhost:8080/api/newuser",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserInfo),
      })
      .then(res => {
        if(res.status === 202){
          console.log(newUserInfo)
          alert("Account has been requested")
          window.location.reload()
        } else {
          alert("An error occurred please try again later")
        }
      })
  }
};

  return (
    <div className="log-form">
      <h2>Request your account</h2>
      <form onSubmit={handleNewAccount} id="newaccountform">
        <input
          type="text"
          placeholder="first name"
          name="first_name"
          value={newUserInfo.first_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="last name"
          name="last_name"
          value={newUserInfo.last_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="username"
          name="username"
          value={newUserInfo.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={newUserInfo.password}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <label for="team_id">Choose your team:</label>
      <select
        name="team_id"
        form="newaccountform"
        value={newUserInfo.team_id}
        onChange={handleInputChange}
      >
        {teamNames.map((eachTeam) => {
          return <option value={eachTeam.team_id}>{eachTeam.name}</option>;
        })}
      </select>
      <label for="rank_id">Choose your rank:</label>
      <select
        name="rank"
        form="newaccountform"
        value={newUserInfo.rank_id}
        onChange={handleInputChange}
      >
        {ranks.map((eachrank) => {
          return <option value={eachrank.rank_id}>{eachrank.name}</option>;
        })}
      </select>
      <label for="user_type">Choose User Type:</label>
      <select
        name="user_type"
        form="newaccountform"
        value={newUserInfo.user_type}
        onChange={handleInputChange}
      >
        {userType.map((eachtype) => {
          return <option value={eachtype.user_type_id}>{eachtype.name}</option>;
        })}
      </select>
    </div>
  );
};

export default Login;
