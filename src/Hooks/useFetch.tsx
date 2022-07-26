import { useState , useEffect} from 'react'
import axios from 'axios'

function useFetch(url, user, userUrl, collectionUrl) {

  const [data, setData] : any = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentUser, setCurrentUser] = useState([])
  const [collections, setCollections] : any = useState([])

  useEffect(() => {
    console.log('innn')
    if(user){

        fetchUser(userUrl,url);
        // refetch(url, false)
        
      }else{
    const currentDate = new Date().getTime();

    if(localStorage.getItem('date') && localStorage.getItem('cachedPosts')){
        console.log('yoohoo')
        const oldDate = localStorage.getItem('date');
        // @ts-ignore
        const olDate = parseInt(oldDate)
        if(currentDate - olDate >= 3600000){
          localStorage.removeItem("date");
          localStorage.removeItem('cachedPosts')
            refetch(url, false);

      }
      else{
        let obj = localStorage.cachedPosts;
        // console.log(obj)
        setData((prevPosts => [...JSON.parse(obj)]))
      }
    }else{
        refetch(url, true);
        console.log('wohoo');
      }
      console.log('test')
  if(localStorage.getItem('collections')){
        const oldDate = localStorage.getItem('date');
        // @ts-ignore
        const olDate = parseInt(oldDate)
        if(currentDate - olDate >= 3600000){
          localStorage.removeItem('collections')
            fetchCollection(collectionUrl, false);

      }
      else{
        let obj = localStorage.collections;
        // console.log(obj)
        setCollections((prevPosts => [...JSON.parse(obj)]))
      }
    } else{
        fetchCollection(collectionUrl, true);
    }}

    
      
},[url])

const fetchCollection = (collectionUrl, first) => {
    setLoading(true);
   axios.get(collectionUrl)
    .then((res) => {

        if(first){
            const cache = [...res.data]
            
          localStorage.setItem('collections', JSON.stringify(cache));
          setCollections(cache)
        }else{
            setCollections(prevPosts => ([...res.data]))
        }
        
       
    })
    .catch((err) => {
        setError(err)
    })
    .then(() => {
        refetch(url, false);
    })

    .catch((err) => {
        setError(err)
    })
    .finally(() => {
        setLoading(false)
    })
  }


    const fetchUser = (userUrl, url) => {
        setLoading(true);
       axios.get(userUrl)
        .then((res) => {

            setCurrentUser(res.data);
            refetch(url, false)
           
        })
        .catch((err) => {
            setError(err)
            console.log(err)
        })
        .finally(() => {
            setLoading(false)
        })
      }

  const refetch = (url, first) => {
    setLoading(true);
   axios.get(url)
    .then((res) => {
       
        
        if(first){
            const cache = [...res.data]
            
          localStorage.setItem('cachedPosts', JSON.stringify(cache));
          setData(cache)
        }else{
            setData(prevPosts => ([...prevPosts, ...res.data]))
        }
          const date = new Date().getTime().toString()
          localStorage.setItem('date', date);
    })
    .catch((err) => {
        setError(err)
    })
    .finally(() => {
        setLoading(false)
    })
  }

  const collectionPhotos = (collectionPhotosUrl) => {
        setLoading(true);
       axios.get(collectionPhotosUrl)
        .then((res) => {   
                setData([...res.data])
        })
        .catch((err) => {
            setError(err)
        })
        .finally(() => {
            setLoading(false)
        })
    
  }

  return {data, loading, refetch, error , currentUser, fetchUser, collections, collectionPhotos}
}

export default useFetch