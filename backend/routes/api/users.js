import User from '../../models/User.js';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret, expiresIn } from '../../config/config';
import registerValidation from '../../validation/register';
import loginValidation from '../../validation/login';


export const hasVerifiedToken = (req, res, next) => {
  if (req.user) {
    res.redirect(303, '/api/profile');
  } else {
    next();
  }
};


export const validate = (req, res, next) => {
  if (req.url === '/register') {
    var { errors, isValid, valid } = registerValidation(req.body);
  } else if (req.url === '/login') {
    var { errors, isValid, valid } = loginValidation(req.body);
  }

  // if invalid
  if (!isValid) {
    return res.status(400).json(errors);

  // if valid
  } else {
    req.body = valid;
    next();
  }
};


export const register = async (req, res) => {
  try {
    // check if email and userName already exist
    const user = await User.findOne({ $or: [{ email: req.body.email }, { userName: req.body.userName }] }).lean().exec();
    if (req.body.email === user?.email) return res.status(401).json({ message: 'Account with the associated email already exists.' });
    if (req.body.userName === user?.userName) return res.status(401).json({ message: 'Account with the associated username already exists.' });

    // create new user
    // fetch avatar
    const avatar = gravatar.url(req.body.email, {
      s: '200', // size
      r: 'pg', // rating
      d: 'mm' // default
    }, true);

    // create new user
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      avatar,
      password: req.body.password
    });

    // hash password
    await bcrypt.hash(newUser.password, 10)
      .then(hash => newUser.password = hash)
      .catch(err => res.status(500).json({ message: err.message }));

    // save new user
    newUser.save()
      .then(user => {
        user.password = undefined;
        res.send(user);
      })
      .catch(err => res.status(500).json({ message: err.message }));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const login = async (req, res) => {
  try {
    // get user by email
    const user = await User.findOne({ email: req.body.email }).lean().exec();

    // if no user exists
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. Wrong username or password.' });
    }

    // if user exists
    let passwordIsValid = false;

    // compare password with hashPassword
    await bcrypt.compare(req.body.password, user.password)
      .then(match => {
        // if no match, send reason
        if (!match) {
          res.status(401).json({ message: 'Authentication failed. Wrong username or password.' });
        // otherwise, passwordIsValid
        } else {
          passwordIsValid = true;
        }
      })
      .catch(err => res.status(500).json({ message: err.message }));

    // if passwordIsValid
    if (passwordIsValid) {
      const loggedInUser = await User.findOneAndUpdate({ email: req.body.email }, { isLoggedIn: true }, { new: true }).lean().exec();

      if (!loggedInUser) {
        res.status(500).json({ message: 'Could not log in user.' });

      // send token
      } else {
        const payload = {
          userName: loggedInUser.userName,
          email: loggedInUser.email,
          _id: loggedInUser._id
        };
        jwt.sign(payload, secret, { expiresIn }, (err, token) => {
          if (err) {
            res.status(500).json({ message: 'Could not log in user.' });
          } else {
            res.send({ token: `Bearer ${token}` });
          }
        });
      }
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const loginRequired = async (req, res, next) => {
  try {
    // if JWT is verified (not expired)
    if (req.user) {
      // see if user is a valid user (e.g. not a deleted account)
      const validUser = await User.findOne({ userName: req.user.userName, email: req.user.email, _id: req.user._id }).lean().exec();

      // if no validUser (e.g. deleted account) or is validUser but not logged in
      if (!validUser || !validUser.isLoggedIn) {
        res.redirect(303, '/api/login');
      // otherwise, if validUser and isLoggedIn
      } else {
        next();
      }

    // otherwise, JWT is not verified (e.g. expired), so redirect to login
    } else {
      res.redirect(303, '/api/login');
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const logout = async (req, res) => {
  try {
    // find user and log out
    const loggedOutUser = await User.findOneAndUpdate({ userName: req.user.userName, email: req.user.email, _id: req.user._id }, { isLoggedIn: false }, { new: true }).lean().exec();

    // if could not findOneAndUpdate
    if (!loggedOutUser) {
      res.status(500).json({ message: 'Could not log out user.' });
    // otherwise send loggedOutUser
    } else {
      loggedOutUser.password = undefined;
      res.send(loggedOutUser);
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteUser = (req, res) => {
  try {
    User.findOneAndRemove({ _id: req.user._id }).lean().exec()
      .then(removed => {
        removed.password = undefined;
        removed.isLoggedIn = false;
        res.send(removed);
      })
      .catch(err => res.status(500).json({ message: err.message }));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};