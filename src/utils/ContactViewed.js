import { db } from "../app/firebase";
import firebase from "firebase";

export const ContactViewed = (
  intersetedProfile,
  loggedinprofile,
  loggedinuserEmail
) => {
  var userRef = db.collection("users").doc(`${loggedinuserEmail}`);
  console.log(intersetedProfile.email + "interested profile email");
  db.collection("users")
    .doc(loggedinuserEmail)
    .set(
      {
        contactsviewed: firebase.firestore.FieldValue.arrayUnion(
          intersetedProfile.email
        )
      },
      { merge: true }
    );
  // adding the requestedphoto user snippet in logged in user(myintersets(loggedin user) snippet)
  db.collection("users")
    .doc(loggedinuserEmail)
    .collection("contactsviewed")
    .doc(intersetedProfile?.email)
    .set({
      email: intersetedProfile?.email,
      name: intersetedProfile?.name,
      education: intersetedProfile?.education,
      star: intersetedProfile?.birthstar,
      raashi: intersetedProfile?.raashi,
      gothra: intersetedProfile?.gothra,
      dob: intersetedProfile?.birthdate,
      dp: intersetedProfile?.profilepic,
      accepted: false,
      read: false,
      sent: firebase.firestore.FieldValue.serverTimestamp()
    });

  //adding a array in viewingprofile (shortlisted me array)
  db.collection("users")
    .doc(intersetedProfile?.email)
    .set(
      {
        contactsviewedme: firebase.firestore.FieldValue.arrayUnion(
          loggedinuserEmail
        )
      },
      { merge: true }
    );

  // adding the logged in  user snippet in viewingprofile(shortlisted me snippet)
  db.collection("users")
    .doc(intersetedProfile?.email)
    .collection("contactsviewedme")
    .doc(loggedinuserEmail)
    .set({
      email: loggedinprofile.email,
      name: loggedinprofile.name,
      education: loggedinprofile.education,
      star: loggedinprofile.birthstar,
      raashi: loggedinprofile.raashi,
      gothra: loggedinprofile.gothra,
      dob: loggedinprofile.birthdate,
      dp: loggedinprofile.profilepic,
      accepted: false,
      read: false,
      sent: firebase.firestore.FieldValue.serverTimestamp()
    })

    .then((res) => {
      //   //alert(res + "res");
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};
