export interface User {
  email: {
    type: String;
    required: [true, 'Please add an email'];
    unique: true;
  };
  password: {
    type: String;
    required: [true, 'Please add a password'];
  };
  role: {
    type: String;
    required: [true, 'Please add admin or patient'];
  };
  phone?: { type: String };
  firstName: { type: String };
  lastName: { type: String };
}
