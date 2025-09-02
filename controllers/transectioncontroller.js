const moment = require("moment");
const transectionModel = require("../models/transectionModel");

const getAllTransection = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const transections = await transectionModel.find({
      ...(frequency !== "custom"
        ? { date: { $gt: moment().subtract(Number(frequency), "d").toDate() } }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transections);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const addTransection = async (req, res) => {
  try {
    const newTransection = new transectionModel(req.body);
    await newTransection.save();
    res.status(201).json("Transection added successfully");
  } catch (error) {
    res.status(400).json(error);
  }
};

const editTransection = async (req, res) => {
  try {
    await transectionModel.findOneAndUpdate(
      { _id: req.body.transectionId },
      req.body.payload
    );

    res.status(200).json("Transection edited successfully");
  } catch (error) {
    res.status(400).json(error);
  }
};
const deleteTransection = async (req, res) => {
  try {
    await transectionModel.findOneAndDelete({ _id: req.body.transectionId });

    res.status(200).json("Transection deleted successfully");
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllTransection,
  addTransection,
  editTransection,
  deleteTransection,
};
