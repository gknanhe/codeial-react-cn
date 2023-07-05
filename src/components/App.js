import { useEffect , useState} from "react";
import { getPost } from "../api";
import Loader from "./Loader";
import Home from '../pages/Home';

function App() {

  const [posts, setPost] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(()=>{
    const fetchPost = async()=>{
      const response = await getPost();
      if(response.success){
        setPost(response.data.posts);
      };

      setLoader(false);

      console.log(response);
    };

    fetchPost();
  },[])


  if(loader){
    return <Loader />
  }
  return (
    <div className="App">
      <Home posts={posts}/>
    </div>
  );
}

export default App;
