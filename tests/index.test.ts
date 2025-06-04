import request from 'supertest';
import { createApp } from '../src';

describe('POST /analyze', () => {
    let app: any;

    beforeAll(async () => {
        app = await createApp();
    });

    it('Should return analysis result for a valid message', async () => {
        const res = await request(app)
            .post('/analyze')
            .send({
                message: "Sparks coming from the outlet!"
            });
        
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('result');
        expect(res.body.result.priorityScore).toBe("HIGH");
    });

    it('Should return 400 for missing message field', async () => {
        const res = await request(app)
            .post('/analyze')
            .send({});

        expect(res.status).toBe(403);
    });
});
