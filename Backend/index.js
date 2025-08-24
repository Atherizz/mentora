const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const db = require('./models');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const psikologProfileRoutes = require('./routes/psikologProfile');
const psikologScheduleRoutes = require('./routes/psikologSchedule');
const userProfileRoutes = require('./routes/userProfile');
const emologHistoryRoutes = require('./routes/emologHistory');
const appointmentRoutes = require('./routes/appointment');
const emologClusterRoutes = require('./routes/emologCluster');
const aloraRoutes = require('./routes/alora');
const emologRoutes = require('./routes/emolog');

const app = express();

app.use(helmet());
app.use(cors()); 
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_, res) => res.send('ok'));
app.get('/', (_, res) => res.send('🚀 Mentora API jalan masbroo'));

app.use('/api/auth', authRoutes);
app.use('/api/emolog', emologRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/psikolog-profile', psikologProfileRoutes);
app.use('/api/schedule', psikologScheduleRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/profile', userProfileRoutes);
app.use('/api/emolog-history', emologHistoryRoutes);
app.use('/api/emolog-cluster', emologClusterRoutes);
app.use('/api/alora', aloraRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

const PORT = Number(process.env.PORT || 5000);
const HOST = process.env.HOST || '127.0.0.1';

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ DB connected');
    if (process.env.NODE_ENV !== 'production') {
      await db.sequelize.sync(); 
      console.log('🛠️  Sequelize models synced');
    }

    app.listen(PORT, HOST, () =>
      console.log(`🚀 BE running at http://${HOST}:${PORT}`)
    );

    process.on('SIGINT', async () => {
      console.log('\n👋 Shutting down...');
      await db.sequelize.close();
      process.exit(0);
    });
  } catch (err) {
    console.error('⚠️ DB connection error:', err.message);
    process.exit(1); 
  }
})();
