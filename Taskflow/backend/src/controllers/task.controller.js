import taskModel from "../models/task.model.js";

async function addTask(req, res) {
  const user = req.user;

  const { title, dueDate, priority, important, completed } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({
      success: false,
      message: "Title, dueDate  are required",
    });
  }

  try {
    await taskModel.create({
      title,
      dueDate,
      priority,
      important,
      completed,
      user: user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function updateTask(req, res) {
  const user = req.user;

  const { id, title, dueDate, priority, important, completed } = req.body;

  try {
    const task = await taskModel.findOne({
      _id: id,
      user: user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.title = title;
    task.dueDate = dueDate;
    task.priority = priority;
    task.completed = completed;
    task.important = important;

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function getTask(req, res) {
  const user = req.user;

  try {
    const tasks = await taskModel.find({ user: user._id });

    return res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function deleteTask(req, res) {
  const user = req.user;
  const { id } = req.body;

  try {
    const task = await taskModel.findOneAndDelete({
      _id: id,
      user: user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function toggleCompleted(req, res) {
  const user = req.user;
  const { id } = req.body;

  try {
    const task = await taskModel.findOne({
      _id: id,
      user: user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.completed = !task.completed;
    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function toggleImportant(req, res) {
  const user = req.user;
  const { id } = req.body;

  try {
    const task = await taskModel.findOne({
      _id: id,
      user: user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.important = !task.important;
    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export default {
  addTask,
  getTask,
  updateTask,
  deleteTask,
  toggleCompleted,
  toggleImportant,
};
