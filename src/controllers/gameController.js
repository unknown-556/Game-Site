import Game from "../models/gameModel.js";
import paystack from 'paystack-api';

const paystackClient = paystack(process.env.PAYSTACK_SECRET_KEY);

export const addGame = async (req, res) => {
    try {
        const { user } = req.user;
        const { name, description, location, premium, image } = req.body;


        const regularPrice = 2000; 
        const premiumPrice = 5000; 

        let gamePrice = premium ? premiumPrice : regularPrice;


        const paymentData = {
            amount: gamePrice * 100, 
            email: user.email,
            currency: 'NGN'
        };

        const paymentResponse = await paystackClient.transaction.initialize(paymentData);
        const paymentUrl = paymentResponse.data.authorization_url;


        res.status(200).send({ paymentUrl });


        const paymentVerifyResponse = await paystackClient.transaction.verify(paymentResponse.data.reference);

        if (paymentVerifyResponse.data.status === 'success') {
            let imageUrl = "";
            if (image) {
                const uploadResponse = await cloudinary.uploader.upload(image, {
                    resource_type: 'auto',
                });
                imageUrl = uploadResponse.secure_url;
            }

            
            const game = new Game({
                name,
                description,
                location,
                price: gamePrice,
                image: imageUrl,
                phoneNumber: user.phoneNumber,
                email: user.email,
                paid: true,
                premium: premium || false,
                premiumPaid: premium ? true : false
            });

            await game.save();
            return res.status(201).send(game);

        } else {
            return res.status(400).send({ error: "Payment verification failed." });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server Error" });
    }
};





export const getAll = async (req,res) => {
    try {
        const games = await Game.find().sort({ premium: -1, createdAt: -1 });
        if(!games){
            res.status(400).json ({message:'No Games found in database'})
        }else {
            console.log({message:'Portfolios found successfully',games})
            return res.json({games})
        }
    } catch (error) {
        console.error ('Error while getting all Gamess')
        res.status(500).json({message:error.message})
        console.error(error);
    }
}

export const getSingle = async (req,res) => {
    try {
        const Id = req.params.id
        const game = await Game.findbyId(Id)
        if(!game){
            res.status(400).json ({message:'Game not found in database'})
        }else {
            console.log({message:'Game found successfully',game})
            return res.json({game})
        }
    } catch (error) {
        console.error ('Error while getting Game')
        res.status(500).json({message:error.message})
        console.error(error);
    }
}

export const deleteSingle = async (req,res) => {
    try {
        const Id = req.params.id
        const game = await Game.findByIdAndDelete(Id)
        if(!game){
            res.status(400).json ({message:'Game not found'})
        }else {
            console.log({message:'Game deleted successfully',game})
            return res.json({game})
        }
    } catch (error) {
        console.error ('Error while deleting Game')
        res.status(500).json({message:error.message})
        console.error(error);
    }
}