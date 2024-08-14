import axios from "axios";

export const GetAllEstates = async () => {
    try {
      const res = await axios.get("http://10.0.2.2:5000/api/estates");
      
      console.log(res)

    } catch (e) {
      console.log("Network Error:", e.message);
    }

    return res.data;
  };