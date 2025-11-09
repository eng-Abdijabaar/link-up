import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from './config/inggest.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware()); // req.auth will be available in the request object


app.use("/api/inngest", serve({ client: inngest, functions}));

app.get('/', (req, res) => {
  res.send('LinkUp Backend is running');
});

const startServer = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log("Server started on port:", ENV.PORT);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

startServer();

export default app;

