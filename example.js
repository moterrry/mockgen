const mockgen = require('./index');

console.log('=== Basic Example ===');
const user_schema = {
    name: 'string',
    age: 'number',
    email: 'email',
    is_active: 'boolean'
};

const user = mockgen.generate(user_schema);
console.log('Generated user:', user);

console.log('\n=== Complex Schema Example ===');
const complex_schema = {
    id: 'uuid',
    username: { type: 'string', length: 8 },
    score: { type: 'number', min: 0, max: 1000 },
    tags: { type: 'array', items: 'string', length: 3 },
    profile: {
        type: 'object',
        schema: {
            bio: 'string',
            verified: 'boolean'
        }
    }
};

const complex_data = mockgen.generate(complex_schema);
console.log('Generated complex data:', JSON.stringify(complex_data, null, 2));

console.log('\n=== Generate Many Example ===');
const users = mockgen.generate_many(user_schema, 3);
console.log('Generated 3 users:');
users.forEach((user, index) => {
    console.log(`  User ${index + 1}:`, user);
});

console.log('\n=== Seeded Random Example ===');
mockgen.set_seed(42);
const seeded_data1 = mockgen.generate(user_schema);
console.log('First generation with seed 42:', seeded_data1);

mockgen.set_seed(42);
const seeded_data2 = mockgen.generate(user_schema);
console.log('Second generation with seed 42:', seeded_data2);
console.log('Are they the same?', JSON.stringify(seeded_data1) === JSON.stringify(seeded_data2));
