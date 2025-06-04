import * as dotenv from 'dotenv';
import * as log4js from 'log4js';
import express from 'express';
import { getMongoClient } from './databases/mongo';
import { configureLogger } from './utils/logger';
import { configureNotValidRoute } from './utils/notValidRoute';
import { debugRequest } from './utils/debugRequest';
import { APPLICATION_CONFIG } from './utils/applicationConfig';
import { MaintenanceRepository } from './repositories/maintenance.repository';
import { RequestsController } from './controllers/requests.controller';
import { GetMaintanaceQuery } from './queries/get-maintenance.query';
import { MessageAiAnalzyerManager } from './managers/messageAiAnalzyerManager';
import { MessageKeywordAnalzyerManager } from './managers/messageKeywordAnalzyerManager';
import { AnalyzerController } from './controllers/analyzerController.controller';
import { MessageAnalyzer } from './managers/messageAnalzyer';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || '';

export async function main() {
    configureLogger();

    app.use(express.json());

    const logger = log4js.getLogger("Main");

    try {
        const mongoClient = await getMongoClient(mongoUri);
        // const eventStore = new EventStore('events.json');

        if(APPLICATION_CONFIG.DEBUG_REQUEST === true){ 
            debugRequest(app);
        }

        const messageKeywordAnalzyerManager = new MessageKeywordAnalzyerManager()
        const messageAiAnalzyerManager = new MessageAiAnalzyerManager(messageKeywordAnalzyerManager);
        const messageAnalyzer = new MessageAnalyzer(messageAiAnalzyerManager, messageKeywordAnalzyerManager);

        // ---------- Repositories ----------
        const maintenanceRepository = new MaintenanceRepository();

        // ---------- Queries ----------
        const getMaintenanceQuery = new GetMaintanaceQuery(maintenanceRepository);

        // ---------- Conrollers ----------
        const requestsController = new RequestsController(getMaintenanceQuery, maintenanceRepository, messageAnalyzer);
        const analyzerController = new AnalyzerController(messageAnalyzer);

        app.post('/analyze', analyzerController.analyzeMessage.bind(analyzerController));
        app.post('/request', requestsController.createMaintance.bind(requestsController));
        app.get('/requests', requestsController.getMaintanacesByPriority.bind(requestsController));

        configureNotValidRoute(app);

        app.listen(port, () => {
            logger.log(`Server is running on port ${port}`);
        });

    } catch (error) {
        logger.error("error during connection", error);
    }
}

main().catch((error) => {
    console.log(error);
});