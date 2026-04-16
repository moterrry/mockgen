const generator = require('./lib/generator');

module.exports = {
    generate: generator.generate,
    generate_many: generator.generate_many,
    set_seed: generator.set_seed
};  
