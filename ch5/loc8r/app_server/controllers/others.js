/* GET 'about' page */
const about = (req, res) => {
    res.render('generic-text', { title: 'About by 2021810039 오혜경'});
};

module.exports = {
    about
};