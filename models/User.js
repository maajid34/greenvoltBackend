// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },

//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },

//     role: {
//       type: String,
//       enum: ["admin", "user"],
//       default: "admin",
//     },
//   },
//   { timestamps: true }
// );

// /* HASH PASSWORD */
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// /* MATCH PASSWORD */
// userSchema.methods.matchPassword = function (enteredPassword) {
//   return bcrypt.compare(enteredPassword, this.password);
// };

// export default mongoose.model("User", userSchema);


import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const modulePermissionSchema = new mongoose.Schema(
  {
    view: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const permissionsSchema = new mongoose.Schema(
  {
    dashboard: { type: modulePermissionSchema, default: () => ({ view: true, edit: false }) },
    projects: { type: modulePermissionSchema, default: () => ({ view: false, edit: false }) },
    categories: { type: modulePermissionSchema, default: () => ({ view: false, edit: false }) },
    publications: { type: modulePermissionSchema, default: () => ({ view: false, edit: false }) },
    blogs: { type: modulePermissionSchema, default: () => ({ view: false, edit: false }) },
    partners: { type: modulePermissionSchema, default: () => ({ view: false, edit: false }) },
    testimonials: { type: modulePermissionSchema, default: () => ({ view: false, edit: false }) },
    users: { type: modulePermissionSchema, default: () => ({ view: false, edit: false }) },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },

    permissions: {
      type: permissionsSchema,
      default: () => ({}),
    },
  },
  { timestamps: true }
);

/* HASH PASSWORD */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/* MATCH PASSWORD */
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
