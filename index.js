//to-do: add, update, delete, mark-in-progress, mark done

// import the readline module for work with stdin, or stdout.
const readline = require("readline");

const prompts = readline.createInterface(process.stdin, process.stdout);

prompts.question("What day is it today?: ", (response) => {
  const args = response.split(" ");
  console.log(args[0]);
  console.log(args[1]);

  if (
    response.toLowerCase() === "saturday" ||
    response.toLowerCase() === "sunday"
  ) {
    console.log("happy weekend");
  } else {
    console.log("happy workday");
  }
  process.exit();
});
