INFR3120 – Web and Scripting Programming  
Project Part 3 – Final Release  

Team Members
- Sahil Khan – 100985830  
- Mohammad Asadullah – 100959309
- Adam Khan -   100817853

Project Overview
This is Part 3 of our Web Application project.  
This release is the final version of our project, including:

  - Error free, full functionality
  - Easy navigation
  - Back end, front end and database deployment (Netilfy, render, mongo)
  - Video demonstration

Live Deployment:

Repo: https://github.com/aykyzy/INFR3120-Fall25-Project

Front End (Netilfy): https://rococo-florentine-503cb7.netlify.app/

Back End (Render): https://backend-survey-fhk4.onrender.com

Contributions:

Adam Khan:
  - Front end + Back end cloud deployment
  - Small tweaks in server.js
  - Testing and debugging for deployment
  - change-password.html

Sahil Khan:

- Updated the render to latest github commit
- Put it up on cloud
- Proof read to ensure no spelling mistakes

Muhammad Asadullah:

- Polished the website’s overall UI and layout
- Ensured all navigation bar links routed to the correct pages
- Verified internal and external links for consistent functionality

Technologies Used
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  
- Express-Session  
- Connect-Mongo  
- HTML/CSS/JavaScript  

/////////////////////////////////////////

INFR3120 – Web and Scripting Programming  
Project Part 2 – Authentication Release  

Team Members
- Sahil Khan – 100985830  
- Mohammad Asadullah – 100959309
- Adam Khan -   100817853


Project Overview
This is Part 2 of our Web Application project.  
This release adds user authentication, including:

- User Registration  
- User Login  
- User Logout  
- Session-based authentication  
- Protected Update/Delete routes  
- Dynamic navigation bar based on login state  


Live Deployment
Our website is deployed on Render:  
https://infr3120-fall25-project-uqkj.onrender.com



Repository
GitHub Repository:  
https://github.com/aykyzy/INFR3120-Fall25-Project

---

Authentication Features Added (Part 2)

Sahil Khan's Contributions
Files I worked on:
- `models/Users.js` → Created user schema & comments  
- `middleware/auth.js` → Added `requireLogin` middleware  
- `server.js` → Added `express-session`, `MongoStore`, and session setup  
- `routes/api.js` → Protected Update/Delete routes with `requireLogin` 

Mohammad Asadullah’s Contributions  
Files he worked on:
- `public/login.html`  
  - Created login form UI  
  - Styled and structured input fields + buttons  
  - Linked the form to backend POST `/login`  
- `public/register.html`  
  - Designed registration form UI  
  - Added inputs for username + password  
  - Linked the form to backend POST `/register`  
- `public/index.html` / Navbar updates  
  - Made navigation dynamic (Login vs Logout)  
  - Ensured correct links appear based on login state  
- Frontend testing & debugging  
  - Tested login and registration flows  
  - Verified sessions work across pages  
  - Fixed broken links and validated form submission  

Technologies Used
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  
- Express-Session  
- Connect-Mongo  
- HTML/CSS/JavaScript  


External Code Used (Under 10% Rule)
- bcrypt hashing logic based on lecture material  
- express-session configuration from Express official docs  
- MongoStore creation snippet from connect-mongo documentation 
- Help from ChatGPT with error correction