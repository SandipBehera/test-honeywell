const userData = require('../data/user_details.json');

exports.Login = async (req, res) => {
    const {user_id}= req.body;
    const user = userData.find(user => user.user_id === user_id);
    try{
    if(user){
        res.status(200).json({
            message: "User found",
            data: user
        });
    }
    else{
        res.status(404).json({
            message: "User not found"
        });
    }
}
catch(err){
    res.status(500).json({
        message: "Internal Server Error"
    });
}   
}