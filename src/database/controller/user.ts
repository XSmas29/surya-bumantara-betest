import User from "./../model";

export const createUser = async (
  userName: string, 
  accountNumber: number, 
  emailAdress: string, 
  identityNumber: number
) => {
  const newUser = new User({
    userName,
    accountNumber,
    emailAdress,
    identityNumber,
  });
  const userSaved = await newUser.save();
}

export const getUserByUsername = async (userName: string) => {
  const user = await User.findOne({
    userName,
  })
  return user;
}

export const getUserByAccountNumber = async (accountNumber: number) => {
  const user = await User.findOne({
    accountNumber,
  })
  return user;
}