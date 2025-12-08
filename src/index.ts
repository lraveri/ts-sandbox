import { Pico } from './pico/Pico';

const app = new Pico();

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  const start = Date.now();
  
  // Quando la risposta viene completata
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
  });
  
  next();
});

// Body parser middleware
app.use(async (req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method || '')) {
    const chunks: Buffer[] = [];
    
    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const data = Buffer.concat(chunks).toString();
    try {
      req.body = JSON.parse(data);
    } catch {
      req.body = data;
    }
  }
  next();
});

// Error handler
app.useError((err, req, res, next) => {
  console.error('Error:', err);
  res.statusCode = 500;
  res.json({ error: 'Internal Server Error', message: err.message });
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Pico!' });
});

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.post('/echo', (req, res) => {
  // Ora possiamo usare direttamente req.body grazie al middleware
  res.json(req.body);
});

// Example of error handling
app.get('/error', () => {
  throw new Error('This is a test error!');
});

app.listen(3000, () => {
    console.log('Ready to handle requests! 🚀');
});
