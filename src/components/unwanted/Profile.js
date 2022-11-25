import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../app/firebase";
import Profileimagegallery from "../Profileimagegallery";
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
    },
    imageGallery: {
        position: "sticky",
    },
}));
function Profile() {
    const classes = useStyles();

    const location = useLocation();

    const myparam = location.state.params;
    const userid = myparam.uid;

    const [profile, setprofile] = useState();
    useEffect(() => {
        db.collection("users")
            .where("uid", "==", userid)
            .onSnapshot((snapshot) =>
                setprofile(
                    snapshot.docs.map((doc) => ({
                        data: doc.data(),
                    }))
                )
            );
    }, []);
    // console.log(profile?.data?.profilepic);
    const [profileimage, setprofileimage] = useState();
    const [pic1, setpic1] = useState();
    const [pic2, setpic2] = useState();
    const [profilee, setprofilee] = useState([]);
    useEffect(() => {
        db.collection("users")
            .where("uid", "==", userid)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    setprofilee(doc.data());
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }, []);
    console.log(profilee);
    useEffect(() => {
        if (profilee) {
            console.log(profilee);
            setprofileimage(profilee.profilepic ? profilee.profilepic : "");
            setpic1(profilee.pic1 ? profilee.pic1 : "");
            setpic2(profilee.pic2 ? profilee.pic2 : "");
        }
        //
    }, [profilee]);
    console.log(profileimage);
    // useEffect(() => {
    //     profile?.map(
    //         (profile, index) =>
    //             setprofileimage(
    //                 profile?.data.profilepic ? profile?.data.profilepic : ""
    //             ),
    //         // console.log(profile),
    //         setpic1(profile?.data.pic1 ? profile?.data.pic1 : ""),
    //         setpic2(profile?.data.pic2 ? profile?.data.pic2 : "")
    //     );
    // }, []);
    // console.log(profileimage);
    const [profileimages, setprofileimages] = useState([]);
    useEffect(() => {
        // let profileimages = [];
        // profileimages = [...profileimages, profileimage];
        // profileimages = [...profileimages, pic1];
        // profileimages = [...profileimages, pic2];
        setprofileimages("");
        setprofileimages((state) => [...state, profileimage]);
        setprofileimages((state) => [...state, pic1]);
        setprofileimages((state) => [...state, pic2]);
        // setprofileimages([...profileimages, profileimage]);
        // setprofileimages([...profileimages, pic1]);
        // setprofileimages([...profileimages, pic2]);
    }, [pic1, pic2, profileimage]);
    // profileimages.push(profileimage);
    // profileimages.push(pic1);
    // profileimages.push(pic2);
    // var myArray = profileimages.split(",");

    // profileimages?.map((image) => ({
    //     original: image,
    //     thumbnail: image,
    // }));

    console.log(profileimages.map((profile) => profile));
    return (
        <div>
            heloo {userid}
            {profile?.map((profile, index) => profile.data.name)}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    {profileimage}
                    <br></br>
                    {pic1}
                    <br></br>
                    {pic2}
                    <Profileimagegallery user={userid} images={profileimages} />
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
            </Grid>
        </div>
    );
}

export default Profile;
