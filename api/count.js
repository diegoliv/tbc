export default async function handler(req, res) {
  // Enable CORS for browser requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // Get API key from environment variables
    const apiKey = process.env.API_KEY;

    const headers = {
      "Content-Type": "application/json",
    };

    // Add API key to headers if available
    if (apiKey) {
      headers.Authorization = `Bearer ${apiKey}`;
    }

    const response = await fetch(
      "https://stats.tbc.tools/api/v1/vegas-loop-stats",
      {
        headers: headers,
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    // Return the fetched data
    res.status(200).json({
      success: true,
      data: data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({
      error: "Failed to fetch Vegas Loop stats",
      message: error.message,
    });
  }
}
