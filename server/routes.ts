import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import { questionResponseSchema, answerResponseSchema } from "@shared/schema";

const FLASK_BACKEND_URL = process.env.FLASK_BACKEND_URL || "http://localhost:5001";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.get("/api/regions", async (req, res) => {
    try {
      const response = await axios.get(`${FLASK_BACKEND_URL}/regions`);
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching regions:", error);
      res.status(500).json({ 
        error: "Failed to fetch regions from backend"
      });
    }
  });

  app.post("/api/question", async (req, res) => {
    try {
      const { region, difficulty } = req.body;

      if (!region || !difficulty) {
        return res.status(400).json({ 
          error: "Region and difficulty are required" 
        });
      }

      const response = await axios.post(`${FLASK_BACKEND_URL}/question`, {
        region,
        difficulty
      });

      const validatedData = questionResponseSchema.parse(response.data);
      res.json(validatedData);
    } catch (error: any) {
      console.error("Error fetching question:", error);
      
      if (error.response) {
        return res.status(error.response.status).json(error.response.data);
      }
      
      res.status(500).json({ 
        error: "Failed to fetch question from backend"
      });
    }
  });

  app.post("/api/answer", async (req, res) => {
    try {
      const { pokemon_id, answer, difficulty } = req.body;

      if (pokemon_id === undefined || !answer || !difficulty) {
        return res.status(400).json({ 
          error: "pokemon_id, answer, and difficulty are required" 
        });
      }

      const response = await axios.post(`${FLASK_BACKEND_URL}/answer`, {
        pokemon_id,
        answer,
        difficulty
      });

      const validatedData = answerResponseSchema.parse(response.data);
      res.json(validatedData);
    } catch (error: any) {
      console.error("Error checking answer:", error);
      
      if (error.response) {
        return res.status(error.response.status).json(error.response.data);
      }
      
      res.status(500).json({ 
        error: "Failed to check answer with backend"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
