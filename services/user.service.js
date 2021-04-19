var User = require('../models/user.model');

class UserService {

    /**
     * Gets all users matching a given query
     * @param {*} query 
     * @param {*} page 
     * @param {*} limite 
     * @returns 
     */
    static async getUsers(query, page, limite) {

        try {

            var users = await User.find(query)
            return users;

        } catch (e) {
            
            throw Error('An error occurred while trying to fetch users.');

        }

    }

}

// Exports
exports.getUsers = UserService.getUsers;