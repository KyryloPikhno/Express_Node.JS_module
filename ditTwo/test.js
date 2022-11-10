function builder(name, age) {
    return {
        name,
        age,
        show: () => {
            console.log('hi')
        }
    }
}


module.exports = {
    builder
};