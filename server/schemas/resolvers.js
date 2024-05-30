// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers={
    Query:{
        user: async (parent, { id, username  }) => {
            return User.findOne({ $or: [{_id: id}, {username: username}]  });
        }
    },

    Mutation:{
        createUser: async (parent,{username,email,password})=>{
            const user=awaitUser.create({username,email,password});
            const token=signToken(user);
            return{ token,user};
        },
        login: async (parent, {username, email, password }) => {
            const user = await User.findOne({ $or: [{username},{email}] });
    
            if (!user) {
            throw AuthenticationError;
            }
    
            const correctPw = await user.isCorrectPassword(password);
    
            if (!correctPw) {
                throw AuthenticationError;
            }
    
            const token = signToken(user);
    
            return { token, user };
        },
        saveBook: async (parent, { bookId, authors, description, title, image, link }, context)=>{
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $addToSet: { savedBooks: { bookId, authors, description, title, image, link } } },
                    { new: true, runValidators: true }
                  );
                  return updatedUser;
            }
            throw AuthenticationError;
        },
        deleteBook: async (parent, { bookId }, context)=>{
          if (context.user){
            const updatedUser=await User.findOneAndUpdate(
              { _id: user._id },
              { $pull: { savedBooks: { bookId } } },
              { new: true }
            );
            return updatedUser;
          }
        },
      }
    }

module.exports=resolvers;

