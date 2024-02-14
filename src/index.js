
var firebaseConfig={
    apiKey: "AIzaSyD5liv9vQm9ewyZx--eZWxWW2wd3sJyXgM",
    authDomain: "solo-fc543.firebaseapp.com",
    databaseURL: "https://solo-fc543-default-rtdb.firebaseio.com",
    projectId: "solo-fc543",
    storageBucket: "solo-fc543.appspot.com",
    messagingSenderId: "616332975995",
    appId: "1:616332975995:web:ddf598c77ad1ef75f227de",
    measurementId: "G-DV3VBS4YKD"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()


function Register(){
    //Get all fields on signup page
    email=document.getElementById("emailField").value
    Name=document.getElementById("nameField").value
    password=document.getElementById("passwordField").value

    //Validate input fields
    if(validate_email(email)==false || validate_password(password)==false){
        alert("You have entered incorrect Email or Password!")
        return
        //Don't continue running the code
    }
    auth.createUserWithEmailAndPassword(email,password)
    .then(function(){
        //Declare user variable
        var user = auth.currentUser
        //Add this user to the firebase database
        var user_data={
            email:email,
            Name: Name,
            last_login:Date.now()
        }
        database_ref.child('users/'+user.uid).set(user_data)
    })
    .catch(function(error){
        //Firebase will alert you when u have errors
        var error_code=error.error_code
        var error_message=error.message
    })
    
}
//Set up Login function
function login(){
    //Get all our input fields
    email=document.getElementById("emailField").value
    Name=document.getElementById("nameField").value
    //Also validate
    if(validate_email(email)==false || validate_password(password)==false){
        alert("You have entered incorrect Email or Password!")
        return
        //Don't continue running the code
    }

    auth.signInWithEmailAndPassword(email,password)
       .then(function(){
        //Declare user variable
        var user=auth.currentUser
        //Add this user to Firebase Database
        var database_ref=database.ref()

        //Create User data
        var user_data={
            last_login:Date.now()
        }
        //push to firebase database
        database_ref.child('users/'+user.uid).update(user_data)
        //Done
        alert('User Logged In!')
       })
       .catch(function(error){
        //Firebase will alert you when u have errors
        var error_code=error.error_code
        var error_message=error.message
    }) 

}

function validate_email(email){
    expression =/^[^@]+@\w+(\.\w+)+\w$/
    if(expression.test(email)==true){
        //Email is good
        return true
    }else{
        //Email is not good
        return false
    }

function validate_password(password){
    //Firebase accepts passwords of length greater than 6
    if(password.length<6){
         return false
    }else{
        return true
     }
}
function validate_field(field){
    if(field==null){
        return false
    }
    if(field.length<=0){
        return false
    }else{
        return true
    }
}
