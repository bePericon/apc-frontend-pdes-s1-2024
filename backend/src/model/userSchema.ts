import mongoose from 'mongoose';

//Validation for mail.
var email_match = [
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  'Coloca un email válido',
];

interface IUser {
  name: string;
  surname: string;
  username: string;
  password: string;
  email: string;
  createdDate?: Date;
}

interface UserDoc extends mongoose.Document {
  name: string;
  surname: string;
  username: string;
  password: string;
  email: string;
  createdDate?: Date;
}

interface UserModel extends mongoose.Model<IUser> {
  build(attr: IUser): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      maxlength: [30, 'Nombre muy largo'],
    },
    surname: {
      type: String,
      require: true,
      maxlength: [15, 'Apellido muy largo'],
    },
    username: {
      type: String,
      require: true,
      maxlength: [10, 'Username muy largo'],
    },
    password: {
      type: String,
      require: true,
      minlength: [8, 'El password es my corto'],
    },
    email: {
      type: String,
      require: [true, 'Email is a required field'],
      // match: email_match,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    bufferCommands: false,
  }
);

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};

const User: UserModel = mongoose.model<UserDoc, UserModel>('user', userSchema);

export { User };
