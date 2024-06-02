const firebaseConfig = {
  apiKey: "AIzaSyAug2T-feQD2VhEegEEDDeSSMHJX7QTxo8",
  authDomain: "sanphamcuoikhoa-89378.firebaseapp.com",
  projectId: "sanphamcuoikhoa-89378",
  storageBucket: "sanphamcuoikhoa-89378.appspot.com",
  messagingSenderId: "640032118275",
  appId: "1:640032118275:web:e8e435ce4e9b6a3886a036",
  measurementId: "G-LQQPB4DPEZ",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const calculateElapsedTime = (timeCreated) => {
  const created = new Date(timeCreated).getTime();
  let periods = {
    năm: 365 * 30 * 24 * 60 * 60 * 1000,
    tháng: 30 * 24 * 60 * 60 * 1000,
    tuần: 7 * 24 * 60 * 60 * 1000,
    ngày: 24 * 60 * 60 * 1000,
    giờ: 60 * 60 * 1000,
    phút: 60 * 1000,
  };
  let diff = Date.now() - created;

  for (const key in periods) {
    if (diff >= periods[key]) {
      let result = Math.floor(diff / periods[key]);
      return `${result} ${result === 1 ? key : key + ""} trước`;
    }
  }

  return "Vừa xong";
};
