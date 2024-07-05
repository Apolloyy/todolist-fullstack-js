const tasksmodel = require("../models/task-model");

const getTasks = async (_request, response) => {
  const getAlltasks = await tasksmodel.getTasks();
  return response.status(200).json(getAlltasks);
};

const addTask = async (request, response) => {
  const createTask = await tasksmodel.addTask(request.body);
  return response.status(201).json(createTask);
};

const deleteTask = async (request, response) => {
  const { id } = request.params;
  await tasksmodel.deleteTask(id);
  return response.status(204).json();
};

const updateTask = async (request, response) => {
  const { id } = request.params;

  await tasksmodel.updateTask(id, request.body);
  return response.status(204).json();
};

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
};
