import Game from "../models/gameModel.js";

export const addReview = async (req, res) => {
    const { gameId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id; 

    try {
        const game = await Game.findById(gameId);

        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        const alreadyReviewed = game.reviews.find(
            (review) => review.user.toString() === userId.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({ message: 'You have already reviewed this game' });
        }

        const review = {
            user: userId,
            rating: Number(rating),
            comment
        };

        game.reviews.push(review);

        game.numReviews = game.reviews.length;
        game.rating =
            game.reviews.reduce((acc, review) => acc + review.rating, 0) / game.reviews.length;

        await game.save();

        res.status(201).json({ message: 'Review added successfully', game });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
