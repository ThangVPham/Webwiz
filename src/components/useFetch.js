const { useEffect, useState } = require("react");
const useFetch = (url)=> {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

useEffect(()=>{    

            fetch(url)
                .then((res)=>{
                    if(!res.ok){
                        throw Error('Houston, we have an error!');
                    }
                    return res.json()
                }).then((data)=>{
                    
                     setError(null);
                     setData(data);
                     setIsPending(false);

                }).catch((e)=>{

                    setIsPending(false);
                    setError(e.message);
            })
        }
    
,[]);
    return {data, isPending, error}
}

export default useFetch;