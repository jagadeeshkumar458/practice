import { InterviewQA } from './types'

export const PYTHON_INTERVIEW_QA: InterviewQA[] = [
  // --- Language basics ---
  {
    id: 'py-int-1',
    category: 'Language basics',
    question: 'What is Python and what kind of language is it?',
    answer:
      'Python is a high-level, interpreted, general-purpose programming language. It is dynamically typed (variable types are checked at runtime, not compile time), garbage-collected, and supports multiple paradigms including procedural, object-oriented, and functional programming.',
  },
  {
    id: 'py-int-2',
    category: 'Language basics',
    question: 'What is the difference between a list and a tuple?',
    answer:
      "Both are ordered sequences, but a `list` is mutable (items can be added, removed, or changed after creation) while a `tuple` is immutable (its contents can't change once created). Tuples are also slightly faster to iterate and can be used as dictionary keys or set members, since they're hashable when their contents are.",
  },
  {
    id: 'py-int-3',
    category: 'Language basics',
    question: 'What is the difference between `is` and `==`?',
    answer:
      '`==` compares values for equality, while `is` compares identity - whether two variables point to the exact same object in memory. Two separate lists with identical contents are `==` but not `is`.',
  },
  {
    id: 'py-int-4',
    category: 'Language basics',
    question: 'What are mutable and immutable types in Python?',
    answer:
      'Mutable types can be changed in place after creation - `list`, `dict`, `set`. Immutable types cannot - `int`, `float`, `str`, `tuple`, `frozenset`, `bool`. This matters for default arguments, dictionary keys (which must be hashable/immutable), and for understanding aliasing bugs when two variables reference the same mutable object.',
  },
  {
    id: 'py-int-5',
    category: 'Language basics',
    question: 'How does Python manage memory?',
    answer:
      "Python uses automatic memory management: a private heap holds all objects, reference counting frees an object as soon as its reference count hits zero, and a cyclic garbage collector periodically cleans up reference cycles that counting alone can't catch (e.g. two objects referencing each other).",
  },
  {
    id: 'py-int-6',
    category: 'Language basics',
    question: 'What is PEP 8?',
    answer:
      "PEP 8 is Python's official style guide - conventions for naming, indentation (4 spaces), line length, whitespace, and import ordering. Following it keeps code consistent and readable across the ecosystem; tools like `flake8` and `black` help enforce it automatically.",
  },

  // --- Functions & scope ---
  {
    id: 'py-int-7',
    category: 'Functions & scope',
    question: 'What is the difference between `*args` and `**kwargs`?',
    answer:
      '`*args` collects any number of extra positional arguments into a tuple; `**kwargs` collects any number of extra keyword arguments into a dict. They let a function accept a flexible, unknown-in-advance number of arguments, e.g. `def f(*args, **kwargs): ...`.',
  },
  {
    id: 'py-int-8',
    category: 'Functions & scope',
    question: 'What is a lambda function, and when would you use one?',
    answer:
      'A `lambda` is a small anonymous function defined inline, limited to a single expression, e.g. `square = lambda x: x * x`. They\'re typically used for short throwaway functions passed to things like `sorted(key=...)`, `map()`, or `filter()`, where defining a full `def` would be overkill.',
  },
  {
    id: 'py-int-9',
    category: 'Functions & scope',
    question: 'What does the `global` keyword do?',
    answer:
      "Inside a function, assigning to a variable creates a new local variable by default, even if a same-named variable exists at module scope. `global x` tells Python that assignments to `x` inside the function should modify the module-level variable instead of shadowing it locally.",
  },
  {
    id: 'py-int-10',
    category: 'Functions & scope',
    question: 'What is a closure?',
    answer:
      "A closure is a function that captures and remembers variables from its enclosing scope, even after that outer function has returned. It's how you get a function with private, persistent state without using a class, e.g. a counter function that increments a variable defined in its enclosing scope.",
  },
  {
    id: 'py-int-11',
    category: 'Functions & scope',
    question: "Why is using a mutable default argument (like `def f(x=[])`) dangerous?",
    answer:
      "Default argument values are evaluated once, when the function is defined, not each time it's called. If the default is a mutable object like a list, every call that doesn't pass its own argument shares and mutates the same list, causing state to leak between unrelated calls. The fix is to default to `None` and create a new list inside the function body.",
  },

  // --- OOP ---
  {
    id: 'py-int-12',
    category: 'Object-oriented Python',
    question: 'What is `self` and why does every method need it?',
    answer:
      "`self` is the conventional name for a method's first parameter, and it refers to the instance the method was called on. Python passes it automatically (`obj.method(a)` is really `Class.method(obj, a)`), which is how a method reads and modifies that specific instance's attributes.",
  },
  {
    id: 'py-int-13',
    category: 'Object-oriented Python',
    question: 'What is the difference between `__str__` and `__repr__`?',
    answer:
      '`__str__` returns a readable string meant for end users (used by `print()` and `str()`). `__repr__` returns an unambiguous, developer-facing representation (used by `repr()` and the interactive shell), ideally one that could recreate the object. If `__str__` is missing, Python falls back to `__repr__`.',
  },
  {
    id: 'py-int-14',
    category: 'Object-oriented Python',
    question: 'What is inheritance and what does `super()` do?',
    answer:
      "Inheritance lets a class (the child/subclass) reuse and extend the attributes and methods of another class (the parent/superclass), e.g. `class Dog(Animal):`. `super()` gives access to the parent class's methods from within the child, most commonly to call the parent's `__init__` before adding the child's own setup.",
  },
  {
    id: 'py-int-15',
    category: 'Object-oriented Python',
    question: 'What is encapsulation, and how does Python implement it?',
    answer:
      "Encapsulation means restricting direct access to an object's internal data. Python has no true `private` keyword; by convention a single leading underscore (`_x`) marks an attribute as \"internal, please don't touch,\" and a double leading underscore (`__x`) triggers name mangling (`_ClassName__x`), making accidental external access or subclass collisions harder.",
  },
  {
    id: 'py-int-16',
    category: 'Object-oriented Python',
    question: 'What is polymorphism in Python?',
    answer:
      "Polymorphism means the same method name behaves differently depending on the object it's called on. Since Python is dynamically typed, this often needs no special syntax: any object with a `.speak()` method can be used interchangeably in code that calls `.speak()`, regardless of its class - this is sometimes called \"duck typing.\"",
  },
  {
    id: 'py-int-17',
    category: 'Object-oriented Python',
    question: 'What are magic (dunder) methods? Name a few.',
    answer:
      'Magic methods are special methods surrounded by double underscores that let a class hook into built-in Python syntax and functions. `__init__` runs on creation, `__str__`/`__repr__` control printing, `__len__` backs `len(obj)`, `__eq__` backs `==`, `__add__` backs `+`, and `__call__` lets an instance be called like a function.',
  },

  // --- Data structures ---
  {
    id: 'py-int-18',
    category: 'Data structures',
    question: 'When would you use a set instead of a list?',
    answer:
      'A `set` stores unique, unordered items and gives O(1) average membership testing (`x in my_set`) versus O(n) for a list, plus built-in operations like union, intersection, and difference. Use it when you need uniqueness or fast lookups and don\'t care about order or duplicates.',
  },
  {
    id: 'py-int-19',
    category: 'Data structures',
    question: 'What is a dictionary comprehension?',
    answer:
      'A concise way to build a `dict` from an iterable in one line, e.g. `{x: x*x for x in range(5)}`. Like list comprehensions, it can include a condition, e.g. `{k: v for k, v in items if v > 0}`.',
  },
  {
    id: 'py-int-20',
    category: 'Data structures',
    question: 'What makes an object hashable, and why does it matter for dictionary keys?',
    answer:
      'An object is hashable if it has a `__hash__` value that never changes during its lifetime, which is why dictionary keys and set members must be immutable types like `str`, `int`, or `tuple` (of hashable items) - mutable types like `list` and `dict` are unhashable and can\'t be used as keys.',
  },
  {
    id: 'py-int-21',
    category: 'Data structures',
    question: 'What is list slicing, and what does `my_list[::-1]` do?',
    answer:
      'Slicing extracts a sub-sequence with `list[start:stop:step]`, where any part can be omitted. `my_list[::-1]` omits start and stop (meaning "the whole list") and uses a step of `-1`, which walks backward - the idiomatic way to reverse a list or string without a loop.',
  },

  // --- Error handling ---
  {
    id: 'py-int-22',
    category: 'Error handling',
    question: 'What is the purpose of `try`/`except`/`finally`?',
    answer:
      '`try` wraps code that might raise an exception; `except` catches and handles specific exception types so the program doesn\'t crash; `finally` runs regardless of whether an exception occurred, typically used for cleanup like closing a file or connection.',
  },
  {
    id: 'py-int-23',
    category: 'Error handling',
    question: 'Why is `except:` with no exception type considered bad practice?',
    answer:
      "A bare `except:` catches everything, including `KeyboardInterrupt` and `SystemExit`, and silently hides bugs you didn't anticipate (like a typo causing a `NameError`). It's better to catch specific exception types (`except ValueError:`) so unexpected errors still surface.",
  },
  {
    id: 'py-int-24',
    category: 'Error handling',
    question: 'What is the difference between an exception and a syntax error?',
    answer:
      "A syntax error means the code isn't valid Python at all and fails before execution even begins (e.g. a missing colon). An exception occurs while otherwise-valid code is running, when something goes wrong at runtime, like dividing by zero or accessing a missing dictionary key - and can be caught with `try`/`except`.",
  },

  // --- Iterators, generators & comprehensions ---
  {
    id: 'py-int-25',
    category: 'Iterators & generators',
    question: 'What is the difference between a list comprehension and a generator expression?',
    answer:
      'A list comprehension `[x*x for x in range(10)]` builds the entire list in memory immediately. A generator expression `(x*x for x in range(10))` produces items lazily, one at a time, on demand - far more memory-efficient for large or infinite sequences, at the cost of only being iterable once.',
  },
  {
    id: 'py-int-26',
    category: 'Iterators & generators',
    question: 'What does the `yield` keyword do?',
    answer:
      "`yield` turns a function into a generator. Instead of returning once and exiting, the function pauses at each `yield`, returns a value to the caller, and resumes exactly where it left off - including all local state - the next time a value is requested.",
  },
  {
    id: 'py-int-27',
    category: 'Iterators & generators',
    question: 'What is the difference between an iterable and an iterator?',
    answer:
      "An iterable is anything you can loop over - it implements `__iter__()`, which returns an iterator. An iterator implements both `__iter__()` and `__next__()`, and tracks its own position, producing the next value each time `__next__()` is called until it raises `StopIteration`. A list is iterable but is not itself an iterator; `iter(my_list)` produces one.",
  },

  // --- Modules & tooling ---
  {
    id: 'py-int-28',
    category: 'Modules & tooling',
    question: 'What is a virtual environment, and why use one?',
    answer:
      "A virtual environment (`python -m venv myenv`) is an isolated Python installation with its own site-packages directory. It keeps a project's dependencies separate from the system Python and from other projects, avoiding version conflicts between packages that different projects require.",
  },
  {
    id: 'py-int-29',
    category: 'Modules & tooling',
    question: 'What is the difference between `import module` and `from module import name`?',
    answer:
      '`import module` brings in the whole module, and its contents are accessed with a `module.` prefix. `from module import name` pulls a specific name directly into the current namespace, so it can be used without the prefix - convenient, but can cause naming collisions if not used carefully.',
  },
  {
    id: 'py-int-30',
    category: 'Modules & tooling',
    question: "What does `if __name__ == \"__main__\":` do, and why is it used?",
    answer:
      "When a file is run directly, Python sets its `__name__` to `\"__main__\"`; when it's imported as a module from elsewhere, `__name__` is set to the module's own name instead. Guarding code with this check lets a file be both a reusable importable module and a runnable script, without the script portion executing on import.",
  },
]
