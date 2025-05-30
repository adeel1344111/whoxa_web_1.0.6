const { Op } = require("sequelize");
const { User, UserSocket } = require("../../models");

async function getAllUsers(req, res) {
    try {
        const { page = 1, limit = 10, fullName, phoneNumber } = req.body;

        const offset = (page - 1) * limit;
        if (offset < 0) {
            offset = page * limit;
        }

        // Build where clause for search
        const whereClause = {};

        if (fullName) {
            whereClause.user_name = {
                [Op.like]: `${fullName}%`,
            };
        }

        if (phoneNumber) {
            whereClause.phone_number = {
                [Op.like]: `${phoneNumber}%`,
            };
        }

        // Fetch users with pagination and search
        const { count, rows: allUsers } = await User.findAndCountAll({
            attributes: {
                exclude: ["device_token", "one_signal_player_id", "password", "otp"],
            },
            where: whereClause,
            limit,
            offset,
            order: [["createdAt", "DESC"]],
        });

        // Fetch online users
        const onlineUsers = await UserSocket.findAll({
            attributes: ["user_id"],
        });

        // Create a Set of online user IDs
        const onlineUserIds = new Set(
            onlineUsers.map((userSocket) => userSocket.user_id)
        );

        // Add online status to each user
        const updatedUsers = allUsers.map((user) => ({
            ...user.toJSON(),
            // status: onlineUserIds.has(user.user_id), // Ensure `user.user_id` matches with `UserSocket.user_id`
            // phone_number: "xxxxxxxxxx", 
        }));

        res.status(200).json({
            message: "All Users",
            allUsers: updatedUsers,
            pagination: {
                total: count,
                pages: Math.ceil(count / limit),
                currentPage: page,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error in getting Users" });
    }
}

module.exports = { getAllUsers };
