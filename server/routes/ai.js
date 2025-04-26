const express = require("express");
const dotenv = require("dotenv");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

dotenv.config();

const router = express.Router();

// GET route for testing
router.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello from AI!" });
});

// POST route for image generation
router.post("/", async (req, res) => {
  try {

    // Validate request body
    if (!req.body || !req.body.prompt) {
      console.log("Invalid or missing request body:", req.body);
      return res.status(400).json({ error: "Prompt is required in the request body" });
    }

    const { prompt } = req.body;

    // Set up timeout for Hugging Face API call
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log("Hugging Face API request timed out");
      controller.abort();
    }, 30000); // 30s timeout

    // Call Hugging Face API (Stable Diffusion XL)
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            num_inference_steps: 50,
            guidance_scale: 7.5,
          },
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    // Check for API errors
    if (!response.ok) {
      const error = await response.text();
      console.error("Hugging Face API Error:", error);
      return res.status(500).json({ error: `Hugging Face API Error: ${error}` });
    }

    // Process image response
    const arrayBuffer = await response.arrayBuffer();
    if (arrayBuffer.byteLength === 0) {
      console.error("Empty response from Hugging Face API");
      return res.status(500).json({ error: "Empty response from Hugging Face API" });
    }

    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    res.status(200).json({ photo: base64Image });
  } catch (err) {
    console.error("Server Error:", err.message, err.stack);
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
});

module.exports = router;