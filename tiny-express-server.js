const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// === MY "strict" CORS setup (adapted for localhost testing) ===

// I only allow the same-origin origin (http://localhost:3000)
const allowedOrigins = ["http://localhost:3000"];

app.use(cors({
  origin: function (origin, callback) {
    // Reject requests without Origin (treat as suspicious)
    if (!origin) return callback(new Error("Origin header required"), false);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // return an error to cors middleware
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true,
}));

// "Login" sets a cookie (we set SameSite=None to allow cross-site sending for demo)
app.get('/login', (req, res) => {
  res.cookie('session', 'victim-session-abc', {
    httpOnly: true,     // realistic: HttpOnly so JS cannot read it
    sameSite: 'None',   // allow cross-site sending for the demo
    secure: true   
  });
  res.send('Logged in locally. Cookie set.');
});

// Transfer endpoint
app.post('/transfer', (req, res) => {
  console.log('--- /transfer called ---');
  console.log('Body:', req.body);
  console.log('Cookies seen by server:', req.cookies);
  res.send(`Transfer processed: ${req.body.amount} to ${req.body.to}`);
});

// Help page
app.get('/', (req, res) => {
  res.send(`
  <h3>BETA CSRF MITIGATION POC, hosted on http://localhost:3000</h3>
  <p>Visit <a href="/login">/login</a> to set cookie</p>
  `);
});

app.listen(3000, () => console.log('POC server running on http://localhost:3000'));
