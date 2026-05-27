## 📚 Study-Platform – Full Stack Study Resource Platform

A full-stack web application where users can upload, manage, and share study resources like PDFs, notes, and documents. Built with a React frontend and Node.js/Express backend, with authentication, file uploads, and admin controls.

---

🚀 Live Demo

🌐 Frontend: https://shamithastudyshare.netlify.app

⚙️ Backend: https://study-platform-backend-dmb1.onrender.com

[The backend will be a little slow to load. The Render needs to start up again. Kindly be patient.]

---

🛠️ Tech Stack

Frontend
- React (Vite)
- Axios
- React Router
- Tailwind CSS
  
Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer + Cloudinary (file uploads)
- CORS
  
Deployment
- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas
- Media Storage: Cloudinary

---

⚙️ Features

👤 Authentication
- User signup/login
- JWT-based authentication
- Role-based access (User / Admin)

📤 Resource Management
- Upload PDFs, images, DOC/DOCX files
- Store files in Cloudinary
- View, download, and preview resources
- Track download history

🧑‍💼 Admin Features
- Delete resources
- Manage users/resources
- Protected admin routes

📥 Download System
- Track downloads per user
- Download history page
- Inline PDF preview support

---

🌐 Deployment Notes

Backend (Render)
- Root directory: server
- Build command: npm install
- Start command: npm start

Frontend (Netlify)
- Base directory: client
- Build command: npm run build
- Publish directory: dist

---

## Demo Credentials

To test the application features, you can use the following accounts:

### Admin Account
- Email: admin@gmail.com  
- Password: admin123  
- Permissions: Full access (manage users, delete resources, admin dashboard)

### Sample User Accounts
- Email: user1@gmail.com  
- Password: user123  

- Email: user2@gmail.com  
- Password: user123

---

🔥 Key Learnings
- JWT authentication flow
- File upload with Cloudinary
- Role-based access control
- Full-stack deployment (Render + Netlify)
- API integration with Axios interceptors

---

📌 Future Improvements
- Search + filters improvements
- Like/save resources system
- Pagination
- Real-time notifications
- Better admin dashboard analytics

---

👨‍💻 Author

Built by Shamitha
