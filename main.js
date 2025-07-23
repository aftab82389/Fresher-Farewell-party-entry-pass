const rollno = document.querySelector('#rollno');
const passKey = document.querySelector('#passKey'); // ✅ spelling fixed
const login = document.querySelector('.login');

rollno.addEventListener('input', () => {
  limitLength(rollno, 11);
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCcugiZPZnlZ9XqRW4snTbjp-_hak1BOqY",
  authDomain: "farewell-register.firebaseapp.com",
  databaseURL: "https://farewell-register-default-rtdb.firebaseio.com",
  projectId: "farewell-register",
  storageBucket: "farewell-register.appspot.com",
  messagingSenderId: "1000923768561",
  appId: "1:1000923768561:web:5c050e34af2de143b42b50"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

function limitLength(input, maxLength) {
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
  }
}

function getData(rollno, passKey) {
  const dataRef = ref(db, "Students/" + rollno);
  const track = ref(db, "Students/" + rollno + "/Getpass");
  let getpass;
  onValue(track, (snapshot) => {
    const data = snapshot.val();
     getpass=data;
  });
  
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      alert("No data found for this roll number");
      return;
    }
    
    const rollNo = data.Rollno;
    const passkey = data.Passkey;
    console.log("Expected:", rollNo, passkey);
    console.log("Entered:", rollno, passKey);
    
    if ((rollno === rollNo) && (passKey === passkey)) {
      localStorage.setItem("Rollno", rollno);
      localStorage.setItem("Pass", passKey);
      if(getpass){
      alert("Login Successful ✅");
      window.location="pass.html"
      }
      else{
        window.location="photo.html"
      }
    } else {
      alert("Invalid credentials ❌");
    }
  });
}

login.addEventListener('click', () => {
  if (rollno.value && passKey.value) {
    if (rollno.value.length == 11) {
      getData(rollno.value.trim(), passKey.value.trim());
    } else {
      alert('Please enter a valid roll number');
    }
  } else {
    alert('Please fill in all fields');
  }
});
