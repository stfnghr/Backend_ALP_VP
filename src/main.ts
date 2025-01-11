import app from "../src/applications/app";
import { logger } from "./applications/logging";

app.listen(3000, () => {
    logger.info("Listening on http://localhost:3000/")
})