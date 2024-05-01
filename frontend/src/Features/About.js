import React from "react";
import '../CSS/About.css'

// import beyer from './Beyer3.jpg'


export const About = () => {


  return(
   <div className = 'aboutContainer'>
    <div className = 'Problem'>
      <h1>Problem Statement</h1>
      <p>In our squadron, we currently face challenges with disparate files and programs used to track schedules, resulting in inefficiencies and miscommunications among members. The absence of a centralized platform leads to confusion, as different versions of schedules exist and updates are not communicated effectively to all members. This lack of cohesion often results in missed events and misunderstandings within the squadron.</p>
    </div>

    <div className = 'Solution'>
      <h1>Solution Overview</h1>
      <p>To address these challenges, we propose the development of a comprehensive application that serves as a one-stop solution for all squadron members to access a consolidated and official schedule. This application will streamline the scheduling process by providing a centralized platform for viewing, managing, and tracking squadron events and activities.</p>
    </div>

    <div className = 'Team'>
      <h1>Our Team</h1>

      <div className = 'AllMembers'>
        <div className = 'Member'>
          <img src={process.env.PUBLIC_URL + '/Beyer3.jpg'} alt='Beyer' />
          <h3>Justin Beyer</h3>
        </div>

        <div className = 'Member'>
          <img src={process.env.PUBLIC_URL + '/clayton.jpeg'} alt='Clayton'/>
          <h3>Clayton Kelley</h3>
        </div>

        <div className = 'Member'>
          <img src={process.env.PUBLIC_URL + '/kendrick.jpeg'} alt='Kendrick'/>
          <h3>Kendrick Morrison</h3>
        </div>

        <div className = 'Member'>
          <img src={process.env.PUBLIC_URL + '/michael.jpeg'} alt='Michael'/>
          <h3>Michael Hamilton</h3>
        </div>

        <div className = 'Member'>
          <img src={process.env.PUBLIC_URL + '/sam.jpeg'} alt='Sam'/>
          <h3>Samantha Botros</h3>
        </div>

        <div className = 'Member'>
          <img src={process.env.PUBLIC_URL + '/trinh3.jpeg'} alt='Trinh'/>
          <h3>Tuan Trinh</h3>
        </div>

        <div className = 'Member'>
          <img src={process.env.PUBLIC_URL + '/noel.jpeg'} alt='G'/>
          <h3>Gertho Noel</h3>
        </div>

        <div className = 'Member'>
          <img src={process.env.PUBLIC_URL + '/paola.jpeg'} alt='Paola'/>
          <h3>Paola Navarro</h3>
        </div>
      </div>
   </div>
  </div>
  )

}