import { InterviewQA } from './types'

export const TYPESCRIPT_INTERVIEW_QA: InterviewQA[] = [
  // --- Language basics ---
  {
    id: 'ts-int-1',
    category: 'Language basics',
    question: 'What is TypeScript, and how does it relate to JavaScript?',
    answer:
      'TypeScript is a superset of JavaScript that adds static typing. Every valid JavaScript program is also valid TypeScript, and TypeScript code compiles ("transpiles") down to plain JavaScript before it runs - browsers and Node.js never execute TypeScript directly.',
  },
  {
    id: 'ts-int-2',
    category: 'Language basics',
    question: 'Why would a team choose TypeScript over plain JavaScript?',
    answer:
      "TypeScript catches type-related bugs at compile time instead of at runtime - a typo'd property name or a function called with the wrong argument type is flagged before the code ever ships. It also gives editors much richer autocomplete, inline documentation, and safer refactoring, since the tooling actually understands the shape of your data.",
  },
  {
    id: 'ts-int-3',
    category: 'Language basics',
    question: 'What is type inference in TypeScript?',
    answer:
      "TypeScript can often figure out a variable's type from its initial value without an explicit annotation - `let count = 5` is inferred as `number` automatically. Explicit annotations (`let count: number`) are mainly needed when a value's type can't be inferred, like an empty array or a function parameter.",
  },
  {
    id: 'ts-int-4',
    category: 'Language basics',
    question: 'What does the `tsc` command do, and what is `tsconfig.json` for?',
    answer:
      '`tsc` is the TypeScript compiler - it type-checks your code and emits plain JavaScript. `tsconfig.json` configures that process: which files to include, the JS version to target, how strict the type checking should be, and where to output the compiled files.',
  },

  // --- The type system ---
  {
    id: 'ts-int-5',
    category: 'The type system',
    question: 'What is the difference between `interface` and `type`?',
    answer:
      "Both describe the shape of an object and are largely interchangeable for that. `interface` can be reopened later and extended by declaring it again (declaration merging) and is generally preferred for public object/class shapes. `type` can alias any type - unions, tuples, primitives - not just object shapes, so it's more flexible when you need something an interface can't express.",
  },
  {
    id: 'ts-int-6',
    category: 'The type system',
    question: 'What is the difference between `any` and `unknown`?',
    answer:
      "`any` turns off type checking entirely for that value - you can call any method or access any property on it with no safety net. `unknown` also accepts any value, but you can't do anything with it until you narrow its type first (e.g. with a `typeof` check), so it keeps you honest while still being flexible.",
  },
  {
    id: 'ts-int-7',
    category: 'The type system',
    question: 'What is a union type?',
    answer:
      "A union type (`string | number`) means a value can be one of several types. TypeScript only lets you use members common to all types in the union unless you first narrow it down (e.g. with `typeof x === 'string'`) to a specific member.",
  },
  {
    id: 'ts-int-8',
    category: 'The type system',
    question: 'What is a literal type?',
    answer:
      'A literal type narrows a primitive down to one specific value, like `type Direction = "up" | "down"` instead of just `string`. It\'s how TypeScript models things like a fixed set of allowed strings or numbers, catching typos like `"dwon"` at compile time.',
  },
  {
    id: 'ts-int-9',
    category: 'The type system',
    question: 'What are generics, and why are they useful?',
    answer:
      "Generics let a function, class, or type work with a type that's specified later, at the call site, rather than a fixed one, e.g. `function identity<T>(value: T): T`. They let you write reusable code that still keeps full type safety, instead of falling back to `any` to handle multiple types.",
  },
  {
    id: 'ts-int-10',
    category: 'The type system',
    question: 'What does the `keyof` operator do?',
    answer:
      '`keyof` takes an object type and produces a union of its property names as string literal types. For an interface `{ name: string; age: number }`, `keyof Person` is `"name" | "age"` - commonly used to type a function that safely accesses a property by name.',
  },
  {
    id: 'ts-int-11',
    category: 'The type system',
    question: 'What is a type guard?',
    answer:
      "A type guard is a check (like `typeof x === 'number'`, `x instanceof Foo`, or a custom function returning `x is Foo`) that lets TypeScript narrow a broader type down to a more specific one within a conditional block, so code inside that block can safely use members only that narrower type has.",
  },
  {
    id: 'ts-int-12',
    category: 'The type system',
    question: 'What are utility types like `Partial<T>` and `Pick<T, K>` for?',
    answer:
      "Utility types transform an existing type into a new one without redeclaring it by hand. `Partial<T>` makes every property optional (handy for update functions that only change some fields), and `Pick<T, K>` builds a new type containing only the listed keys of `T`. TypeScript ships several of these (`Readonly`, `Record`, `Omit`, etc.) for common shape transformations.",
  },
  {
    id: 'ts-int-13',
    category: 'The type system',
    question: 'What is the difference between a tuple and an array in TypeScript?',
    answer:
      'An array type (`number[]`) describes a list of unspecified length where every element is the same type. A tuple type (`[string, number]`) describes a fixed-length list where each position has its own specific type - useful for things like a `[key, value]` pair.',
  },

  // --- Functions & classes ---
  {
    id: 'ts-int-14',
    category: 'Functions & classes',
    question: 'How do you type a function parameter as optional, and how is that different from allowing `undefined`?',
    answer:
      "`function f(x?: number)` makes the argument optional - callers may omit it entirely. `function f(x: number | undefined)` requires the argument to be passed, but its value may be `undefined`. Optional parameters must also come after required ones in the parameter list.",
  },
  {
    id: 'ts-int-15',
    category: 'Functions & classes',
    question: 'What access modifiers does TypeScript add to classes, and what do they do?',
    answer:
      '`public` (the default) is accessible from anywhere, `private` only from inside the declaring class, and `protected` from the declaring class and its subclasses. These are compile-time checks only - unlike some languages, they don\'t change how the property is stored or accessed once compiled to plain JavaScript.',
  },
  {
    id: 'ts-int-16',
    category: 'Functions & classes',
    question: 'What does implementing an interface on a class mean?',
    answer:
      "`class Car implements Drivable` tells TypeScript that `Car` must provide every property and method `Drivable` declares, and the compiler will error if it doesn't. Unlike `extends`, `implements` contributes no actual implementation - the class must supply its own.",
  },
  {
    id: 'ts-int-17',
    category: 'Functions & classes',
    question: 'What are decorators, and what are they typically used for?',
    answer:
      "Decorators are functions prefixed with `@` that attach to a class, method, property, or parameter to modify or annotate it, e.g. `@Component(...)` in Angular. They're commonly used for cross-cutting concerns like logging, dependency injection, and framework metadata, letting that logic live in one reusable decorator instead of being repeated everywhere.",
  },

  // --- Practical / tooling ---
  {
    id: 'ts-int-18',
    category: 'Practical & tooling',
    question: 'What is a `.d.ts` file?',
    answer:
      "A declaration file contains only type information - no runtime code - describing the shape of an existing JavaScript library so TypeScript can type-check code that uses it. Many popular packages ship their own; for ones that don't, the community-maintained DefinitelyTyped project (`@types/...` packages) fills the gap.",
  },
  {
    id: 'ts-int-19',
    category: 'Practical & tooling',
    question: "What does TypeScript's `strict` compiler flag do?",
    answer:
      "`strict` is a bundle of stricter type-checking flags turned on together - including `strictNullChecks` (so `null`/`undefined` aren't silently assignable to every type), `noImplicitAny`, and others. Enabling it catches significantly more real bugs, and it's strongly recommended for any serious project, ideally from the very start.",
  },
  {
    id: 'ts-int-20',
    category: 'Practical & tooling',
    question: "What is 'type casting' (or type assertion) in TypeScript, and when is it appropriate?",
    answer:
      "`value as Type` tells the compiler to treat a value as a more specific type than it inferred, without changing anything at runtime - it's a promise to the compiler, not a real conversion. It's appropriate when you genuinely know more about a value's type than TypeScript can infer (e.g. the result of `document.getElementById`), and risky otherwise, since an incorrect assertion silences a real error instead of fixing it.",
  },
  {
    id: 'ts-int-21',
    category: 'Practical & tooling',
    question: 'How does TypeScript handle `null` and `undefined` differently when `strictNullChecks` is on?',
    answer:
      "With `strictNullChecks` enabled, `null` and `undefined` are not automatically part of every type - a variable typed `string` cannot hold `null` unless its type explicitly says `string | null`. This forces code that might handle a missing value to check for it deliberately, catching a very common class of runtime bugs at compile time.",
  },
  {
    id: 'ts-int-22',
    category: 'Practical & tooling',
    question: 'What are namespaces, and why are ES modules generally preferred over them today?',
    answer:
      "Namespaces (`namespace Shapes { ... }`) were TypeScript's original way to organize and avoid naming collisions in code before ES modules were standardized. Modern TypeScript and JavaScript tooling is built around ES modules (`import`/`export`) instead, which work natively in browsers and Node and integrate with the wider JS ecosystem, so namespaces are now mostly seen in older codebases or specific declaration-file scenarios.",
  },
  {
    id: 'ts-int-23',
    category: 'Practical & tooling',
    question: "What's the difference between 'structural typing' in TypeScript and the nominal typing found in languages like Java?",
    answer:
      "TypeScript uses structural typing: two types are compatible if they have the same shape, regardless of their declared names - an object literal with `{ name, age }` satisfies a `Person` interface with those same fields even if it was never explicitly declared as a `Person`. Nominal typing (as in Java or C#) instead requires an explicit declaration that a type implements or extends another, even if the shapes match.",
  },
]
