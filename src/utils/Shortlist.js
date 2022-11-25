import { db } from "../app/firebase";
import firebase from "firebase";

export const shortlistNew = async (
  loggedinuserEmail,
  tobeshortlistedId,
  profilee,
  email,
  loggedinUser
) => {
  console.log(
    "ssssss:" + loggedinuserEmail,
    "tobeshortlisted: " + tobeshortlistedId,
    "profile: " + profilee.email,
    "email: " + email,
    "loggedinuser:" + JSON.stringify(loggedinUser)
  );
  //adding a array in logged in user(myshortlist(loggedin user) array)
  db.collection("users")
    .doc(loggedinuserEmail)
    .set(
      {
        shortlisted: firebase.firestore.FieldValue.arrayUnion(tobeshortlistedId)
      },
      { merge: true }
    );

  // adding the shortlisted user snippet in logged in user(myshortlist(loggedin user) snippet)
  db.collection("users")
    .doc(loggedinuserEmail)
    .collection("shortlisted")
    .doc(profilee.email)
    .set({
      email: profilee.email,
      name: profilee.name,
      education: profilee.education,
      star: profilee.birthstar,
      raashi: profilee.raashi,
      gothra: profilee.gothra,
      dob: profilee.birthdate,
      dp: profilee.profilepic
    });

  //adding a array in viewingprofile (shortlisted me array)
  db.collection("users")
    .doc(profilee.email)
    .set(
      {
        shortlistedme: firebase.firestore.FieldValue.arrayUnion(email)
      },
      { merge: true }
    );

  // adding the logged in  user snippet in viewingprofile(shortlisted me snippet)
  db.collection("users")
    .doc(profilee.email)
    .collection("shortlistedme")
    .doc(email)
    .set({
      email: loggedinUser.email,
      name: loggedinUser.name,
      education: loggedinUser.education,
      star: loggedinUser.birthstar,
      raashi: loggedinUser.raashi,
      gothra: loggedinUser.gothra,
      dob: loggedinUser.birthdate,
      dp: loggedinUser.profilepic
    })
    // .then(() => {
    //   //   // console.log("Document successfully deleted!");
    //   //setsnackbarmsg("Successfully added to shortlist");
    //   //   // setsnackbartype("success");
    //   //   // setopenSnackbar(true);
    //   alert(
    //     new Promise((resolve) => {
    //       JSON.stringify(resolve("resolved"));
    //     })
    //   );
    //   return new Promise((resolve) => {
    //     resolve("resolved");
    //   });
    //   //   // return ["Successfully added to shortlist", "success", true];
    // })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  return Promise.resolve("Success");
};

export const removeshortlist = async (
  removershortlistmail,
  loggedinuserEmail
) => {
  const usersRef = db.collection("users");
  await Promise.all([
    usersRef
      .doc(loggedinuserEmail)
      .set(
        {
          shortlisted: firebase.firestore.FieldValue.arrayRemove(
            removershortlistmail
          )
        },
        { merge: true }
      )
      .catch((error) => {
        return error;
      }),
    usersRef
      .doc(loggedinuserEmail)
      .collection("shortlisted")
      .doc(removershortlistmail)
      .delete()

      .catch((error) => {
        console.error("Error removing document: ", error);
      }),
    usersRef.doc(removershortlistmail).set(
      {
        shortlistedme: firebase.firestore.FieldValue.arrayRemove(
          loggedinuserEmail
        )
      },
      { merge: true }
    ),
    // removing the logged in  user snippet in viewingprofile

    usersRef
      .doc(removershortlistmail)
      .collection("shortlistedme")
      .doc(loggedinuserEmail)
      .delete()
      // .then(() => {
      //   return "Document successfully deleted!";
      // })
      .catch((error) => {
        return error;
      })
  ]).catch(function (err) {
    console.log("errrrrrrrr" + err.message); // some coding error in handling happened
  });
  return Promise.resolve("Success");

  //removing a array in viewingprofile
};
