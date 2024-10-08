import '../Styles/About.css';
import ProfilePic from '../assets/Profile.png';
export const About = () =>{
  return(
    <body className='bg-gray-800'>
      <div className="about-container ">
    <h1>About Me</h1>
    <img src={ProfilePic} alt="Profile picture" />
    <p>
      Hi! I'm Santiago, a passionate software developer with a focus on full-stack development. 
      I have experience working with technologies like React, Node.js, MongoDB, and Express. 
      I love solving challenging problems and learning new technologies.
    </p>
    <p>
      This blog is where I document my journey, share tutorials, coding tips, and projects 
      I've worked on. My goal is to help others in their coding journeys and to keep improving 
      as a developer every day.
    </p>
    <p>
      Feel free to reach out to me if you want to collaborate or discuss anything tech-related. 
      Thanks for stopping by!
    </p>
  </div>
    </body>
    
  );
}