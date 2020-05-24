import Profile from '../../models/Profile';
import profileValidation from '../../validation/profile';
import experienceValidation from '../../validation/experience';
import educationValidation from '../../validation/education';
import { isEmpty } from '../../validation/utils';
import axios from 'axios';
import { githubAuthToken } from '../../config/config';


const global$limit = 10;


export const currentUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });

    // if no profile created yet, or could not be found
    if (!profile) {
      return res.json({ noProfile: true, message: 'Profile not yet created or could not be found.' });
    }

    return res.send(profile);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const validateProfileInput = (req, res, next) => {
  const { errors, isValid, valid } = profileValidation(req.body);

  // if invalid
  if (!isValid) {
    return res.status(400).json(errors);

  // if valid
  } else {
    Object.assign(req.body, valid);
    next();
  }
};


export const createOrUpdateUserProfile = async (req, res) => {
  try {
    const tempProfileObj = {};
    // populate tempProfileObj object with logged in user _id
    tempProfileObj.user = req.user._id;
    tempProfileObj.slug = req.user.userName;

    // populate tempProfileObj object with form input
    if (req.body.company) tempProfileObj.company = req.body.company;
    if (req.body.website) tempProfileObj.website = req.body.website;
    if (req.body.location) tempProfileObj.location = req.body.location;
    if (req.body.status) tempProfileObj.status = req.body.status;
    if (req.body.bio) tempProfileObj.bio = req.body.bio;
    if (req.body.githubUserName) tempProfileObj.githubUserName = req.body.githubUserName;

    // skills
    if (req.body.skills) {
      tempProfileObj.skills =
        req.body.skills
          .split(',') // split into array
          .reduce((acc, val) => { // trim whitespace from individual skills
            const trimmed = val.trim();
            if (trimmed) {
              acc.push(trimmed);
              return acc;
            } else {
              return acc
            }
          }, []);
    }

    // social
    tempProfileObj.social = {};
    if (req.body.youtube) tempProfileObj.social.youtube = req.body.youtube;
    if (req.body.twitter) tempProfileObj.social.twitter = req.body.twitter;
    if (req.body.facebook) tempProfileObj.social.facebook = req.body.facebook;
    if (req.body.linkedin) tempProfileObj.social.linkedin = req.body.linkedin;
    if (req.body.instagram) tempProfileObj.social.instagram = req.body.instagram;

    // create or update profile
    const profile = await Profile.findOneAndUpdate({ user: req.user._id }, tempProfileObj, { new: true }).lean().exec();

    if (!profile) {
      // create
      Profile.create(tempProfileObj)
        .then(newUserProfile => res.send(newUserProfile))
        .catch(err => res.status(500).json({ message: err.message }));

    } else {
      res.send(profile);
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteProfile = (req, res, next) => {
  try {
    Profile.findOneAndRemove({ user: req.user._id }).lean().exec()
      .then(() => next())
      .catch(err => res.status(500).json({ message: err.message }));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getOneBySlug = async (req, res) => {
  try {
    const profile = await Profile.findOne({ slug: req.params.slug });

    if (!profile) {
      return res.status(404).json({ noProfile: true, message: 'Profile could not be found.' });
    }

    profile
      .execPopulate({ path: 'user', model: 'User', select: 'avatar' })
      .then(populated => res.send(populated))
      .catch(err => res.status(500).json({ message: err.message }));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getGitHubRepos = (req, res) => {
  const { githubUserName } = req.params;
  const count = 5;
  const sort = 'updated';
  const direction = 'desc';

  axios.get(`https://api.github.com/users/${githubUserName}/repos?per_page=${count}&sort=${sort}&direction=${direction}`, {
    headers: {
      'Authorization': `token ${githubAuthToken}`,
      'Content-Type': 'application/json'
    }
  })
    .then(repos => {
      res.set({
        'Cache-Control': 'public, max-age=3600'
      });
      res.send(repos.data);
    })
    .catch(err => console.log(err.message));
};


export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.aggregate([ { $sort: { createdAt: -1 } }, { $limit: global$limit } ]);

    if (!profiles) {
      return res.json({ noProfiles: true, message: 'Profiles could not be found.' });
    }

    Profile
      .populate(profiles, { model: 'User', select: 'avatar', path: 'user' })
      .then(populated => res.send(populated))
      .catch(err => res.status(500).json({ message: err.message }));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getLatestProfiles = async (req, res) => {
  try {
    const { latest } = req.params;
    const agg = [
      { $match: { createdAt: { $gt: new Date(latest) } } },
      { $sort: { createdAt: -1 } }
    ];

    const profiles = await Profile.aggregate(agg);
    if (isEmpty(profiles)) {
      return res.json({ noProfiles: true, message: 'No new profiles.' });
    }

    Profile
      .populate(profiles, { model: 'User', select: 'avatar', path: 'user' })
      .then(populated => res.send(populated))
      .catch(err => res.status(500).json({ message: err.message }));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getMoreProfiles = async (req, res) => {
  try {
    const { last } = req.params;
    const agg = [
      { $match: { createdAt: { $lt: new Date(last) } } },
      { $sort: { createdAt: -1 } },
      { $limit: global$limit }
    ];

    const profiles = await Profile.aggregate(agg);

    if (isEmpty(profiles)) {
      return res.json({ noProfiles: true, message: 'No more profiles.' });
    }

    Profile
      .populate(profiles, { model: 'User', select: 'avatar', path: 'user' })
      .then(populated => res.send(populated))
      .catch(err => res.status(500).json({ message: err.message }));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const validateExperienceInput = (req, res, next) => {
  const { errors, isValid, valid } = experienceValidation(req.body);

  // if invalid
  if (!isValid) {
    return res.status(400).json(errors);

  // if valid
  } else {
    Object.assign(req.body, valid);
    next();
  }
};


export const createExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({ noProfile: true, message: 'Experience could not be found.' });
    }

    // build experience from form input
    const experience = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // push and sort so newest is at index 0 and descending thereafter
    profile.experience.push(experience);
    // consider adding to frontend instead
    profile.experience.sort((a, b) => b.from - a.from);

    // save to db
    profile.save()
      .then(updatedProfile => res.send(updatedProfile))
      .catch(err => res.status(500).json({ message: err.message }));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({ noProfile: true, message: 'Experience could not be deleted.' });
    }

    // filter out param
    const filteredExperience = profile.experience.filter(exp => exp._id.toString() !== req.params._id);
    profile.experience = filteredExperience;

    // save to db
    profile.save()
      .then(updatedProfile => res.send(updatedProfile))
      .catch(err => res.status(500).json({ message: err.message }));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const validateEducationInput = (req, res, next) => {
  const { errors, isValid, valid } = educationValidation(req.body);

  // if invalid
  if (!isValid) {
    return res.status(400).json(errors);

  // if valid
  } else {
    Object.assign(req.body, valid);
    next();
  }
};


export const createEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({ noProfile: true, message: 'Education could not be found.' });
    }

    // build education from form input
    const education = {
      school: req.body.school,
      degree: req.body.degree,
      fieldOfStudy: req.body.fieldOfStudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // push and sort so newest is at index 0 and descending thereafter
    profile.education.push(education);
    // consider adding to frontend instead
    profile.education.sort((a, b) => b.from - a.from);

    // save to db
    profile.save()
      .then(updatedProfile => res.send(updatedProfile))
      .catch(err => res.status(500).json({ message: err.message }));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({ noProfile: true, message: 'Education could not be deleted.' });
    }

    // filter out param
    const filteredEducation = profile.education.filter(edu => edu._id.toString() !== req.params._id);
    profile.education = filteredEducation;

    // save to db
    profile.save()
      .then(updatedProfile => res.send(updatedProfile))
      .catch(err => res.status(500).json({ message: err.message }));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};