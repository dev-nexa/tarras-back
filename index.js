// Require files
require("dotenv").config({ path: "./secret.env" });
// require("./config/");

// Call library
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const cookieSession = require("cookie-session");

// Import routes
const customerRoutes = require('./routes/customers');
const categoriesRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const externalOrderRoutes = require('./routes/externalOrders');
const internalOrderRoutes = require('./routes/internalOrders');
const tableRoutes = require('./routes/tables');
const deliveryStaffRoutes = require('./routes/deliveryStaffs');
const employeesRoutes = require('./routes/employees');
const locationsRoutes = require('./routes/locations');
const messagesRoutes = require('./routes/messages');
const dailyTableEmployeesRoutes = require('./routes/dailyTableEmployees');
const employeesTypesRoutes = require('./routes/employeesTypes');
const resarvationsRoutes = require('./routes/resarvations');

// Init
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY || "fallbackSecret"],
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  })
);

// Allowed domains
const allowedDomains = [
  "https://frontend.com",
  "https://another-allowed-site.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedDomains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});
app.use("/api/", apiLimiter);

// Protection
app.use(helmet()); //USE to secure inspect
app.use(morgan("combined"));

// APIs
app.use('/api', customerRoutes);
app.use('/api', productRoutes);
app.use('/api', categoriesRoutes);
app.use('/api', externalOrderRoutes);
app.use('/api', internalOrderRoutes);
app.use('/api', tableRoutes);
app.use('/api', deliveryStaffRoutes);
app.use('/api', employeesRoutes);
app.use('/api', locationsRoutes);
app.use('/api', messagesRoutes);
app.use('/api', dailyTableEmployeesRoutes);
app.use('/api', employeesTypesRoutes);
app.use('/api', resarvationsRoutes);

// URIs
app.get("/", (req, res) => {
  res.send("Welcome Programmer");
});
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start
const PORT = process.env.PORT || 3001;
async function startServer() {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
  });
}
startServer();
