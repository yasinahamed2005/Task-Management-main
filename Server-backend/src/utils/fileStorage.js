const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data/tasks.json');

// Ensure the data directory exists and create the file if it doesn't
async function ensureDataFile() {
  try {
    await fs.access(dataPath);
  } catch {
    await fs.mkdir(path.dirname(dataPath), { recursive: true });
    await fs.writeFile(dataPath, '[]'); // Initialize with an empty array if the file doesn't exist
  }
}

const fileStorage = {
  // Read data from the tasks JSON file
  async readData() {
    await ensureDataFile(); // Ensure the file exists
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data); // Parse the JSON data and return as an object
  },

  // Write data to the tasks JSON file
  async writeData(data) {
    await ensureDataFile(); // Ensure the file exists
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2)); // Format the JSON with 2 spaces for readability
  }
};

module.exports = fileStorage;
