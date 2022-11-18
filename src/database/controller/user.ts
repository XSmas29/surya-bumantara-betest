import User from "./../model";

export const createUser = async (
  userName: string, 
  accountNumber: number, 
  emailAddress: string, 
  identityNumber: number
) => {
  const newUser = new User({
    userName,
    accountNumber,
    emailAddress,
    identityNumber,
  });
  const userSaved = await newUser.save();
  return userSaved;
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

class paramUpdateUser {
  userName?: string;
  accountNumber?: number;
  emailAddress?: string;
  identityNumber?: number;
}

export const updateUserByAccountNumber = async (
  accountNumber: string,
  param: paramUpdateUser
) => {
  const updated = User.findOneAndUpdate({
    accountNumber,
  }, param)

  updated.exec()
  return updated;
}