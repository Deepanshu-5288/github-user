import { createContext, useContext, useEffect, useState } from "react";
import mockFollowers from "./mockData/mockFollowers";
import mockRepos from "./mockData/mockRepos";
import mockUser from "./mockData/mockUser";
import axios from "axios";

const rate_limit_url = "https://api.github.com/rate_limit";
const rootUrl = "https://api.github.com/";
const AppcContext = createContext();

const AppProvider = (({children}) => {
    
    const [gitUser, setGitUser] = useState(mockUser);
    const [gitFollowers, setGitFollowers] = useState(mockFollowers);
    const [gitRepos, setGitRepos] = useState(mockRepos);
    const [requests, setRequests] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({
        show:false,
        msg:""
    });

    const searchGitUser = async (user) =>{
        toggleError();
        setIsLoading(true);
        const response = await axios(`${rootUrl}users/${user}`).catch((error) => console.log(error))
        if(response){
            setGitUser(response.data);
            const {login, followers_url} = response.data;

            await Promise.allSettled([
                axios(`${rootUrl}users/${login}/repos?per_page=100`),
                axios(`${followers_url}?per_page=100`)
            ])
            .then((results) =>{
                const [repos, followers] = results;
                const status = 'fulfilled';
                if(followers.status === status){
                    setGitFollowers(followers.value.data);
                }
                if(repos.status === status){
                    setGitRepos(repos.value.data);
                }

            }).catch((error) => console.log(error))
        }else{
            toggleError(true, "there is no user with that username")
        }
        checkRequests();
        setIsLoading(false);
    }

    const checkRequests =  () => {
        axios(rate_limit_url).then(({data}) =>{
            let {
                rate: { remaining },
              } = data;
              setRequests(remaining);
            if(remaining === 0){
                toggleError(true, "sorry, you have exceeded your hourly rate limit!")
            }
        })
        .catch((error) => setError(error));
        // setRequests(response.data)
    }

    function toggleError(show = false, msg = '') {
        setError({ show, msg });
      }
    useEffect(checkRequests, []);

    useEffect(() =>{
        searchGitUser("deepanshu-5288")
    }, [])

    return <AppcContext.Provider value={{gitUser, gitFollowers,gitRepos, error, requests, searchGitUser, isLoading}}>
        {children}
    </AppcContext.Provider>
})

export const useGlobalContext = () =>{
    return useContext(AppcContext);
}

export {AppProvider, AppcContext};