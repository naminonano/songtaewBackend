// const bcrypt = require("bcryptjs");
// const validator = require("validator");
// const jwt = require("jsonwebtoken");

// const User = require("../models/user");
// const Location = require("../models/location");
const Status = require("../models/status");
const station = [
  ["มทส", 14.8775204339943, 102.02180426294757],
  ["สารสาสน์", 14.90217105796618, 102.05560761806711],
  ["สนามกีฬา", 14.931285342325701, 102.05601045419532],
  ["สามแยกปัก", 14.959127976895253, 102.05355242218208],
  ["สีมาธานี", 14.970645560496651, 102.0643359865645],
  ["the mall", 14.97927026620946, 102.0767244824424],
  ["terminal", 14.981440328393356, 102.09094883784822],
  ["บขส ใหม่", 14.988402393666794, 102.09531093043852],
];
const closestStation = (lat, long, previousStation, currentHeading) => {
  let closestStation = previousStation;
  let distanceFromPreviousStation = Math.sqrt(
    (lat - station[closestStation][1]) ** 2 +
      (long - station[closestStation][2]) ** 2
  );
  let possibleStation = station.slice(closestStation + 1);
  if (currentHeading === -1) {
    possibleStation = station.slice(0, closestStation).reverse();
  }
  const nextStation = possibleStation[0];

  let distanceToNextStation = Math.sqrt(
    (lat - nextStation[1]) ** 2 + (long - nextStation[2]) ** 2
  );
  console.log(distanceFromPreviousStation, distanceToNextStation);
  if (distanceToNextStation < distanceFromPreviousStation) {
    return station.indexOf(nextStation);
  }
  return closestStation;
};
const currentStation = (lat, long, previousStation, currentHeading) => {
  if (
    (previousStation === 0 && currentHeading === -1) ||
    (previousStation === station.length - 1 && currentHeading === 1)
  ) {
    return "arrive at destination";
  }
  let closestStation = previousStation;
  let distanceFromPreviousStation = Math.sqrt(
    (lat - station[closestStation][1]) ** 2 +
      (long - station[closestStation][2]) ** 2
  );

  let possibleStation = station.slice(closestStation + 1);
  if (currentHeading === -1) {
    possibleStation = station.slice(0, closestStation).reverse();
  }
  const nextStation = possibleStation[0];

  let distanceToNextStation = Math.sqrt(
    (lat - nextStation[1]) ** 2 + (long - nextStation[2]) ** 2
  );

  if (distanceToNextStation + 0.003 < distanceFromPreviousStation) {
    // if (closestStation === 0 || closestStation === station.length - 1) {
    //   return [station.indexOf(nextStation), (currentHeading *= -1)];
    // }
    return [station.indexOf(nextStation), currentHeading];
  }
  return [closestStation, currentHeading];
};

module.exports = {
  getStatus: async function ({ carId }) {
    let a = await Status.findOne({ carId: carId });
    return a;
  },
  updateStatus: async function ({ latitude, longtitude, carId }) {
    let user = await Status.findOne({ carId: carId });
    user.latitude = latitude;
    user.longtitude = longtitude;
    console.log(user.heading);

    let a = currentStation(
      latitude,
      longtitude,
      user.previousStation,
      user.heading
    );
    console.log(a);
    user.previousStation = a[0];
    user.heading = a[1];
    const update = await user.save();
    return "update";
  },
};
//   createuser: async function ({ email, password }, req) {
//     //     console.log(email, password);

//     //     const hashedPw = await bcrypt.hash(password, 12);
//     //     console.log(hashedPw);
//     //     const user = new User({
//     //       email: email,
//     //       locations: [],
//     //       vector: [],
//     //       password: hashedPw,
//     //     });
// };
// const {
//   ValuesOfCorrectType,
// } = require("graphql/validation/rules/ValuesOfCorrectType");
// const findsim = (a, b) => {
//   const dot = (v1, v2) =>
//     v1.map((x, i) => v1[i] * v2[i]).reduce((m, n) => m + n);
//   const mag = (v) => {
//     let m = 0;
//     v.map((i) => {
//       m += i ** 2;
//     });

//     return Math.sqrt(m);
//   };
//   return dot(a, b) / (mag(a) * mag(b));
// };
// function sort_object(obj) {
//   items = Object.keys(obj).map(function (key) {
//     return [key, obj[key]];
//   });
//   items.sort(function (first, second) {
//     return second[1] - first[1];
//   });
//   sorted_obj = {};
//   $.each(items, function (k, v) {
//     use_key = v[0];
//     use_value = v[1];
//     sorted_obj[use_key] = use_value;
//   });
//   return sorted_obj;
// }
// const createuservector = (l) => {
//   v = [];
//   for (let i = 0; i < 1200; i++) {
//     let a = 0;
//     // l = l.map((i) => JSON.parse(i));
//     l.map((j) => {
//       a += j[i];
//     });
//     a = a / l.length;

//     v.push(a);
//   }

//   return v;
// };

const getvector = async (locations) => {
  const v = [];

  for (let i in locations) {
    let a = await Location.findOne({ name: locations[i] });
    a = JSON.parse(a["_doc"]["vector"]);
    v.push(a);
  }
  return v;
};

//   getinfo: async function ({ selected }, req) {
//     let p = [];
//     for (let i in selected) {
//       a = await Location.findOne({ name: selected[i] });
//       p.push(a);
//     }

//     return p;
//   },
//   getduration: async function ({ selected }, req) {
//     let dis = [];
//     for (let i in selected) {
//       s = [...selected];
//       s.splice(i, 1);
//       // console.log(s);
//       for (let j in s) {
//         a = await Duration.findOne({ from: selected[i], to: s[j] });
//         dis.push(a);
//       }
//     }

//     return dis;
//   },
//   getallinfo: async function (arg, req) {
//     a = await Location.find();
//     return a.map((i) => i["_doc"]);
//   },
//   getsim: async function ({ name, len }, req) {
//     let v1 = await User.findOne({ name: name });
//     locations = v1["locations"];
//     v1 = v1["vector"];
//     a = await Location.find();
//     let dict = {};
//     a.map((i) => {
//       if (!locations.includes(i["_doc"]["name"])) {
//         v2 = JSON.parse(i["_doc"]["vector"]);
//         info = i["_doc"];
//         delete info["vector"];
//         dict[i["_doc"]["name"]] = { score: findsim(v1, v2), info: info };
//       }
//     });
//     var items = Object.keys(dict).map(function (key) {
//       return [key, dict[key]["score"], dict[key]["info"]];
//     });

//     const isnone = (d) => {
//       d = d[2];

//       if (
//         d["open0"] ||
//         d["open1"] ||
//         d["open2"] ||
//         d["open3"] ||
//         d["open4"] ||
//         d["open5"] ||
//         d["open6"]
//       ) {
//         return false;
//       }
//       return true;
//     };
//     for (let i in items) {
//       isnone(items[i]);
//     }
//     items = items.filter((i) => !isnone(i));
//     items.sort(function (first, second) {
//       return second[1] - first[1];
//     });

//     items = items.slice(0, len);
//     r = {};
//     items = items.map((i, j) => i[2]);

//     return items;
//   },
//   createuser: async function ({ email, password }, req) {
//     console.log(email, password);

//     const hashedPw = await bcrypt.hash(password, 12);
//     console.log(hashedPw);
//     const user = new User({
//       email: email,
//       locations: [],
//       vector: [],
//       password: hashedPw,
//     });
//     const a = await user.save();
//     return 10;
//   },
//   login: async function ({ email, password }) {
//     const user = await User.findOne({ email: email });
//     if (!user) {
//       const error = new Error("User not found.");
//       error.code = 401;
//       throw error;
//     }
//     const isEqual = await bcrypt.compare(password, user.password);
//     if (!isEqual) {
//       const error = new Error("Password is incorrect.");
//       error.code = 401;
//       throw error;
//     }
//     const token = jwt.sign(
//       {
//         userId: user._id.toString(),
//         email: user.email,
//       },
//       "test",
//       { expiresIn: "1h" }
//     );
//     console.log(token, user._id);
//     return { token: token, userId: user._id.toString() };
//   },
// };
