const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const zipcodes = require("zipcodes"); // Import zipcodes library

const app = express();
app.use(cors());
app.use(express.json());

// Load ZIP Code data from JSON file
let zipData;
const jsonFilePath = path.join(__dirname, "zipcodes.json");

try {
    zipData = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));
} catch (error) {
    console.error("Error reading zipcodes.json:", error);
    zipData = { zipcodes: [] };
}

// Health Check Route
app.get("/", (req, res) => {
    res.json({ message: " Server is up and running!" });
});

// API Endpoint: GET City & State by ZIP Code
app.get("/zipcodes/:zip", (req, res) => {
    const zip = req.params.zip;

    // 🔹 1. Check in zipcodes.json
    const localResult = zipData.zipcodes.find(entry => entry.zip === zip);
    if (localResult) {
        return res.json(localResult);
    }

    // 🔹 2. If not found, use the zipcodes library
    const zipInfo = zipcodes.lookup(zip);
    if (zipInfo) {
        return res.json({ zip, city: zipInfo.city, state: zipInfo.state });
    }

    // 🔹 3. If not found anywhere, return an error
    return res.status(404).json({ error: "Invalid ZIP Code!" });
});

// Start Server (Use Elastic Beanstalk Assigned PORT)
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
