const express = require('express');
const multer = require('multer');
const path = require('path');

const { initData, deleteAll, login, signup, getAll,
  getEmployeeById, updateEmployeeById, updateEmployeePassword } = require('../controllers/employeeController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => { 
    const dest = path.join(__dirname, '..', 'assets', 'images');
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
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

router.post('/fill', initData);
router.delete('/clear', deleteAll);
router.post('/signup', signup);
router.post('/login', login);
router.get('', getAll);
router.get('/:id', getEmployeeById);

router.put('/:id', updateEmployeeById);

router.post('/:id', imageUpload.single('image'), updateEmployeeById);

router.patch('/:id', updateEmployeePassword);

module.exports = router;
