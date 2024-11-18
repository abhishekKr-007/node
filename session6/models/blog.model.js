const mongoose = require("mongoose");
const validator = require("validator");

const { blackListedDomains } = require("../config/config");

const authorSchema = new mongoose.Schema(
  {
    fullName: { type: String, default: "", maxLength: 50 },
    email: {
      type: String,
      required: true,
      maxLength: 50,
      validate: {
        validator: (value) =>
          validator.isEmail(value, { host_blacklist: blackListedDomains }),
        message: (props) => {
          if (
            blackListedDomains.includes(props.value.toLowerCase().split("@")[1])
          )
            return `Personal emails are not allowed! Please use a business email.`;
          return `${props.value} is not a valid email address.`;
        },
      },
    },
    twitterHandle: { type: String, default: "" },
    image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/1144/1144760.png",
      validate: {
        validator: (value) => validator.isURL(value, { protocols: ["https"] }),
        message: (props) => `${props.value} is not a valid https URL.`,
      },
    },
    // resume: {
    //   type: String,
    //   validate: {
    //     validator: (value) => value.split(".").at(-1) === "pdf",
    //     message: (props) => `${props.value} must be a valid pdf file.`,
    //   },
    // },
  },
  {
    _id: false,
  }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    authors: { type: [authorSchema], default: [] },
    content: { type: String, default: "" },
    publishedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const blogModel = mongoose.model("Blog", blogSchema, "blogs"); //collection name is optional, if not provided, it will default to plural form of the model name

module.exports = blogModel;
