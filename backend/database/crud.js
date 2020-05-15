import { utils } from './utils';


const getOne = model => async (req, res) => {
  try {

  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};


const getMany = model => async (req, res) => {
  try {

  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};


const createOne = model => async (req, res) => {
  try {

  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};


const updateOne = model => async (req, res) => {
  try {

  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};


const deleteOne = model => async (req, res) => {
  try {

  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};


export const crud = (model) => ({
  getOne: getOne(model),
  getMany: getMany(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model)
});