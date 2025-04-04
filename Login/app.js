document.addEventListener("DOMContentLoaded", function () {

    // Get the login and sign-up buttons by their IDs
    const loginButton = document.getElementById("login");
    const signUpButton = document.getElementById("sign-up");

    // Add event listener for the Login button
    loginButton.addEventListener("click", function (event) {
        // Get the email and password input fields
        const emailInput = document.getElementById("email-entry");
        const passInput = document.getElementById("pass-entry");

        // Check if both email and password fields are filled
        if (emailInput.value.trim() === "" || passInput.value.trim() === "") {
            alert("Please fill in both email and password fields.");
            return;
        }

        // Authenticate the user with Firebase Auth
        auth.signInWithEmailAndPassword(emailInput.value.trim(), passInput.value.trim())
            .then((userCredential) => {
                // Login was successful
                const user = userCredential.user; // The logged-in user

                // Now, update Firestore database with the login timestamp
                const usersCollection = db.collection("users");

                // Add or update the user's document in Firestore with a login timestamp
                usersCollection.doc(user.uid).set({
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp() // Set the login timestamp
                }, { merge: true }) // Use merge to not overwrite existing data
                .then(() => {
                    console.log("User login timestamp updated!");
                    alert("Login successful!");

                    // Optionally, redirect the user to a dashboard or home page
                    window.location.href = "dashboard.html"; // Replace with your desired URL
                })
                .catch((error) => {
                    console.error("Error updating Firestore: ", error);
                });
            })
            .catch((error) => {
                // Handle authentication errors
                alert(`Error logging in: ${error.message}`);
            });
    });

    // Add event listener for the Sign-Up button
    signUpButton.addEventListener("click", function () {
        window.location.href = 'signup.html'; // Redirect to the sign-up page
    });
});
