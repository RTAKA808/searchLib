// import user model
const { ConnectionStates } = require('mongoose');
const { User } = require('../models');
// import sign token function from auth
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers={
    Query:{
        user: async (parent, _,context) => {
          if(context.user){
            return await User.findById(context.user._id);
          }else{
            throw AuthenticationError;
          }
        }
    },
    Mutation:{
        createUser: async (parent,{username,email,password})=>{
            const user=await User.create({username,email,password});
            const token=signToken(user);
            return{ token,user};
        },
        login: async (parent, {email, password }) => {
            const user = await User.findOne( {email} );
            console.log('userconsolelog', user)
            if (!user) {
            throw AuthenticationError;
            }
    
            const correctPw = await user.isCorrectPassword(password);
    
            if (!correctPw) {
                throw AuthenticationError;
            }
    
            const token = signToken(user);
              console.log('this is token',token)
            return { token, user };
        },
        saveBook: async (parent, {bookInfo}, context)=>{
          console.log(context.user)
              if(!context.user){
                throw AuthenticationError
              }
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookInfo } },
                    { new: true }
                  );
                  return updatedUser;

        },
        deleteBook: async (parent, { bookId }, context)=>{
          if (context.user){
            const updatedUser=await User.findOneAndUpdate(
              { _id: bookId },
              { $pull: { savedBooks: { bookId } } },
              { new: true }
            );
            return updatedUser;
          }
        },
      }
    }

module.exports=resolvers;

