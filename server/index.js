import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from './models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import imageDownloader from 'image-downloader'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import Place from './models/place.js'
import BookingModel from './models/Booking.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
dotenv.config()

const photosMiddleware = multer({
  storage: multer.memoryStorage(),
});

const bcryptSalt = bcrypt.genSaltSync(10)

const jwtSecret = process.env.JWT_SECRET


const uploadsPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));
app.use(express.json())
app.use(cookieParser())
const PORT = process.env.PORT || 3000
app.use(cors({
  origin: 'https://nestify-booking-app.netlify.app',
  credentials: true,
  allowedHeaders: ['*'],
  methods: 'GET, HEAD, PUt, PATCH, POST, DELETE',
  preflightContinue: false
}))

mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req,res) => {
  res.json('testok')
})

app.post('/register', async (req,res) => {
  const {name, email, password} = req.body
  try {
   
  const user = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  })
  res.json(user)
  } catch(e) {
    res.status(400).json(e)
    console.log(e)
  }

})

app.post('/login', async (req,res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})
  if(user) {
   
    const passOk = bcrypt.compareSync(password, user.password)

    if (passOk) {
      const token = jwt.sign({ 
        email: user.email, 
        id: user._id, 
        name: user.name
      }, jwtSecret);
      res.cookie('token', token, { httpOnly: true, secure: false }).json(user);
    } else {
      res.json('password incorrect');
    }
  } else {
    res.status(400).json('user not found');
  }
});
 
app.get('/profile', async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const userData = jwt.verify(token, jwtSecret);
      const user = await User.findOne({ _id: userData.id });

      if (user) {
        const { name, email, _id } = user;
        res.json({ name, email, _id });
      } else {
        res.json(null); 
      }
    } catch (err) {
      res.json(null); 
    }
  } else {
    res.json(null);
  }
});



app.post('/logout', (req, res) => {

  res.cookie('token', '', { expires: new Date(0), httpOnly: true }).json(true);
  res.json({ success: true });
});


app.post('/upload-by-link', async (req,res) => {
  const {link} = req.body;

  const newName = 'photo' + Date.now() + '.jpg'
  await imageDownloader.image({
    url: link,
    dest: `${__dirname}/uploads/${newName}`
  })
  res.json(newName);
})


app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { buffer, originalname } = req.files[i];
    const ext = originalname.split('.').pop();
    const newName = 'photo' + Date.now() + '.' + ext;
    const newPath = `${__dirname}/uploads/${newName}`;

    fs.writeFileSync(newPath, buffer);
    uploadedFiles.push(newName);
  }

  res.json(uploadedFiles);
});

app.post('/places', async (req, res) => {
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  const numericCheckIn = parseFloat(checkIn);
  const numericCheckOut = parseFloat(checkOut);
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    try {
      if (err) {
        console.error('Token verification failed:', err.message);
        return res.status(401).json({ error: 'Token verification failed' });
      }

      const placeDoc = await Place.create({
        owner: userData.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn: numericCheckIn,
        checkOut: numericCheckOut,
        maxGuests,
        price,
      });

      res.json(placeDoc);
    } catch (error) {
      console.error('Error in /places endpoint:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});



app.get('/user-places', (req,res) => {
  const {token} = req.cookies;
  
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const {id} = userData;
    res.json(await Place.find({owner: id}))
  })
})

app.get('/places/:id', async (req,res) => {
  const {id} = req.params
  res.json( await Place.findById(id))
})

app.put('/places/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  const numericCheckIn = parseFloat(checkIn);
  const numericCheckOut = parseFloat(checkOut);
  const { token } = req.cookies;

  try {
    const userData = jwt.verify(token, jwtSecret);

    const place = await Place.findOne({ _id: id, owner: userData.id });
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }
    place.title = title;
    place.address = address;
    place.photos = addedPhotos;
    place.description = description;
    place.perks = perks;
    place.extraInfo = extraInfo;
    place.checkIn = numericCheckIn;
    place.checkOut = numericCheckOut;
    place.maxGuests = maxGuests;
    place.price = price

    const updatedPlace = await place.save();

    res.json(updatedPlace);
  } catch (error) {
    console.error('Error in /places/:id (PUT) endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/places', async (req,res) => {
  res.json( await Place.find())
})

app.post('/bookings', async (req, res) => {
  const { placeId, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;

  if (!placeId) {
    return res.status(400).json({ error: 'Place ID is required' });
  }

  const { token } = req.cookies; 

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    try {
      if (err) {
        console.error('POST: Token verification failed:', err.message);
        return res.status(401).json({ error: 'Token verification failed' });
      }
  
      const bookingDoc = await BookingModel.create({
        user: userData.id,
        place: placeId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        name,
        phone,
        price,
      });
  
      res.json(bookingDoc);
    } catch (error) {
      console.error('Error in /bookings (POST) endpoint:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
}); 


app.get('/bookings', async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    try {
      if (err) {
        console.error('GET:Token verification failed:', err.message);
        return res.status(401).json({ error: 'Token verification failed' });
      }

      const bookings = await BookingModel.find({ user: userData.id }).populate('place');
      res.json(bookings);
    } catch (error) {
      console.error('Error in /bookings (GET) endpoint:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

app.listen(PORT, () => {
  console.log('server listening to '+PORT)
})