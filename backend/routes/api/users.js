import User from '../../models/User.js';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret, expiresIn } from '../../config/config';


export const register = async (req, res) => {
  try {
    // check if email already exists
    const user = await User.findOne({ email: req.body.email }).lean().exec();
    if (user) return res.status(401).json({ message: 'Account with the associated email already exists.' });

    // create new user
    // fetch avatar
    const avatar = gravatar.url(req.body.email, {
      s: '200', // size
      r: 'pg', // rating
      d: 'mm' // default
    });

    // create new user
    const newUser = new User({
      name: req.body.name,
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
        res.json(user);
      })
      .catch(err => res.status(500).json({ message: err.message }));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const login = async (req, res) => {
  try {
    // get user by userName
    const user = await User.findOne({ email: req.body.email }).lean().exec();

    // if not found
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. Wrong user name or password.' });

    // if found
    } else {
      let passwordIsValid = false;

      // compare password with hashPassword
      await bcrypt.compare(req.body.password, user.password)
        .then(match => {
          // if no match, send reason
          if (!match) {
            res.status(401).json({ message: 'Authentication failed. Wrong user name or password.' });
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
          res.status(400).json({ message: 'Could not log in user.' });
        } else {
          res.send({ token: jwt.sign({ name: loggedInUser.name, email: loggedInUser.email, avatar: loggedInUser.avatar, _id: loggedInUser._id }, secret, { expiresIn }) });
        }
      }
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};