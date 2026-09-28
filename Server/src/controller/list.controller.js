import listModel from "../models/list.model.js";

const category = async (req, res) => {
  const category = req.body;
  const list = await listModel.insertMany(category);
  return res.status(201).json({
    message: "category create successfully",
    category: list[0].category,
  });
};

export { category };
