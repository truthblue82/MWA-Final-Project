const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const { fetchAll, addOrder, getOrderById, updateOrderById } = require('../controllers/orderController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => { 
    const dest = path.join(__dirname, '..', 'assets', 'images');
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
    //cb(null, file.originalname);
  }
});

const imageUpload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(`Image with extension ${ext} is not accepted.`);
    }
    cb(undefined, true);
  }
});

router.get('/', fetchAll);
router.post('', imageUpload.single('images'), addOrder);
router.get('/:id', getOrderById);

//using post for updating because of uploading image
router.post('/:id', imageUpload.single('images'), updateOrderById);

// router.patch('/:id',);
// router.delete('/:id',);

module.exports = router;