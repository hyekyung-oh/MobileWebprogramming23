/* GET homepage */
const index = (req, res) => {
    res.render('index', { title: 'Express by 2021810039 오혜경 '})
};

module.exports = {
    index
};