const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const doSetAverageRating = (location) => {
    if (location.reviews && location.reviews.length > 0) {
        const count = location.reviews.length;
        const total = location.reviews.reduce((acc, {rating}) => {
            return acc + rating;
        }, 0);
        location.rating = parseInt(total / count, 10);
        location.save(err => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Average rating updated to ${location.rating}`);
            }
        });
    }
};

const updateAverageRating = (locationId) => {
    Loc.findById(locationId)
        .select('rating reviews')
        .exec((err, location) => {
            if (!err) {
                doSetAverageRating(location);
            }
        });
};

const doAddReview = (req, res, location) => {
    if (!location) {
        res
            .status(404)
            .json({ "message": "Location not found", 학번_이름: "2021810039 오혜경" })
    } else {
        const {author, rating, reviewText} = req.body;
        location.reviews.push({
            author,
            rating,
            reviewText
        });
        location.save((err, location) => {
            if (err) {
                console.log(err);
                res 
                    .status(400)
                    .json({ err, 학번_이름: "2021810039 오혜경" });
            } else {
                updateAverageRating(location._id);
                const thisReview = location.reviews.slice(-1).pop();
                res
                    .status(201)
                    .json({ thisReview, 학번_이름: "2021810039 오혜경" })
            }
        });
    }
};

const reviewsCreate = (req, res) => {
    const locationId = req.params.locationid;
    if (locationId) {
        Loc
            .findById(locationId)
            .select('reviews')
            .exec((err, location) => {
                if (err) {
                    res
                        .status(400)
                        .json({err, 학번_이름: "2021810039 오혜경" });
                } else {
                    doAddReview(req, res, location);
                }
            });
    } else {
        res
            .status(404)
            .json({ "message": "Location not found", 학번_이름: "2021810039 오혜경" });
    }
};

const reviewsReadOne = (req, res) => {
    Loc
        .findById(req.params.locationid)
        .select('name reviews')
        .exec((err, location) => {
            if (!location) {
                return res
                    .status(404)
                    .json({ message: "location not found", 학번_이름: "2021810039 오혜경" });
            } else if (err) {
                return res
                    .status(400)
                    .json({ err, 학번_이름: "2021810039 오혜경" });
            }

            function findObjectById(array, id) {
                for (let i = 0; i < array.length; i++) {
                    if (array[i]._id === id) {
                        return array[i];
                    }
                }
                return null;
            }
            
            const location_parsed = JSON.parse(JSON.stringify(location));
            if (location.reviews && location.reviews.length > 0) {
                const review = location.reviews.id(req.params.reviewid);

                if (!review) {
                    return res
                        .status(404)
                        .json({ message: "review not found", 학번_이름: "2021810039 오혜경" });
                } else {
                    const response = {
                        location: {
                            name: location.name,
                            id: req.params.locationid
                        }, 
                        review
                    };

                    return res
                        .status(200)
                        .json({ response, 학번_이름: "2021810039 오혜경" });
                } 
            } else {
                    return res
                        .status(404)
                        .json({ message: "No reviews found", 학번_이름: "2021810039 오혜경" });
            }
        });
};
    
const reviewsUpdateOne = (req, res) => {
    if (!req.params.locationid || !req.params.reviewid) {
        return res
            .status(404)
            .json({ "message": "Not found, locationid and reviewid are both required", 학번_이름: "2021810039 오혜경" });
    }
    Loc
    .findById(req.params.locationid)
    .select('reviews')
    .exec((err, location) => {
        if (!location) {
            return res
             .status(404)
             .json({ "message": "Location not found", 학번_이름: "2021810039 오혜경" });
        } else if (err) {
            return res
                .status(400)
                .json({ err, 학번_이름: "2021810039 오혜경" });
        }
        if (location.reviews && location.reviews.length > 0) {
            const thisReview = location.reviews.id(req.params.reviewid);
            if (!thisReview) {
                res
                    .status(404)
                    .json({ "message": "Review not found", 학번_이름: "2021810039 오혜경" });
            } else {
                thisReview.author = req.body.author;
                thisReview.rating = req.body.rating;
                thisReview.reviewText = req.body.reviewText;
                location.save((err, location) => {
                    if (err) {
                        res
                            .status(404)
                            .json({ err, 학번_이름: "2021810039 오혜경" });
                    } else {
                        updateAverageRating(location._id);
                        res
                            .status(200)
                            .json({ thisReview, 학번_이름: "2021810039 오혜경" });
                    }
                });
            }
        } else {
            res
                .status(404)
                .json({ "message": "No review to update"});
        }
    });
};

const reviewsDeleteOne = (req, res) => {
    const {locationid, reviewid} = req.params;
    if (!locationid || !reviewid) {
        return res
            .status(404)
            .json({ "message": "Not found, locationid and \ reviewid are both required", 학번_이름: "2021810039 오혜경" });
    }
    Loc
        .findById(locationid)
        .select('reviews')
        .exec((err, location) => {
            if (!location) {
                return res
                    .status(404)
                    .json({ "message": "Location not found", 학번_이름: "2021810039 오혜경" });
            } else if (err) {
                return res
                    .status(400)
                    .json({ err, 학번_이름: "2021810039 오혜경" });
            }
            if (location.reviews && location.reviews.length > 0) {
                if (!location.reviews.id(reviewid)) {
                    return res
                        .status(404)
                        .json({ "message": "Review not found", 학번_이름: "2021810039 오혜경" });
                } else {
                    location.reviews.id(reviewid).remove();
                    location.save(err => {
                        if (err) {
                            return res
                                .status(404)
                                .json({ err, 학번_이름: "2021810039 오혜경" });
                        } else {
                            updateAverageRating(location._id);
                            res
                                .status(204)
                                .json(null);
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({ "message": "No review to delete", 학번_이름: "2021810039 오혜경" });
            }
        });
};

module.exports = {
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne
};