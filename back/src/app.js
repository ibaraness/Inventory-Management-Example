import express from "express";
import {createServer} from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import debugLog from "debug";
import morgan from "morgan";
import multer from "multer";
import cors from "cors";
import routes from "./routes/index.js"

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Namespace of the app for debugging, change it on package js on DEBUG=app
const debug = debugLog('App')

const app = express();
const port  = process.env.PORT || 3000;

app.use(cors());

// Log every request to command line, use the second option to log to file
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './../public')));

const upload = multer();
app.use(upload.array());

// Routes
app.use('/', routes);

// Handle 404 requests
app.use(function(req, res, next) {
    res.status(404);
  
    // respond with html page
    if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, './../public/404.html'))
      return;
    }
  
    // respond with json
    if (req.accepts('json')) {
      res.json({ error: 'Not found' });
      return;
    }
  
    // default to plain-text. send()
    res.type('txt').send('Not found');
  });
const server = createServer(app);

server.listen(port, () => {
    debug(`Express server started on port: ${port}`);
})