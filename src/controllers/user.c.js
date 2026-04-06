const User = require("../models/user.m")



const getAllUsers = async (req, res) => {
 try {
    const users = await User.find().select("-password")
    res.status(200).json({ message: "You see all user", users })
    
 } catch (error) {
    res.status(500).json({ message: "Users not found" })
 }
}


const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password")
        if(!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ message: "You see your user", user })
    } catch (error) {
        res.status(500).json({ message: "User not found" })
    }
}

const deleteUser = async (req, res) => {
    try {
        if(req.user.role !== "admin") {
            return res.status(403).json({ 
                message: "Admin only"
            })   
         }
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if(!deletedUser) {
            return res.status(404).json({ message: "deletion failed" })
        }
        res.status(200).json({ message: "You deletion successed" })
    } catch (error) {
        res.status(500).json({ message: "Deletion failed" })
    }
}


const updateUser = async (req, res) => {
    try {
        if(req.user.id !== req.params.id && req.user.role !== "admin") {
            return res.status(404).json({ 
                message: "You can update only your account"
             })
        
            }
        const updateuser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }).select("-password")

        if(!updateuser){
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({ 
            message: "User updated",
            user: updateuser
         })
    } catch (error) {
        res.status(500).json({ message: "Update process failed" })
    }
}

module.exports = { getAllUsers, getUserById, deleteUser, updateUser }

