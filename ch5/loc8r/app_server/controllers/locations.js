/* GET 'home' page */
const homelist = (req, res) => {
    res.render('locations-list', { title: 'Home by 2021810039 오혜경'});
};

/* GET 'Location info' page */
const locationInfo = (req, res) => {
    res.render('location-info', { title: 'Location info by 2021810039 오혜경'});
};

/* GET 'Add review' page */
const addReview = (req, res) => {
    res.render('location-review-form', { title: 'Add review by 2021810039 오혜경'});
};

module.exports = {
    homelist,
    locationInfo,
    addReview
};