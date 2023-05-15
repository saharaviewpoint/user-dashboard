// import { db } from "../firebase/config"
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import moment from "moment";
import { useState } from "react";
// import { useAuthContext } from "./useAuthContext"

export default function useSendMessage() {
  const [error, setError] = useState(null);
  //   const { user } = useAuthContext();
  const sendMessage = async (threadID, message, timeStamp) => {
    setError(null);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    try {
      await addDoc(collection(db, "messages", threadID, "messages"), {
        message: message,
        sender: userInfo.id,
        sender_name: userInfo.firstname,
        time_stamp: timeStamp,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, sendMessage };
}
