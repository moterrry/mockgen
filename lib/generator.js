const random = require('./random');

let global_seed = null;

function set_seed(seed) {
    global_seed = seed;
    random.set_seed(seed);
}

function generate(schema) {
    if (!schema || typeof schema !== 'object') {
        throw new Error('schema must be an object');
    }

    const result = {};

    for (const key in schema) {
        if (schema.hasOwnProperty(key)) {
            result[key] = generate_value(schema[key]);
        }
    }

    return result;
}

function generate_many(schema, count) {
    if (!Number.isInteger(count) || count < 1) {
        throw new Error('count must be a positive integer');
    }

    const results = [];

    for (let i = 0; i < count; i++) {
        results.push(generate(schema));
    }

    return results;
}

function generate_value(type_definition) {
    // handle simple string type definitions
    if (typeof type_definition === 'string') {
        return generate_simple_type(type_definition);
    }

    // handle complex type definitions with options
    if (typeof type_definition === 'object' && type_definition !== null) {
        return generate_complex_type(type_definition);
    }

    throw new Error(`invalid type definition: ${type_definition}`);
}

function generate_simple_type(type_name) {
    switch (type_name) {
        case 'string':
            return random.string();
        case 'number':
            return random.number();
        case 'boolean':
            return random.boolean();
        case 'email':
            return random.email();
        case 'uuid':
            return random.uuid();
        default:
            throw new Error(`unsupported type: ${type_name}`);
    }
}

function generate_complex_type(definition) {
    const type = definition.type;

    if (!type) {
        throw new Error('complex type definition must include a "type" property');
    }

    switch (type) {
        case 'string':
            return random.string(definition.length);

        case 'number':
            const min = definition.min !== undefined ? definition.min : 1;
            const max = definition.max !== undefined ? definition.max : 100;
            return random.number(min, max);

        case 'boolean':
            return random.boolean();

        case 'email':
            return random.email();

        case 'uuid':
            return random.uuid();

        case 'array':
            return generate_array(definition);

        case 'object':
            if (!definition.schema) {
                throw new Error('object type definition must include a "schema" property');
            }
            return generate(definition.schema);

        default:
            throw new Error(`unsupported type: ${type}`);
    }
}

function generate_array(definition) {
    if (!definition.items) {
        throw new Error('array type definition must include an "items" property');
    }

    const length = definition.length !== undefined ? definition.length : 3;
    const result = [];

    for (let i = 0; i < length; i++) {
        result.push(generate_value(definition.items));
    }

    return result;
}

module.exports = {
    generate,
    generate_many,
    set_seed
};
