const connection = require("./connection");

const getTasks = async () => {
  const [tasks] = await connection.execute("SELECT * FROM tasks");
  return tasks;
};

const addTask = async (task) => {
  const { title } = task;
  const date = new Date(Date.now());
  const dateUTC = date.toUTCString();
  const [add] = await connection.execute(
    "INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)",
    [title, "pendente", dateUTC]
  );
  return { id_used: add.insertId };
};

const deleteTask = async (id) => {
  const task_delete = await connection.execute(
    "DELETE FROM tasks WHERE id = ?",
    [id]
  );
  return task_delete;
};

const updateTask = async (id, task) => {
  const { title, status } = task;
  const task_update = await connection.execute(
    "UPDATE tasks SET title = ?, status = ? WHERE id = ?",
    [title, status, id]
  );
  return task_update;
};

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
};
