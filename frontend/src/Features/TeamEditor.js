import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../CSS/TeamEditor.css'

export const TeamEditor = () => {
    const [teamMember, setTeamMember] = useState({
        team_id: '',
    })

    const [teams, setTeams] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedTeamMember, setSelectedTeamMember] = useState('');
    const [teamOptions, setTeamOptions] = useState('');
    const [addButtonClicked, setAddButtonClicked] = useState(false);
    const [addTeamButtonClicked, setAddTeamButtonClicked] = useState(false);
    const [addUser, setAddUser] = useState(0);
    const [teamName, setTeamName] = useState('');
    const [teamDescription, setTeamDescription] = useState('');

    const addTeamMemberButton = () => {
        setAddButtonClicked(!addButtonClicked)
    }

    const addTeamButton = () => {
        setAddTeamButtonClicked(!addTeamButtonClicked)
    }

    const handleTeamMemberChange = async (e) => {
        let selectedTeamMember = e.target.value;
        setSelectedTeamMember(selectedTeamMember)
    }

    const handleAddUserChange = async (e) => {
        let selectedUser = e.target.value;
        setAddUser(selectedUser);
    }

    const handleTeamNameChange = async (e) => {
        let teamName = e.target.value;
        setTeamName(teamName);
    }

    const handleTeamDescriptionChange = async (e) => {
        let teamDesc = e.target.value;
        setTeamDescription(teamDesc);
    }

    useEffect(() => {
        async function fetchTeams() {
            try {
                const res = await fetch('http://localhost:8080/teams/all_teams', {
                    method: "GET",
                    headers: { 'Content-Type': 'application/json' },
                });
                const teamsData = await res.json();

                //console.log("List Teams:", teamsData);

                setTeams(teamsData);
                //LOAD TEAMS INTO OPTIONS
                const teamOptions = teamsData.map((team, index) => (
                    <option key={index} value={team.team_id}>{team.name}, {team.description}</option>
                ));
                setTeamOptions(teamOptions);

            } catch (error) {
                console.error("error fetching teams:", error)
            }
        }
        fetchTeams();
    }, []);


    const handleTeamChange = async (e) => {
        const selectedTeamId = e.target.value;
        setSelectedTeam(selectedTeamId);

        //console.log("ATTEMPT TO FETCH USERNAMES OF TEAM: ", selectedTeamId);
        var userNames = [];

        const res = await fetch('http://localhost:8080/teams/members', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                team_id: selectedTeamId
            })
            //const userIds = await res.json();
        });
        const userIds = await res.json();
        //console.log("FOUND USERS: ", await userIds);

        for (var i = 0; i < userIds.length; i++) {
            //console.log("LOOPING");

            var firstLast = await fetch('http://localhost:8080/users/first_last', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userIds[i].user_id
                })
            });
            var teamMembers = await firstLast.json();
            //console.log("NAME IS: ", await teamMembers[0].first_name);
            userNames.push(`${await teamMembers[0].first_name} ${await teamMembers[0].last_name} ${userIds[i].user_id}`)

        }
        console.log("ALL USERNAMES: ", userNames);
        setTeamMembers(userNames);
    };

    const deleteTeamMember = async () => {
        if (selectedTeamMember == '' || selectedTeam == '') {
            return;
        }
        try {
            //REMOVE STRING DATA FROM selectedTeamMember, THEN CAST AS INT
            var userInt = 0;
            // userInt = 
            userInt = selectedTeamMember.replace(/\D/g, '');
            userInt = parseInt(userInt);
            // console.log("SELECTED TEAM MEMBER: ", selectedTeamMember);
            // console.log("userint:", userInt);
            // console.log(typeof(userInt));

            const res = await fetch('http://localhost:8080/teams/remove_member', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userInt
                })
            })
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message)
            }
            console.log("success")

        } catch (error) {
            console.error("error removing user:", error)
        } finally {
            window.location.reload();
        }
    }

    const addTeamMember = async () => {
        if (addUser == 0) { return };

        console.log("ATTEMPTING TO ADD USER: ", addUser, " TO TEAM: ", selectedTeam);
        try {
            const res = await fetch('http://localhost:8080/teams/add_member', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    team_id: selectedTeam,
                    user_id: addUser
                })
            })
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message)
            }
            console.log("success")

        } catch (error) {
            console.error("error adding user:", error)
        } finally {
            window.location.reload();
        }
    }

    const deleteTeam = async () => {
        if (selectedTeam == '') {
            return;
        }
        try {
            console.log("ATTEMPTING PURGE OF TEAM: ", selectedTeam);

            const res = await fetch('http://localhost:8080/teams/purge', {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    team_id: selectedTeam
                })
            })
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message)
            }
            console.log("success")

        } catch (error) {
            console.error("error removing team:", error)
        } finally {
            window.location.reload();
        }
    }

    const addTeam = async () => {
        if (teamName == '' || teamDescription == '') {
            return;
        }

        console.log("ATTEMPTING TO ADD TEAM: ", teamName, " WITH DESC: ", teamDescription);
        try {
            const res = await fetch('http://localhost:8080/teams/add', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: teamName,
                    description: teamDescription
                })
            })
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message)
            }
            console.log("success adding the team")

        } catch (error) {
            console.error("error adding team:", error)
        } finally {
            window.location.reload();
        }
    }


    return (

        <Row>

            {/* USER MANAGEMENT */}
            <Col xs={{ span: 3, offset: 2 }}>
                <h3 style={{ marginTop: '15px', color: 'lightgrey' }}>User Management </h3>
                <Form>
                    <h6 style={{ marginTop: '15px', color: 'lightgrey' }}>Teams</h6>
                    <Form.Select
                        required
                        value={selectedTeam}
                        onChange={handleTeamChange}
                        name="team_id">
                        <option value="">Select a Team</option>
                        {teams.map((team, index) => (
                            <option key={index} value={team.team_id}>{team.name}</option>
                        ))}
                    </Form.Select>

                    <h6 style={{ marginTop: '15px', color: 'lightgrey' }}>Team Members </h6>
                    <Form.Select
                        value={selectedTeamMember}
                        onChange={handleTeamMemberChange}>
                        <option value="">Select a Team Member</option>
                        {teamMembers.map((member, index) => (
                            <option key={index}>{member}</option>
                        ))}

                    </Form.Select>
                    <Row className="addDeleteButtons">
                        <Col xs={{ span: 6, offset: 0 }}>
                            <Button type="submit1" variant="dark" className="delete_team_member" onClick={deleteTeamMember}>Delete Team Member</Button>
                        </Col>
                        <Col xs={{ span: 6, offset: 0 }}>
                            <Button variant="dark" className="add_team_member" onClick={addTeamMemberButton}>Add Team Member</Button>
                        </Col>
                    </Row>
                </Form>


                <div>
                    <b>
                        {addButtonClicked ?
                            <div className="addUserDiv">
                                <Form>
                                    <input type="number" id="addUserId" className="addUserId" onChange={handleAddUserChange} min="1" max="999999999" placeholder="User Id" />
                                    <Button variant="dark" className="submitAddTeamMember" onClick={addTeamMember}>Submit</Button>
                                </Form>
                            </div>
                            :
                            <></>} {/*THIS LINE IS LEFT BLANK TO HIDE THE ADD TEAM MEMBER DIV WHEN FALSE*/}
                    </b>
                </div>
                {/* END OF USER MANAGEMENT */}
            </Col>

            {/* TEAM MANAGEMENT */}
            <Col xs={{ span: 3, offset: 1 }}>
                <h3 style={{ marginTop: '15px', color: 'lightgrey' }}>Team Management </h3>

                <Form>
                    <h6 style={{ marginTop: '15px', color: 'lightgrey' }}>Teams</h6>
                    <Form.Select
                        required
                        value={selectedTeam}
                        onChange={handleTeamChange}
                        name="team_id">
                        <option value="">Select a Team</option>
                        {teams.map((team, index) => (
                            <option key={index} value={team.team_id}>{team.name}</option>
                        ))}
                    </Form.Select>
                </Form>

                <Row className="addDeleteButtons">
                    <Col xs={{ span: 6, offset: 0 }}>
                        <Button type="submit1" variant="dark" className="delete_team_member" onClick={deleteTeam}>Delete Team</Button>
                    </Col>
                    <Col xs={{ span: 6, offset: 0 }}>
                        <Button variant="dark" className="add_team_member" onClick={addTeamButton}>Add Team</Button>
                    </Col>
                </Row>

                <div>
                    <b>
                        {addTeamButtonClicked ?
                            <div className="addUserDiv">
                                <Form>
                                    <input type="text" id="addTeamName" className="addTeamName" onChange={handleTeamNameChange} placeholder="Team Name" />
                                    <input type="text" id="addTeamDescription" className="addTeamDescription" onChange={handleTeamDescriptionChange} placeholder="Team Description" />
                                    <Button variant="dark" className="submitAddTeamMember" onClick={addTeam}>Submit</Button>
                                </Form>

                            </div>
                            :
                            <></>} {/*THIS LINE IS LEFT BLANK TO HIDE THE ADD TEAM DIV WHEN FALSE*/}
                    </b>
                </div>
            </Col>
        </Row>
    )
}