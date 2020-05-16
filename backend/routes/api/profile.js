import Profile from '../../models/Profile';


export const currentUsersProfile = async (req, res) => {
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