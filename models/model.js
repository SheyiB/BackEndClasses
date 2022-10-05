const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    minlength: 5,
    validate: {
      validator: (name) => name.slice(0, 1) == "J",
      message: (props) => `${props.value} is not allowed to register `,
    },
  },
  lastname: String,
  phoneNumber: Number,
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  dob: Date,
  title: {
    type: String,
    required: true,
    default: "Master",
  },
  age: {
    type: Number,
    max: 40,
    min: 13,
    validate: {
      validator: (age) => age > 25,
      message: (props) => `${props.value} is not up to the Approved Age`,
    },
  },
  email: {
    type: String,
    unique: true,
  },
});

userSchema.methods.sayHello = function () {
  console.log(`Data Created for ${this.firstname}`);
};

userSchema.pre("save", function (next) {
  if (this.gender == "male") {
    this.title = "Mr " + this.lastname;
  }
  if (this.gender == "female") {
    this.title = "Mrs " + this.lastname;
  }
  next();
});
module.exports = mongoose.model("User", userSchema);
