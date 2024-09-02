const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const reviewsCreate = (req, res) => {};

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
    
const reviewsUpdateOne = (req, res) => {};
const reviewsDeleteOne = (req, res) => {};

module.exports = {
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne
};