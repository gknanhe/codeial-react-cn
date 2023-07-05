import { useEffect } from "react";
import { getPost } from "../api";

function App() {

  useEffect(()=>{
    const fetchPost = async()=>{
      const response = await getPost();
      console.log(response);
    };

    fetchPost();
  },[])

  return (
    <div className="App">
       <h1>chall be</h1>
    </div>
  );
}

export default App;
