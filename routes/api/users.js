const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route         GET api/users
// @description   test route
// @access        public
router.get('/', (req, res) => res.send('User route'));

// @route         POST api/users
// @description   register user
// @access        public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Valid email address required').isEmail(),
  check('password', 'Password must have at least 4 characters').isLength({ min: 4 })
  ], 
  async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  // destructuring so we don't have to prefix with with 'req.body.'
  const { name, email, password } = req.body; 
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'user already exists' }] });
    }
      
    user = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    
    const payload = {
      user: {
        id: user.id
      }
    }
    
    // sign the token, pass in payload, pass in secret, expiration (optional)
    // inside the callback, if we don't get an error, we send back the token
    jwt.sign(
      payload, 
      config.get('jwtSecret'),
      { expiresIn: 720000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch(err) {
    console.log(err.message);
    res.status(500).send('Server error');
  };
});

module.exports = router;