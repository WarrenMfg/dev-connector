import Profile from '../../models/Profile';


export const currentUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).lean().exec();

    if (!profile) {
      return res.status(404).json({ noProfile: true, message: 'Profile could not be found.' });
    }

    res.send(profile);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const createOrUpdateUserProfile = async (req, res) => {
  try {
    const tempProfileObj = {};
    // populate tempProfileObj object with logged in user _id
    tempProfileObj.user = req.user._id;
    tempProfileObj.url = req.user.userName;

    // populate tempProfileObj object with form data
    if (req.body.company) tempProfileObj.company = req.body.company;
    if (req.body.website) tempProfileObj.website = req.body.website;
    if (req.body.location) tempProfileObj.location = req.body.location;
    if (req.body.status) tempProfileObj.status = req.body.status;
    if (req.body.bio) tempProfileObj.bio = req.body.bio;
    if (req.body.githubUserName) tempProfileObj.githubUserName = req.body.githubUserName;

    // skills
    if (typeof req.body.skills !== 'undefined') {
      tempProfileObj.skills = req.body.skills.split(',');
    }

    // social
    tempProfileObj.social = {};
    if (req.body.youtube) tempProfileObj.social.youtube = req.body.youtube;
    if (req.body.twitter) tempProfileObj.social.twitter = req.body.twitter;
    if (req.body.facebook) tempProfileObj.social.facebook = req.body.facebook;
    if (req.body.linkedin) tempProfileObj.social.linkedin = req.body.linkedin;
    if (req.body.instagram) tempProfileObj.social.instagram = req.body.instagram;

    // create or update profile
    // change to findOneAndUpdate; if no profile returned, then create; else chain .then() and .catch() to Promise
    const profile = await Profile.findOne({ user: req.user._id }).lean().exec();

    if (!profile) {
      // create
      Profile.create(tempProfileObj).lean().exec()
        .then(newUserProfile => res.send(newUserProfile))
        .catch(err => res.status(500).json({ message: err.message }));

    } else {
      // update
      Profile.findOneAndUpdate({ user: req.user._id }, tempProfileObj, { new: true }).lean().exec()
        .then(updatedUserProfile => res.send(updatedUserProfile))
        .catch(err => res.status(500).json({ message: err.message }));
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};