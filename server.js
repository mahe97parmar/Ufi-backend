import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
//import contactRoutes from './src/routes/contact.js'
//import donateRoutes from './src/routes/donate.js'

dotenv.config()
const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL?.split(',') || '*'}))
app.use(express.json())

const MONGODB_URI = process.env.MONGODB_URI
if(!MONGODB_URI) console.warn('⚠️ MONGODB_URI not set. Set it in .env')

mongoose.connect(MONGODB_URI, { dbName: 'ufi_ngo' })
  .then(()=> console.log('✅ MongoDB connected'))
  .catch(err=> console.error('Mongo error:', err.message))

app.get('/', (req,res)=> res.json({ ok: true, service:'UFI NGO API' }))
//app.use('/api/contact', contactRoutes)
//app.use('/api/donate', donateRoutes)

const port = process.env.PORT || 5000
app.listen(port, ()=> console.log('🚀 API running on port', port))
