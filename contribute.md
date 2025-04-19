# 🚀 User Project

A full-stack web application using Node.js, MongoDB, and Vite. Supports manual setup and Docker-based deployment.

---

## 📦 Manual Installation

1. **Install Node.js**  
   Download and install from [nodejs.org](https://nodejs.org/)

2. **Clone the repository**
   ```bash
   git clone https://github.com/ankitk2003/paytm_clone
   cd paytm_clone
   cd frontend
   npm install
   cd ..
   cd backend
   npm install
   npm run build
   cd ..

   ```

## Docker installnation

- Install docker
- Build the backend image -docker build -f docker/Dockerfile.backend -t paytm-backend ./frontend
- Start the backend image -❯ docker run -d -p 3000:3000 --name paytm-backend paytm-backend

- Build the frontend image -docker build -f docker/Dockerfile.frontend -t paytm-frontend ./frontend
- Start the frontend image - docker run -d -p 5173:80 --name paytm-frontend paytm-frontend
## you can see the frontend on localhost 5173
   
## THIS IS DEOPLOYED ON A EC2 ON AWS , BUT IT IS A LEARNER'S AWS ACCOUNT SO IT WORKED UNTIL IT IS LOGGED IN .

project url:http://paytm-clone-frontend.collabsphere.store/signup


