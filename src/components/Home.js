import React, {useState, useEffect} from 'react';
import  Icon from '../asset/tailwind-css-logo.svg';
import useFetch from './useFetch';
import {Link} from 'react-router-dom';
function Home() {

  const url = 'http://localhost:5000/';
  const {data:tournaments, isPending, error} = useFetch(url);
  const [tabActive, setTabActive] = useState('All');
  const [filteredList,setFilteredList] = useState(tournaments);


  useEffect(()=>{
    let array=[];
    
    if(tabActive ==='All'){
      setFilteredList(tournaments);
      return;
    }else if(tabActive==='Pending'){
      tournaments.forEach(tournament=>{
        if(tournament.status===tabActive){
          array.push(tournament);
        }
      })
    }else if(tabActive==='In Progress'){
      tournaments.forEach(tournament=>{
        if(tournament.status===tabActive){
          array.push(tournament);
        }
      })
    }else if(tabActive ==='Complete'){
      tournaments.forEach(tournament=>{
        if(tournament.status===tabActive){
          array.push(tournament);
        }
      })
    }
    
    setFilteredList(array);

  },[tabActive,isPending])


  
  function setTab(tab){
    setTabActive(tab);
  }



  return (
    <div className='text-center text-white my-10 md:w-3/4 mx-auto'>
      <div className='bg-stone-800 banner h-80 '>
        <div className='filter'>
          <h1 className='mx-10 mb-20 lg:mb- text-center font-medium text-white text-5xl p-5'>Welcome to WebWiz Tournament</h1>     
          <Link className='bg-amber-600 rounded py-2 px-10  text-center  mx-auto text-base text-white' to='/new' >
            Create A Tournament
          </Link> 
        </div>
    
      </div>
      <div className=' my-10 w-full'>
        <ul className='flex justify-center text-slate-400'>
          <li className={tabActive==='All'?' bg-gray-600 py-0.1 rounded px-5  cursor-pointer':'py-0.1 rounded px-5  cursor-pointer'} onClick={()=>setTab('All')}>All</li>
          <li  className={tabActive==='Pending'?' bg-gray-600 py-0.1 rounded px-5  cursor-pointer':'py-0.1 rounded px-5 cursor-pointer'} onClick={()=>setTab('Pending')}>Pending</li>
          <li  className={tabActive==='In Progress'?' bg-gray-600 py-0.1 rounded px-5 cursor-pointer':'py-0.1 rounded px-5 cursor-pointer'} onClick={()=>setTab('In Progress')}>In Progress</li>
          <li  className={tabActive==='Complete'?' bg-gray-600 py-0.1 rounded px-5 cursor-pointer':'py-0.1 rounded px-5 cursor-pointer'} onClick={()=>setTab('Complete')}>Complete</li>
        </ul>

        <div className='my-3 flex justify-center '>
          <input className='rounded h-12  bg-transparent w-11/12  border border-slate-700' type="text" placeholder='Search your tournaments'/>
        </div>
        {isPending && <div>Loading...</div>}
        {filteredList && filteredList.map( tournament =>{
         
          return(
            <Link to= {`/tournaments/${tournament._id}`} state={{data:tournament}} key={tournament.id}>           
             <div className={tournament.champion?'bg-green-900 my-3 mx-auto w-11/12':'bg-slate-600 my-3 mx-auto w-11/12'} >
                <div className=' flex justify-start my-1'>
                    <div className='w-1/6 sm:w-1/12 p-1 flex align-middle'>
                      <img  src={Icon} alt="icon" className='w-3/5 sm:w-52 mx-auto'/>
                    </div>
                    <div className='w-5/6 sm:w-11/12 p-1 text-start'>                               
                        <div>
                          <div className='font-bold uppercase'>
                          {tournament.name}
                          </div>
                          <div>
                            {tournament.type + ' - ' + tournament.game}
                          </div>
                          <div className='text-sm italic'>
                            Status: {tournament.status}
                          </div>      
                          <div className='text-sm flex justify-between'>
                            <div>
                              {tournament.date}
                            </div>
                            <div className='mr-1'>
                              {tournament.competitors} &nbsp; <i className="fas fa-user"></i>
                            </div>                       
                          </div> 
                          {tournament.champion&&<div>Winner: {tournament.champion}</div>}
                                   
                        </div>                                   
                    </div>
                </div>                       
              </div>
            </Link>
           
          )
        })}
     
    
      </div>
    </div>
  )
}

export default Home

