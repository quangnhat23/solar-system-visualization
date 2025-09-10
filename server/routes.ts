import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { publishToGitHub, createFeaturePullRequest } from "./publish-to-github.js";
import { uploadAllProjectFiles } from "./upload-files.js";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // GitHub publishing endpoint
  app.post('/api/publish-to-github', async (req, res) => {
    try {
      const result = await publishToGitHub();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  });

  // Create pull request endpoint
  app.post('/api/create-pull-request', async (req, res) => {
    try {
      const result = await createFeaturePullRequest();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  });

  // Upload all project files to repository
  app.post('/api/upload-files', async (req, res) => {
    try {
      const result = await uploadAllProjectFiles();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
