import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieSession = require('cookie-session')
import router from './routes/user.routes'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(cors({
  origin: 'http://localhost:4321',
  credentials: true
}))
const SIGN_KEY = process.env.COOKIE_SESSION_SIGN_KEY ?? 'zfqfqwff23e'
const ENCRYPT_KEY = process.env.COOKIE_SESSION_ENCRYPT_KEY ?? 'wef1rgw3ef'
app.use(cookieSession({
  name: 'session',
  keys: [SIGN_KEY, ENCRYPT_KEY],
  maxAge: 3 * 60 * 1000
}))
app.use(express.json())

app.use('/', router)

const PORT: number = Number(process.env.PORT || 3000)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})