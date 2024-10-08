import ProfilePic from '../assets/Profile.png';

export const About = () => {
  return (
    <body className='bg-gray-800'>
      <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center px-4">
      <div className="bg-gray-800 text-white rounded-lg p-8 max-w-4xl mx-auto ">
        <h1 className="text-4xl font-bold text-center text-blue-500 mb-8">About Me</h1>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={ProfilePic}
            alt="Profile"
            className="w-40 h-[100] object-cover border-4 border-gray-500"
          />
        </div>

        {/* Bio */}
        <p className="text-lg text-gray-300 mb-4">
          Hi! I'm Santiago, a passionate software developer with a focus on full-stack development.
          I have experience working with technologies like React, Node.js, MongoDB, and Express. 
          I love solving challenging problems and learning new technologies.
        </p>

        <p className="text-lg text-gray-300 mb-4">
          This blog is where I document my journey, share tutorials, coding tips, and projects 
          I've worked on. My goal is to help others in their coding journeys and to keep improving 
          as a developer every day.
        </p>

        <p className="text-lg text-gray-300 mb-6">
          Feel free to reach out to me if you want to collaborate or discuss anything tech-related. 
          Thanks for stopping by!
        </p>

        {/* Contact Section */}
        <div className="flex justify-center">
          <a
            href="mailto:santiago@example.com"
            className="text-blue-400 hover:underline text-lg"
          >
            Reach out to me
          </a>
        </div>
      </div>
    </div>
    </body>
    
  );
};
