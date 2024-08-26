import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/download-repo', (req, res) => {
  const { repoUrl } = req.body;
  
  exec(`python github2file.py "${repoUrl}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      console.error(`stderr: ${stderr}`);
      return res.status(500).json({ error: 'Error processing repository', details: stderr });
    }
    
    if (stderr) {
      console.warn(`Warning: ${stderr}`);
    }
    
    const fileName = stdout.trim();
    const filePath = path.join(__dirname, fileName);
    
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(`Error sending file: ${err}`);
        res.status(500).json({ error: 'Error sending file', details: err.message });
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});