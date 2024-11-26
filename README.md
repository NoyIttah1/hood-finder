# hood-finder

# Angular & Node.js Project

This repository contains both the frontend (Angular) and backend (Node.js) components of the project.

## Project Structure

- `frontend/`: Contains the Angular application.
- `backend/`: Contains the Node.js server.

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (v7 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (running on `localhost:27017` or update the connection string)

---

### Frontend Setup

1. Navigate to the `frontend/` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Angular development server:
   ```bash
   ng serve
   ```

   The application will be available at `http://localhost:4200`.

---

### Backend Setup

1. Navigate to the `backend/` folder:
   ```bash
   cd backend
   ```

2. Populate the database (optional):
   ```bash
   npx ts-node scripts/populate-db.ts
   ```

   > Ensure your MongoDB server is running before this step.

3. Start the backend server:
   ```bash
   npm start
   ```

   The backend will be available at `http://localhost:3000` (or your specified port).

---

### MongoDB Configuration

The project uses the following MongoDB connection string by default:

```javascript
const MONGO_URL = 'mongodb://localhost:27017/noy';
```

If your MongoDB is running on a different host or port, update the connection string in the backend configuration file.

---

## Contributing

Feel free to open issues or submit pull requests to improve the project. Contributions are always welcome!

---

## License

This project is licensed under the [MIT License](LICENSE).
