import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHander from "./src/middlewares/pathHandler.mid.js";

try {
    const server = express();
    const port = 8000;
    const ready = () => console.log("Server ready on port: " + port);
    server.listen(port, ready);

    server.use(morgan("dev"));
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(cors());

    server.use(router);
    server.use(errorHandler);
    server.use(pathHander);
} catch (error) {
    console.log("2");
    console.log(error);
}
