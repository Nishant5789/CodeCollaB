
module.exports.getUserProfile =  async (req, res) => {
    const CurrUser = req.user;
    try {
        res.status(200).json(CurrUser);
    }
    catch(err){
        console.log(err);
        res.status(200).send(err);
    }
}
  
