// import the readline module for work with stdin, or stdout.
const readline = require("readline");
// import the fs module to write/read files.
const fs = require("fs");

const rl = readline.createInterface(process.stdin, process.stdout);
let tasks = JSON.parse(fs.readFileSync("tasks.json")).tasks;

let recursiveAsyncReadLine = function () {
  rl.question("task-cli: ", (response) => {
    const args = response.split(",");
    if (response == "exit") {
      return rl.close();
    } else {
      switch (args[0].toLowerCase()) {
        case "add":
          addTask(args);
          break;
        case "update":
          updateTask(args);
          break;
        case "delete":
          deleteTask(args);
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
      recursiveAsyncReadLine();
    }
  });
};
recursiveAsyncReadLine();

function addTask(args) {
  const date = new Date();
  const newTask = {
    id: tasks.length + 1,
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
  const taskIndex = findTaskIndex(args[1]);
  const updatedTask = {
    ...tasks[taskIndex],
    description: args[2],
    updatedAt: date,
  };
  tasks[taskIndex] = updatedTask;
  writeJson();
}

function markProgress(args, status) {
  const date = new Date();
  const taskIndex = findTaskIndex(args[1]);
  const updatedTask = {
    ...tasks[taskIndex],
    status: status,
    updatedAt: date,
  };
  tasks[taskIndex] = updatedTask;
  writeJson();
}

function deleteTask(args) {
  const taskIndex = findTaskIndex(args[1]);
  tasks.splice(taskIndex, 1);
  writeJson();
}

function list() {
  console.log(tasks);
}

function writeJson() {
  const jsonFile = {
    tasks: tasks,
  };
  let data = JSON.stringify(jsonFile);
  fs.writeFileSync("tasks.json", data);
}

function findTaskIndex(taskId) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == taskId) {
      return i;
    }
  }
}
