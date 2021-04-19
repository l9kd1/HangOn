class SessionService {

    /**
     * Authenticates a given user
     * @param {*} res 
     * @param {*} data 
     * @returns 
     */
    static async authUserSession(res, data) {

        // Storing as cookie
        // TODO change this with better session management tools
        // Cookies are not secure enough (at least not this way)
        res.cookie("id", {
            username : data.username,
            _id : data._id
        });

        return;
    }

    static async destroyUserSession(res, data) {

        // TODO

        return;
    }

}

// Exports
exports.authUserSession = SessionService.authUserSession;