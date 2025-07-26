import express from 'express';
import { TextEncoder, TextDecoder } from 'util';

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

const request = require('supertest');

import { Endpoints } from '../../common/Endpoints';
import { gamble } from '../gamble/gamble';
import { validateGambleRequest } from '../gamble/validateGambleRequest';
import { sendJSON } from '../util/sendJSON';
import {
    GambleMethod,
    GambleRequest,
} from '../../common/type/GambleRequest';
import { SuccessfulGambleResponse } from '../../common/type/GambleResponse';

jest.mock('node-fetch', () => ({
    __esModule: true,
    default: (...args: any[]) => (fetch as any)(...args),
}));

jest.mock(
    '../gamble/deliveroo/get-restaurant-data/postcode/get-places-to-eat-url/google-maps/geocode',
    () => ({
        geocode: jest.fn(async () => ({ lat: 51.5, lng: -0.13 })),
    })
);

const createApp = () => {
    const app = express();
    app.use(express.json());
    app.post(Endpoints.GAMBLE, async (req, res) => {
        try {
            const body = req.body as GambleRequest;
            validateGambleRequest(body);
            const result = await gamble(body);
            sendJSON<SuccessfulGambleResponse>(result, res);
        } catch (e: any) {
            sendJSON({ type: 'error', error: e?.message || 'Error' }, res);
        }
    });
    return app;
};

describe('/api/gamble integration', () => {
    jest.setTimeout(30000);

    it('returns a combination of food items', async () => {
        const app = createApp();
        const res = await request(app)
            .post(Endpoints.GAMBLE)
            .send({
                method: GambleMethod.POSTCODE,
                postcode: 'EC1A 1BB',
                priceLimit: 20,
                numberOfPeople: 1,
            } as GambleRequest);

        expect(res.status).toBe(200);
        expect(res.body.type).toBe('success');
        expect(res.body.selected.items.length).toBeGreaterThan(0);
    });
});
