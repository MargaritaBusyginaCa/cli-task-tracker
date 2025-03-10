//to-do: add, update, delete, mark-in-progress, mark-done, list

// import the readline module for work with stdin, or stdout.
const readline = require("readline");
// import the fs module to write/read files.
const fs = require("fs");

const prompts = readline.createInterface(process.stdin, process.stdout);
const tasks = JSON.parse(fs.readFileSync("tasks.json")).tasks;

prompts.question("task-cli: ", (response) => {
  const args = response.split(",");
  switch (args[0].toLowerCase()) {
    case "add":
      addTask(args);
      break;
    case "update":
      updateTask(args);
      break;
    case "delete":
      break;
    case "mark-in-progress":
      markProgress(args, "in-progress");
      break;
    case "mark-done":
      markProgress(args, "done");
      break;
    case "list":
      list();
      break;
  }
  process.exit();
});

function addTask(args) {
  const date = new Date();
  const newTask = {
    id: tasks.length,
    description: args[1],
    status: "todo",
    createdAt: date,
    updatedAt: date,
  };
  tasks.push(newTask);
  writeJson();
}

function updateTask(args) {
  const date = new Date();
  for (let task of tasks) {
    if (task.id == args[1]) {
      const updatedTask = {
        ...task,
        description: args[2],
        updatedAt: date,
      };
      tasks[task.id] = updatedTask;
      writeJson();
    }
  }
}

function markProgress(args, status) {
  const date = new Date();
  for (let task of tasks) {
    if (task.id == args[1]) {
      const updatedTask = {
        ...task,
        status: status,
        updatedAt: date,
      };
      tasks[task.id] = updatedTask;
      writeJson();
    }
  }
}

function list() {}

function writeJson() {
  const jsonFile = {
    tasks: tasks,
  };
  let data = JSON.stringify(jsonFile);
  fs.writeFileSync("tasks.json", data);
}
