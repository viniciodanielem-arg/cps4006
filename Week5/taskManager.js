// taskManager.js

function createTaskManager() {
  // ----- PRIVATE STATE (encapsulated in closure) -----
  let nextId = 1;
  const tasks = []; // each task: { id, title, priority }

  // Priority ranking for sorting: high > medium > low
  const priorityRank = {
    high: 3,
    medium: 2,
    low: 1
  };

  function isValidPriority(priority) {
    return priority in priorityRank;
  }

  // ----- PUBLIC METHODS (returned) -----
  function addTask(title, priority = "low") {
    if (typeof title !== "string" || title.trim() === "") {
      console.log("addTask failed: title must be a non-empty string.");
      return null;
    }

    if (!isValidPriority(priority)) {
      console.log("addTask failed: priority must be 'low', 'medium', or 'high'.");
      return null;
    }

    const task = {
      id: nextId++,
      title: title.trim(),
      priority
    };

    tasks.push(task);
    console.log(`Added task #${task.id} (${task.priority}): ${task.title}`);
    return task.id;
  }

  function getTasks() {
    // return a NEW array, sorted by priority (and then by id for stability)
    return tasks
      .slice()
      .sort((a, b) => {
        const diff = priorityRank[b.priority] - priorityRank[a.priority];
        return diff !== 0 ? diff : a.id - b.id;
      });
  }

  function getTasksByPriority(priority) {
    if (!isValidPriority(priority)) {
      console.log("getTasksByPriority failed: priority must be 'low', 'medium', or 'high'.");
      return [];
    }

    return tasks
      .filter(t => t.priority === priority)
      .slice()
      .sort((a, b) => a.id - b.id);
  }

  function removeTaskById(id) {
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
      console.log(`removeTaskById: no task found with id ${id}`);
      return false;
    }

    // splice removes the task in-place
    const removed = tasks.splice(index, 1)[0];
    console.log(`Removed task #${removed.id}: ${removed.title}`);
    return true;
  }

  function printTasks(list = getTasks()) {
    if (list.length === 0) {
      console.log("(no tasks)");
      return;
    }

    list.forEach(t => {
      console.log(`#${t.id} [${t.priority}] ${t.title}`);
    });
  }

  // Return operations dynamically (the "API" object)
  return {
    addTask,
    getTasks,
    getTasksByPriority,
    removeTaskById,
    printTasks
  };
}

// ------------------- TESTING -------------------
const manager = createTaskManager();

const id1 = manager.addTask("Finish JavaScript worksheet", "high");
const id2 = manager.addTask("Do laundry", "low");
const id3 = manager.addTask("Email lecturer", "medium");
manager.addTask("Buy groceries", "high");

console.log("\nAll tasks (sorted high → low):");
manager.printTasks();

console.log("\nOnly high priority:");
manager.printTasks(manager.getTasksByPriority("high"));

console.log("\nRemove one task:");
manager.removeTaskById(id2);

console.log("\nAll tasks after removal:");
manager.printTasks();

// Prove privacy (these should be undefined):
console.log("\nPrivacy checks:");
console.log("manager.tasks =", manager.tasks);   // undefined
console.log("manager.nextId =", manager.nextId); // undefined

