// ─── 1. VARIABLE TYPES ────────────────────────────────────────────────────────

let username = "Maya";
let age = 28;
let isLoggedIn = true;

// ─── 2. ARRAYS ────────────────────────────────────────────────────────────────

let scores = [90, 85, 78];
let tags = ["react", "typescript", "mobile"];

// ─── 3. UNION TYPES ───────────────────────────────────────────────────────────
// A value that can be one of several types

let id = "abc123";
// id = 42; // should also be valid after conversion

// ─── 4. FUNCTIONS ─────────────────────────────────────────────────────────────

function greet(name) {
  return "Hello, " + name;
}

function logMessage(message) {
  console.log(message);
  // returns nothing — what type is that?
}

const add = (a, b) => a + b;

// ─── 5. OPTIONAL AND DEFAULT PARAMETERS ──────────────────────────────────────

function greetWithTitle(name, title) {
  if (title) {
    return `Hello, ${title} ${name}`;
  }
  return `Hello, ${name}`;
}

function greetWithDefault(name, greeting = "Hello") {
  return `${greeting}, ${name}`;
}

// ─── 6. INTERFACES ────────────────────────────────────────────────────────────

function printUser(user) {
  console.log(`${user.name} — ${user.email}`);
}

const newUser = {
  id: 1,
  name: "Priya",
  email: "priya@example.com",
};

printUser(newUser);

// ─── 7. OPTIONAL PROPERTIES ───────────────────────────────────────────────────

const itemWithDesc = { id: 1, name: "Keyboard", description: "Mechanical" };
const itemWithout  = { id: 2, name: "Mouse" }; // description missing — that's fine

// ─── 8. TYPE ALIASES ──────────────────────────────────────────────────────────

function printCoord(coord) {
  console.log(`x: ${coord.x}, y: ${coord.y}`);
}

printCoord({ x: 10, y: 20 });

// ─── 9. ENUMS ─────────────────────────────────────────────────────────────────

const Role = {
  Admin: "admin",
  Editor: "editor",
  Viewer: "viewer",
};

let currentRole = Role.Admin;
console.log(currentRole);

// ─── 10. GENERICS ─────────────────────────────────────────────────────────────
// A function that works with any type but stays consistent

function identity(arg) {
  return arg;
}

const result1 = identity("hello");
const result2 = identity(42);

// ─── 11. CLASSES ──────────────────────────────────────────────────────────────

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hi, I'm ${this.name}`;
  }
}

const person = new Person("Ana", 25);
console.log(person.greet());

// ─── 12. MODULES ──────────────────────────────────────────────────────────────

function add2(x, y) {
  return x + y;
}

export { add2 };
