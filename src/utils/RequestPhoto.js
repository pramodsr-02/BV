import { db } from "../app/firebase";
import firebase from "firebase";

export const RequestPhoto = (
  intersetedProfile,
  loggedinprofile,
  loggedinuserEmail,
  setsnackbarmsg,
  setsnackbartype,
  setopenSnackbar
) => {
  var userRef = db.collection("users").doc(`${loggedinuserEmail}`);
  console.log(intersetedProfile.email + "interested profile email");
  const profile = { email: intersetedProfile.email, accepted: false };
  db.collection("users")
    .doc(loggedinuserEmail)
    .set(
      {
        photorequestssent: firebase.firestore.FieldValue.arrayUnion(
          // intersetedProfile.email
          { email: intersetedProfile.email, accepted: false }
        )
      },
      { merge: true }
    );
  // adding the requestedphoto user snippet in logged in user(myintersets(loggedin user) snippet)
  db.collection("users")
    .doc(loggedinuserEmail)
    .collection("photorequestssent")
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
  const loggedinuserEmaill = { email: loggedinuserEmail, accepted: false };
  db.collection("users")
    .doc(intersetedProfile?.email)
    .set(
      {
        photorequestssreceived: firebase.firestore.FieldValue.arrayUnion({
          email: loggedinuserEmail,
          accepted: false
        })
      },
      { merge: true }
    );

  // adding the logged in  user snippet in viewingprofile(shortlisted me snippet)
  db.collection("users")
    .doc(intersetedProfile?.email)
    .collection("photorequestssreceived")
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
      setsnackbarmsg(
        `Successfully sent Photo Request to ${intersetedProfile?.name}`
      );
      setsnackbartype("success");
      setopenSnackbar(true);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      setsnackbarmsg(error);
      setsnackbartype("error");
      setopenSnackbar(true);
    });
};
