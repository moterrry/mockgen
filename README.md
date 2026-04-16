# mockgen

A simple, zero-dependency Node.js library for generating realistic fake JSON data for API testing.

## Features

- **Schema-based generation** - define your data structure, get fake data back
- **No external dependencies** - pure vanilla JavaScript
- **Simple and readable** - designed to be understood and extended
- **Flexible type system** - supports strings, numbers, booleans, emails, UUIDs, arrays, and nested objects
- **Optional seeding** - generate repeatable fake data for tests
- **Generate batches** - create multiple fake objects at once

## Installation

Clone or copy the library into your project:

```bash
npm install mockgen
```

Or add it as a local dependency in your `package.json`:

```json
"dependencies": {
  "mockgen": "file:./mockgen"
}
```

## Quick Start

```javascript
const mockgen = require('mockgen');

const user = mockgen.generate({
  name: 'string',
  age: 'number',
  email: 'email',
  is_active: 'boolean'
});

console.log(user);
// Output:
// {
//   name: 'johndoe',
//   age: 42,
//   email: 'alice@gmail.com',
//   is_active: true
// }
```

## Supported Data Types

### Simple Types (string notation)

- `'string'` - random lowercase word (5-12 chars)
- `'number'` - random integer (1-100)
- `'boolean'` - random true/false
- `'email'` - random realistic email
- `'uuid'` - random UUID v4 format string

### Complex Types (object notation)

Define types with options using an object:

```javascript
{
  type: 'string',
  length: 10  // exact length
}

{
  type: 'number',
  min: 10,
  max: 50
}

{
  type: 'array',
  items: 'string',    // type of array items
  length: 3           // array length
}

{
  type: 'object',
  schema: { /* nested schema */ }
}
```

## Examples

### Basic Schema

```javascript
const mockgen = require('mockgen');

const user_schema = {
  name: 'string',
  age: 'number',
  email: 'email'
};

const user = mockgen.generate(user_schema);
```

### Complex Schema

```javascript
const product_schema = {
  id: 'uuid',
  name: { type: 'string', length: 15 },
  price: { type: 'number', min: 10, max: 500 },
  in_stock: 'boolean',
  tags: {
    type: 'array',
    items: 'string',
    length: 4
  },
  seller: {
    type: 'object',
    schema: {
      name: 'string',
      rating: { type: 'number', min: 1, max: 5 }
    }
  }
};

const product = mockgen.generate(product_schema);
```

### Generate Multiple

```javascript
const users = mockgen.generate_many({
  name: 'string',
  email: 'email'
}, 10);  // generates 10 users
```

### Seeded Generation (Repeatable)

```javascript
mockgen.set_seed(42);
const user1 = mockgen.generate({ name: 'string', age: 'number' });

mockgen.set_seed(42);
const user2 = mockgen.generate({ name: 'string', age: 'number' });

// user1 and user2 are identical
```

## API Reference

### `generate(schema)`

Generates a single fake object based on the provided schema.

**Parameters:**
- `schema` (object) - schema definition

**Returns:** generated object

### `generate_many(schema, count)`

Generates multiple fake objects.

**Parameters:**
- `schema` (object) - schema definition
- `count` (number) - how many objects to generate

**Returns:** array of generated objects

### `set_seed(seed)`

Sets a seed for repeatable random generation.

**Parameters:**
- `seed` (number) - seed value

## Running Examples

```bash
node example.js
```

This will demonstrate:
- Basic generation
- Complex nested schemas
- Batch generation
- Seeded generation

## Project Structure

```
mockgen/
├── index.js           # main entry point
├── lib/
│   ├── generator.js   # core generation logic
│   └── random.js      # random utility functions
├── example.js         # usage examples
├── package.json
└── README.md
```

## Design Philosophy

- **Simple over clever** - code is readable, not optimized
- **Extensible** - easy to add new types
- **Zero dependencies** - pure Node.js
- **Developer tool** - built for testing, not production
- **Lowercase conventions** - consistent with specified style

## License

MIT
