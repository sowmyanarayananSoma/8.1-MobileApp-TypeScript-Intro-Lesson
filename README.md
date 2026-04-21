# Mobile Development Lesson 1 — Concept Reference
> Mobile Considerations · Native vs Cross-Platform · React Native · Expo · TypeScript

---

## 1. Designing for Mobile

Web and mobile apps run on the same underlying technologies but demand different thinking. Building for mobile means revisiting assumptions you make when building for a browser.

### Screen size

Mobile screens are small and held in portrait orientation by default. A layout that works at 1440px will break, overflow, or become unusable at 390px. Mobile development requires designing for small screens first, then scaling up — not the other way around.

Key consequences:
- Navigation menus that work as a top bar on desktop become bottom tab bars or slide-out drawers on mobile
- Forms that span multiple columns collapse to single columns
- Text that's readable at 16px on a large screen may need to scale with the device's font size settings

### Input method

Desktop users click with a mouse. Mobile users tap with a finger. This changes how you think about interactive elements:

- Touch targets need to be large enough to tap accurately — Apple and Google both recommend a minimum of 44×44 points
- Hover states don't exist on touchscreens — any UI pattern that relies on hover needs a mobile alternative
- Gestures (swipe, pinch-to-zoom, long press) are available on mobile and not on desktop

### Accessibility

Both iOS and Android have built-in screen readers (VoiceOver and TalkBack respectively). Mobile OS settings also let users increase font size beyond what you set in code. Your app needs to handle these gracefully:

- Text that is set in fixed pixel sizes will not scale with the user's font size preference
- Interactive elements need accessible labels so screen readers can describe them
- Color contrast requirements apply on mobile just as on web

### Performance

Mobile CPUs and memory are more constrained than laptops and desktops. An animation or computation that runs smoothly in a browser on a MacBook may stutter on a mid-range Android phone. Mobile development means being more deliberate about what you run and when.

---

## 2. Native vs. Cross-Platform Development

There are two broad approaches to building mobile apps.

### Native development

You write separate codebases for each platform using the tools and languages that platform provides natively:

| Platform | Language | IDE |
|---|---|---|
| iOS | Swift (or Objective-C) | Xcode (macOS only) |
| Android | Kotlin (or Java) | Android Studio |

**Swift** is Apple's native language for iOS. It's fast, modern, and designed specifically for Apple platforms — new iOS features are available immediately upon OS release, with seamless access to all Apple APIs.

**Kotlin** is the modern language for Android, developed by JetBrains and officially backed by Google. It replaced Java as the preferred Android language — it's more concise, and any existing Java code in a project remains interoperable.

**Advantages:** Best possible performance. Full access to every platform feature the moment it ships. Used heavily at large companies where separate iOS and Android teams are standard.

**Disadvantages:** Two codebases, two teams, twice the maintenance cost. A feature change has to be implemented twice.

### Cross-platform development

You write one codebase that compiles or runs on both platforms:

| Framework | Language | Made by |
|---|---|---|
| React Native | JavaScript / TypeScript | Meta |
| Flutter | Dart | Google |
| Ionic | HTML, CSS, JS | Ionic team |

**Advantages:** One codebase, one team. Faster to build and maintain. More realistic for small companies and indie developers.

**Disadvantages:** You may hit limitations when you need deep platform-specific features. Performance can lag behind native in complex scenarios.

**Flutter** uses Google's Dart language and compiles to native code. Its standout feature is a rich set of customizable UI widgets and a fast hot-reload development cycle. That said, Dart is not widely used outside Flutter, and Flutter's ecosystem is smaller than React Native's — this can make troubleshooting harder when you run into edge cases.

**React Native** uses JavaScript and React. Of the three options here it has the weakest raw performance, but that rarely matters in practice — major apps including Facebook, Instagram, and Shopify ship on React Native. Its biggest advantage for you specifically is that you already know React.

### Which one to learn?

React Native is the most practical starting point for JavaScript developers for two reasons. First, it uses the same concepts you already know from React — components, JSX, props, hooks, state. Second, cross-platform roles are more accessible for junior developers, particularly at startups and mid-sized companies where separate native teams are not justified by the team size.

---

## 3. React Native

React Native lets you build mobile apps using React. The component model, hooks, and data flow are identical to what you've been doing. What changes is the output — instead of rendering HTML elements in a browser, React Native renders native UI components provided by the operating system.

### What changes from React

| React (web) | React Native |
|---|---|
| `<div>` | `<View>` |
| `<p>`, `<h1>` | `<Text>` |
| `<img>` | `<Image>` |
| `<input>` | `<TextInput>` |
| `<button>` | `<TouchableOpacity>` or `<Pressable>` |
| CSS files / Tailwind | `StyleSheet.create({})` |

### What stays the same

- `useState`, `useEffect`, `useContext`, and all other hooks
- Props and component composition
- `fetch` and async data loading
- `react-navigation` replaces React Router but follows the same mental model

### A basic component

```jsx
import { View, Text, StyleSheet } from 'react-native';

function Greeting({ name }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello, {name}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

Notice that styles are written as JavaScript objects, not CSS strings. `StyleSheet.create()` is a performance optimization — it validates your styles and sends them to the native layer more efficiently than plain objects.

---

## 4. Expo

Expo is a framework and toolchain built on top of React Native. It handles a large amount of the configuration that is otherwise complex and error-prone in a bare React Native project.

### What Expo gives you

**Ease of use.** You can start a project without touching any native iOS or Android configuration. Expo manages that layer for you.

**Expo Go.** Instead of building and compiling an app binary every time you want to test, you install the Expo Go app on your phone and scan a QR code. Your app loads instantly. Expo Go is available on both the **App Store (iOS)** and **Google Play (Android)** — any student with a phone can use it regardless of what OS their laptop runs.

**Managed workflow.** Expo handles build configuration, app store submission tooling, and over-the-air updates without requiring you to open Xcode or Android Studio.

**Native API access.** The Expo SDK provides JavaScript APIs for device hardware — camera, push notifications, sensors, location — without writing any native code.

**Ejecting.** If you eventually need something the Expo SDK doesn't cover, you can eject to a bare workflow that gives you full native control while keeping your existing project structure.

### Expo vs. bare React Native

| | Bare React Native | Expo (Managed) |
|---|---|---|
| Setup complexity | High — requires Xcode and/or Android Studio configured correctly | Low — `npx create-expo-app` and you're running |
| Access to native modules | Full | Via Expo SDK; covers ~90% of common needs |
| Ejecting | N/A | Possible if you outgrow the managed workflow |
| Good for | Teams with dedicated native engineers | Learning, prototyping, and most production apps |

For this course, Expo is the right choice. It gets you running on a real device in minutes and provides access to device hardware (camera, sensors, notifications) without requiring native configuration.

### Setting up

**1. Install Expo CLI**

```bash
npm install -g expo-cli
```

**2. Create a project**

```bash
npx create-expo-app my-app
cd my-app
npx expo start
```

**3. Run on your device**

Install **Expo Go** from the App Store or Google Play, then scan the QR code that appears in the terminal. Your app opens on your phone instantly.

**4. VS Code extension**

Install the **Expo Tools** extension (`expo.vscode-expo-tools`) for autocomplete, error highlighting, and integration with the Expo CLI directly from VS Code.

### OS and simulator compatibility

| Your machine | Can run |
|---|---|
| macOS | iOS Simulator, Android Emulator, physical device (both) |
| Windows | Android Emulator, physical Android device |
| Windows | ❌ iOS Simulator — not supported |

If you're on Windows and need to test on iOS, use a physical iPhone. If you don't have one, test on Android and note any iOS-specific differences.

> **For next lesson:** Download Xcode (macOS) and/or Android Studio now — the setup takes time and you'll need them to use the simulators.

---

## 5. TypeScript

TypeScript is a superset of JavaScript. Every valid JavaScript file is also valid TypeScript. The additions TypeScript makes are **type annotations** — a way to declare what kind of data a variable, function parameter, or return value is expected to be.

The browser never sees TypeScript. Before your code runs, it is compiled back to plain JavaScript. The types only exist during development.

### Why TypeScript?

Types let your editor and the compiler catch mistakes before your code runs.

```ts
function double(n: number): number {
  return n * 2;
}

double("hello"); // ❌ Error caught at compile time, not at runtime
```

Without TypeScript, this error would only appear when the function actually runs — and only if you notice the wrong output. With TypeScript, it's flagged immediately in your editor.

In React Native development, TypeScript is the default — `create-expo-app` generates TypeScript files by default, and most of the ecosystem's documentation is written in TypeScript.

### Basic type annotations

```ts
// Primitive types
let name: string = "Amara";
let age: number = 28;
let isActive: boolean = true;

// Arrays
let scores: number[] = [85, 90, 78];
let tags: string[] = ["react", "typescript"];

// Union types — when a value can be one of several types
let id: string | number = "abc123";
id = 42; // also valid
```

### Functions

```ts
// Parameters and return type
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const greet = (name: string): string => {
  return `Hello, ${name}`;
};

// void — when a function returns nothing
function logMessage(message: string): void {
  console.log(message);
}
```

### Interfaces

An interface defines the shape of an object — what properties it has and what type each one is.

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

function printUser(user: User): void {
  console.log(`${user.name} — ${user.email}`);
}

const newUser: User = {
  id: 1,
  name: "Priya",
  email: "priya@example.com",
};
```

If you pass an object that's missing a required field, or has a field of the wrong type, TypeScript catches it immediately.

### Optional properties

Not every field is always required. Mark optional properties with `?`:

```ts
interface Product {
  id: number;
  name: string;
  description?: string; // may or may not be present
}

const item: Product = { id: 1, name: "Keyboard" }; // valid — description is optional
```

### TypeScript vs JavaScript — side by side

```js
// JavaScript
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}
```

```ts
// TypeScript
interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

function calculateTotal(items: CartItem[]): number {
  let total: number = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}
```

The logic is identical. TypeScript adds the interface definition and type annotations. The compiled output is the JavaScript version — the types are erased.

### TypeScript in React Native

Props and state are typed the same way:

```tsx
interface GreetingProps {
  name: string;
  age?: number;
}

function Greeting({ name, age }: GreetingProps) {
  return (
    <View>
      <Text>Hello, {name}</Text>
      {age && <Text>Age: {age}</Text>}
    </View>
  );
}
```

`useState` infers types automatically from the initial value, but you can be explicit:

```ts
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
```

---

## Quick Reference

### React Native — common components

| Component | Use for |
|---|---|
| `<View>` | Layout container (like `<div>`) |
| `<Text>` | Any visible text — required wrapper for all strings |
| `<Image>` | Displaying images |
| `<TextInput>` | Text input fields |
| `<ScrollView>` | Scrollable container for a small number of items |
| `<FlatList>` | Performant list rendering for large datasets |
| `<Pressable>` | Any tappable element |

### TypeScript — syntax cheat sheet

| Concept | JavaScript | TypeScript |
|---|---|---|
| Variable declaration | `let variable = "string";` | `let variable: string = "string";` |
| Constant | `const x = 42;` | `const x: number = 42;` |
| Boolean | | `let isDone: boolean = false;` |
| Number | | `let decimal: number = 6;` |
| String | | `let color: string = "blue";` |
| Array | | `let list: number[] = [1, 2, 3];` |
| Tuple | | `let pair: [string, number] = ["hello", 10];` |
| Enum | | `enum Color { Red, Green, Blue }` |
| Function | `function greet(name) { ... }` | `function greet(name: string): string { ... }` |
| Arrow function | `const add = (a, b) => a + b;` | `const add = (a: number, b: number): number => a + b;` |
| Optional parameter | | `function greet(name: string, greeting?: string): string { ... }` |
| Default parameter | | `function greet(name: string, greeting: string = "Hello"): string { ... }` |
| Interface | | `interface Person { name: string; age: number; }` |
| Type alias | | `type Person = { name: string; age: number; };` |
| Class | `class Person { constructor(name, age) { ... } }` | `class Person { name: string; age: number; constructor(name: string, age: number) { ... } }` |
| Class method | `greet() { return \`Hello, ${this.name}\`; }` | `greet(): string { return \`Hello, ${this.name}\`; }` |
| Inheritance | | `class Employee extends Person { employeeId: number; ... }` |
| Generics | | `function identity<T>(arg: T): T { return arg; }` |
| Module export | | `export function add(x: number, y: number): number { return x + y; }` |
| Module import | | `import { add } from './math';` |
