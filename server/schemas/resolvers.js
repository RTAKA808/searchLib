// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers={
    Query:{
        user: async (parent, { username, email }) => {
            return User.findOne({ username, email });
        },

    }














}