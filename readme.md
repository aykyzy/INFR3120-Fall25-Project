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