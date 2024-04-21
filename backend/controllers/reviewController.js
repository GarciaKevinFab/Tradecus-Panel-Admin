import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json({ success: true, data: reviews });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
    }
};

export const createReview = async (req, res) => {

    const tourId = req.params.tourId;
    const newReview = new Review({ ...req.body });
    try {
        const savedReview = await newReview.save();

        //after creating a new review now update the reviews array of the tour
        await Tour.findByIdAndUpdate(tourId, {
            $push: { reviews: savedReview._id }
        });

        res.status(200).json({ success: true, message: 'Review submitted', data: savedReview });
    } catch (err) {
        res.status(500).json({ success: false, message: 'failed to submit' });
    }
};

export const deleteReview = async (req, res) => {
    const reviewId = req.params.reviewId;
    try {
        const deletedReview = await Review.findByIdAndRemove(reviewId);
        if (!deletedReview) {
            res.status(404).json({ success: false, message: 'Review not found' });
        } else {
            // Remove review reference from tour
            const tourId = deletedReview.tourId;
            await Tour.findByIdAndUpdate(tourId, {
                $pull: { reviews: reviewId },
            });
            res.status(200).json({ success: true, message: 'Review deleted', data: deletedReview });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete review' });
    }
};