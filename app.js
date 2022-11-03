const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const env = require("./config/env")();
const socketIO = require("socket.io");
const http=require("http");
const server=http.createServer(app);



const io=socketIO(server);
const users=[{}];
io.on("connection",(socket)=>{
    console.log("New Connection");
    socket.on('joined',({user})=>{
          users[socket.id]=user;
          console.log(`${user} has joined `);
          socket.broadcast.emit('userJoined',{user:"Admin",message:` ${users[socket.id]} has joined`});
          socket.emit('welcome',{user:"Admin",message:`Welcome to the chat,${users[socket.id]} `})
    })

    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id});
    })

    socket.on('disconnect',()=>{
          socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}  has left`});
        console.log(`user left`);
    })
});

var indexRouter = require("./routes/index");
var adminRouter = require("./routes/admin");
var usersRouter = require("./routes/users");
var versionRouter= require("./routes/version");
var categoryRouter= require("./routes/category");
var notificationRouter= require("./routes/notification");
var reportbugRouter =require("./routes/reportBug");
var reportContentRouter =require("./routes/reportContent");
var adminAchievementRouter =require("./routes/adminAchievement");
var achievementLevelRouter =require("./routes/achievementLevel");
var socialaccountRouter =require("./routes/socialAccountRoutes");
var dashboardRouter =require("./routes/dashboard");

var __dirname = path.resolve();
var app = express();
// ROUTES Path
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use('/public', express.static("public"));
app.use((req, res, next) => {
	//Enabling CORS
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
	next();
});
var swaggerOptions = {
	explorer: true,
	swaggerOptions: {
		urls: [
			{
				url: "/documentation",
				name: "API"
			},
			{
				url: "/documentation-admin",
				name: "API - Admin"
			}
		]
	}
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(null, swaggerOptions));
app.use("/", indexRouter);

app.use("/user", usersRouter);
app.use("/admin", adminRouter);
app.use("/appversion", versionRouter);
app.use("/category", categoryRouter);
app.use("/notification", notificationRouter);
app.use("/reportBug", reportbugRouter);
app.use("/reportContent", reportContentRouter);
app.use("/adminachievement", adminAchievementRouter);
app.use("/achievementlevel", achievementLevelRouter);
app.use("/socialaccount", socialaccountRouter);
app.use("/dashboard", dashboardRouter);



require("./dbConnection").connectDB();
app.use((req, res, next) => {
	if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
		return res.sendStatus(204);
	}
	return next();
});
app.use((req, res, next) => {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});
app.options("/*", cors()); // enable pre-flight request for DELETE request
// error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	console.log(err);
	// render the error page
	res.status(err.status || 500);
	res.render("404", { baseUrl: env.APP_URLS.API_URL });

});
module.exports = app;