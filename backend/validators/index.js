module.exports = (action, isGet) => {
    action = action.split('.');
    const validators = require(`./${action[0]}`);
    return isGet ? {
        query: validators[action[1]]
    } : {
        body: validators[action[1]]
    }
};