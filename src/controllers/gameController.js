import Game from "../models/gameModel.js"


export const addGame = async (req,res) => {
    try {
        const {user} = req.user
        const {name, description, price, location} = req.body

        let imageUrl = ""

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                resource_type: 'auto',
            });
            imageUrl = uploadResponse.secure_url;
            console.log('Image uploaded successfully:', imageUrl);
        }

        const game = new Game({
            name,
            description,
            location,
            price,
            image: imageUrl,
            phoneNumber: user.phoneNumber,
            email: user.email
        })

        await game.save()
        res.status(201).send(game);

    } catch (error) {
        
    }
}

export const getAll = async (req,res) => {
    try {
        const games = await Game.find()
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