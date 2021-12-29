import { useContext, useEffect, useState } from "react";
import { authContext } from "../AuthProvider";
import { ref, listAll } from "firebase/storage";
import { auth,storage, firestore} from "../firebase";
import { collection, query, where, onSnapshot,addDoc,getDocs} from "firebase/firestore";
import VideoCard from "./videoCard";
import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app"
import { doc, setDoc } from "firebase/firestore";
import "./home.css";
import {uploadBytesResumable, getDownloadURL } from "firebase/storage";

const db = getFirestore();
let Home = () => {
  let user = useContext(authContext);
  let [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log("useEffect")
    let arr = [];
    async function GetADocument(){
      var q=collection(db,"posts");
      const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    var x=doc.data();
    arr.push(x);
    console.log(x.Url);
  },[]);
  setPosts(arr);
    }
    GetADocument();
  }, []);
  return (
    <>
      <div className="video-container">
      {
      posts.map((el) => {
          return <VideoCard key={el.Url} data={el.Url} name={el.uName} upper={el.userId} />;
        })}
      </div>

      <button
        className="home-logout-btn"
        onClick={() => {
            console.log("hbjd");
            auth.signOut();
        }}
      >
        Logout
      </button>
      <input
        type="file"
        onClick={(e) => {
          e.currentTarget.value = null;
        }}
        onChange={(e) => {
          let videoObj = e.currentTarget.files[0];
          let { name, size, type } = videoObj;

          size = size / 1000000;

          if (size > 10) {
            alert("file size exceeds 10mb");
            return;
          }

          type = type.split("/")[0];

          if (type !== "video") {
            alert("Please upload a video file");
            return;
          }

          let storageRef =ref(storage,`/posts/${user.uid}/${Date.now() + "-" + name}`);
          const metadata = {
            contentType: 'video/mp4'
          };
          const uploadTask = uploadBytesResumable(storageRef,videoObj, metadata);
          console.log(storageRef);
          uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      async function AddDocument_AutoID(){var ref=collection(db,"posts");
      const docref=await addDoc(
        ref,{
          likes:[],
        comments:[],
        Url:downloadURL,
        uName : user.displayName,
        userId : user.uid,
        }
      )
      .then(()=>{
        alert("data added successfully");
      })
      .catch((error)=>{
        alert("cfdvh");
      })}
      AddDocument_AutoID();
    });
  }
);
        }}
      />
    </>
  );
};
export default Home;