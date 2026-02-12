---
sidebar_position: 5
---
Complete guide to integrating ZendFi payments into your Express.js API.

## Quick Start

```bash
# Option 1: Use our template
npx create-zendfi-app my-api --template express-api

# Option 2: Add to existing Express app
cd my-express-app
npm install @zendfi/sdk
```


## Installation

```bash
npm install @zendfi/sdk express
npm install --save-dev @types/express typescript
```


## Environment Setup

Create `.env`:

```env
# Get your keys from https://dashboard.zendfi.tech
ZENDFI_API_KEY=zfi_test_your_key_here
ZENDFI_WEBHOOK_SECRET=your_webhook_secret

PORT=3000
```


## Basic Setup

### Initialize SDK

```typescript
// lib/zendfi.ts
import { ZendFiClient } from '@zendfi/sdk';

export const zendfi = new ZendFiClient({
  apiKey: process.env.ZENDFI_API_KEY!,
});
```

### Basic Server

```typescript
// server.ts
import express from 'express';
import 'dotenv/config';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`�� Server running on port ${PORT}`);
});
```


## Create Payment Endpoint

```typescript
// routes/payments.ts
import { Router } from 'express';
import { zendfi } from '../lib/zendfi';

const router = Router();

router.post('/payments', async (req, res) => {
  try {
    const { amount, email, metadata } = req.body;
    
    // Validate input
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }
    
    // Create payment
    const payment = await zendfi.createPayment({
      amount: parseFloat(amount),
      currency: 'USD',
      token: 'USDC',
      customer_email: email,
      metadata,
    });
    
    res.json({
      payment_id: payment.id,
      payment_url: payment.payment_url,
      status: payment.status,
    });
  } catch (error) {
    console.error('Payment creation failed:', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

export default router;
```

```typescript
// server.ts
import paymentRoutes from './routes/payments';

app.use('/api', paymentRoutes);
```


## Webhook Handler

### Option 1: Using Built-in Handler

```typescript
// routes/webhooks.ts
import { Router } from 'express';
import express from 'express';
import { createExpressWebhookHandler } from '@zendfi/sdk/express';
import { fulfillOrder } from '../lib/orders';

const router = Router();

router.post(
  '/webhooks/zendfi',
  express.raw({ type: 'application/json' }),
  createExpressWebhookHandler({
    secret: process.env.ZENDFI_WEBHOOK_SECRET!,
    handlers: {
      'payment.confirmed': async (payment) => {
        console.log(`Payment confirmed: ${payment.id}`);
        
        // Fulfill order
        await fulfillOrder({
          payment_id: payment.id,
          amount: payment.amount,
          email: payment.customer_email,
          metadata: payment.metadata,
        });
      },
      
      'payment.failed': async (payment) => {
        console.log(`❌ Payment failed: ${payment.id}`);
      },
      
      'subscription.renewed': async (subscription) => {
        console.log(`🔄 Subscription renewed: ${subscription.id}`);
      },
    },
  })
);

export default router;
```

### Option 2: Manual Webhook Handling

```typescript
// routes/webhooks.ts
import { Router } from 'express';
import express from 'express';
import { zendfi } from '../lib/zendfi';

const router = Router();

router.post(
  '/webhooks/zendfi', 
  express.raw({ type: 'application/json' }), 
  (req, res) => {
    const signature = req.headers['x-zendfi-signature'] as string;
    const payload = req.body.toString();
    
    // Verify signature
    const isValid = zendfi.verifyWebhook({
      payload,
      signature,
      secret: process.env.ZENDFI_WEBHOOK_SECRET!,
    });
    
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    // Parse payload
    const event = JSON.parse(payload);
    
    // Handle event
    switch (event.event_type) {
      case 'PaymentConfirmed':
        handlePaymentConfirmed(event.data);
        break;
      case 'PaymentFailed':
        handlePaymentFailed(event.data);
        break;
      // ... other events
    }
    
    res.json({ received: true });
  }
);

export default router;
```


## Complete API Example

### Project Structure

```
my-api/
├── src/
│   ├── routes/
│   │   ├── payments.ts
│   │   ├── subscriptions.ts
│   │   └── webhooks.ts
│   ├── lib/
│   │   ├── zendfi.ts
│   │   ├── database.ts
│   │   └── orders.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── validation.ts
│   └── server.ts
├── .env
├── package.json
└── tsconfig.json
```

### Full Server Implementation

```typescript
// server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';

import paymentRoutes from './routes/payments';
import subscriptionRoutes from './routes/subscriptions';
import webhookRoutes from './routes/webhooks';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

// Body parser (except for webhooks - must use raw body)
app.use('/api/webhooks', express.raw({ type: 'application/json' }));
app.use(express.json());

// Routes
app.use('/api', paymentRoutes);
app.use('/api', subscriptionRoutes);
app.use('/api', webhookRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

### Payment Routes

```typescript
// routes/payments.ts
import { Router } from 'express';
import { zendfi } from '../lib/zendfi';
import { authenticate } from '../middleware/auth';
import { validatePayment } from '../middleware/validation';

const router = Router();

// Create payment
router.post('/payments', authenticate, validatePayment, async (req, res) => {
  const { amount, description, email, metadata } = req.body;
  
  try {
    const payment = await zendfi.createPayment({
      amount,
      currency: 'USD',
      description,
      customer_email: email,
      metadata: {
        ...metadata,
        user_id: req.user.id,
      },
    });
    
    res.json({
      id: payment.id,
      url: payment.payment_url,
      status: payment.status,
      amount: payment.amount,
    });
  } catch (error) {
    res.status(500).json({ error: 'Payment creation failed' });
  }
});

// Get payment
router.get('/payments/:id', authenticate, async (req, res) => {
  try {
    const payment = await zendfi.getPayment(req.params.id);
    res.json(payment);
  } catch (error) {
    res.status(404).json({ error: 'Payment not found' });
  }
});

// List payments
router.get('/payments', authenticate, async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;
  
  try {
    const payments = await zendfi.listPayments({
      page: Number(page),
      limit: Number(limit),
      status: status as string,
    });
    
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

export default router;
```

### Subscription Routes

```typescript
// routes/subscriptions.ts
import { Router } from 'express';
import { zendfi } from '../lib/zendfi';
import { authenticate } from '../middleware/auth';

const router = Router();

// Create subscription
router.post('/subscriptions', authenticate, async (req, res) => {
  const { plan_id, email, wallet } = req.body;
  
  try {
    const subscription = await zendfi.createSubscription({
      plan_id,
      customer_wallet: wallet,
      customer_email: email,
      metadata: {
        user_id: req.user.id,
      },
    });
    
    res.json({
      id: subscription.id,
      url: subscription.payment_url,
      status: subscription.status,
    });
  } catch (error) {
    res.status(500).json({ error: 'Subscription creation failed' });
  }
});

// Cancel subscription
router.delete('/subscriptions/:id', authenticate, async (req, res) => {
  try {
    await zendfi.cancelSubscription(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Cancellation failed' });
  }
});

export default router;
```


## Middleware

### Authentication

```typescript
// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
```

### Validation

```typescript
// middleware/validation.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const paymentSchema = Joi.object({
  amount: Joi.number().min(0.01).max(10000).required(),
  description: Joi.string().max(500).optional(),
  email: Joi.string().email().optional(),
  metadata: Joi.object().optional(),
});

export function validatePayment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = paymentSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: error.details 
    });
  }
  
  next();
}
```

### Error Handler

```typescript
// middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', error);
  
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : undefined,
  });
}
```


## Testing

### Local Development

```bash
# Start server
npm run dev

# Listen for webhooks (in another terminal)
zendfi webhooks --forward-to http://localhost:3000/api/webhooks/zendfi
```

### API Testing with cURL

```bash
# Create payment
curl -X POST http://localhost:3000/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50,
    "email": "customer@example.com",
    "description": "Test payment"
  }'

# Get payment
curl http://localhost:3000/api/payments/pay_123abc
```

### Unit Tests

```typescript
// tests/payments.test.ts
import request from 'supertest';
import app from '../src/server';

describe('Payments API', () => {
  it('should create a payment', async () => {
    const res = await request(app)
      .post('/api/payments')
      .send({
        amount: 50,
        email: 'test@example.com',
      });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('url');
  });
  
  it('should reject invalid amount', async () => {
    const res = await request(app)
      .post('/api/payments')
      .send({
        amount: -5,
      });
    
    expect(res.status).toBe(400);
  });
});
```


## Deployment

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - ZENDFI_API_KEY=${ZENDFI_API_KEY}
      - ZENDFI_WEBHOOK_SECRET=${ZENDFI_WEBHOOK_SECRET}
      - DATABASE_URL=${DATABASE_URL}
    restart: unless-stopped
```

### Deployment Checklist

- [ ] Set production environment variables
- [ ] Use `zfi_live_` API key
- [ ] Configure webhook URL in dashboard
- [ ] Enable HTTPS
- [ ] Set up error monitoring (Sentry)
- [ ] Configure rate limiting
- [ ] Set up logging (Winston, Pino)
- [ ] Add health check endpoint
- [ ] Test webhook delivery


## Best Practices

### 1. Error Handling

```typescript
import { ZendFiError } from '@zendfi/sdk';

router.post('/payments', async (req, res) => {
  try {
    const payment = await zendfi.createPayment(req.body);
    res.json(payment);
  } catch (error) {
    if (error instanceof ZendFiError) {
      if (error.type === 'validation_error') {
        return res.status(400).json({ error: error.message });
      }
      if (error.type === 'rate_limit_error') {
        return res.status(429).json({ error: 'Too many requests' });
      }
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### 2. Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many payment requests',
});

app.use('/api/payments', paymentLimiter);
```

### 3. Request Logging

```typescript
import morgan from 'morgan';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) },
}));
```


## Troubleshooting

### Webhooks Not Received

```bash
# Test webhook locally
zendfi webhooks --forward-to http://localhost:3000/api/webhooks/zendfi

# Check webhook endpoint is publicly accessible
curl https://yourapi.com/api/webhooks/zendfi
```

### TypeScript Errors

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```


## Next Steps

- [Payment API Reference](../api/payments)
- [Webhook Events](../features/webhooks)
- [TypeScript Guide](./typescript-guide) - Type-safe SDK patterns
- [View Express Examples](https://github.com/zendfi/examples/tree/main/express)


## Need Help?

- [Join Discord](https://discord.gg/zendfi)
- [Email support](mailto:support@zendfi.tech)
- [API Documentation](../api/payments)
