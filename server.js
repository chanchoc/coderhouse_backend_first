import "dotenv/config.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { createServer } from "http";
import __dirname from "./utils.js";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHander from "./src/middlewares/pathHandler.mid.js";
import socketCb from "./src/routers/index.socket.js";
import locals from "./src/middlewares/locals.mid.js";
import methodOverride from "method-override";
import dbConnect from "./src/utils/db.util.js";

try {
    const server = express();
    const port = process.env.PORT || 8080;
    const ready = async () => {
        console.log("Server ready on port: " + port);
        await dbConnect();
    };
    const httpServer = createServer(server);
    const tcpServer = new Server(httpServer);
    tcpServer.on("connection", socketCb);
    httpServer.listen(port, ready);

    server.use(
        session({
            secret: "secretkey",
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false,
            },
        })
    );
    server.use(locals);
    server.use(morgan("dev"));
    server.use(express.urlencoded({ extended: true }));
    server.use(methodOverride("_method"));
    server.use(express.json());
    server.use(cors());
    server.use("/public", express.static("public"));

    server.engine(
        "handlebars",
        engine({
            helpers: {
                json: (object) => JSON.stringify(object),
            },
        })
    );
    server.set("view engine", "handlebars");
    server.set("views", __dirname + "/src/views");

    server.use(router);
    server.use(errorHandler);
    server.use(pathHander);
} catch (error) {
    console.log(error);
}
