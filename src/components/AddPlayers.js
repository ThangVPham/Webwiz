import React, {useEffect, useState} from 'react';
import{useLocation} from 'react-router-dom';
import useFetch from './useFetch';


function AddPlayers() {
    const location = useLocation();
    const tournamentId = location.state.id;
  
    const url=`https://webwiz-server.herokuapp.com/tournaments/${tournamentId}`;
    const url_addplayers = `https://webwiz-server.herokuapp.com/addplayers/${tournamentId}`
  

    const [competitorA, setCompetitorA] = useState('')
    const [competitora, setCompetitora] = useState('')
    const [competitorB, setCompetitorB] = useState('')
    const [competitorb, setCompetitorb] = useState('')
    const [competitorC, setCompetitorC] = useState('')
    const [competitorc, setCompetitorc] = useState('')
    const [competitorD, setCompetitorD] = useState('')
    const [competitord, setCompetitord] = useState('')

    const{data:tournament, isPending, error} = useFetch(url);
    
    useEffect(()=>{
        if(!isPending){
            console.log(tournament)
        }
    },[isPending])

    const addPlayers = (e)=>{
        e.preventDefault();
        
        tournament.firstRound.matches = [{
            matchId:1,
            matchName:"Match A",
            players:[competitorA, competitora],
            winner:"",
            loser:""
        },
        {
            matchId:2,
            matchName:"Match B",
            players:[competitorB, competitorb],
            winner:"",
            loser:""
        },
        {
            matchId:3,
            matchName:"Match C",
            players:[competitorC, competitorc],
            winner:"",
            loser:""
        },
        {
            matchId:4,
            matchName:"Match C",
            players:[competitorD, competitord],
            winner:"",
            loser:""
        }];

        tournament.status = 'In Progress'; 
        console.log('players added')
        fetch(url_addplayers,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(tournament)
          }).then(()=>{
            console.log('players added');
            window.location.href =`/tournaments/${tournamentId}`;
        })
    }


  return (
    <div className='w-full mx-auto text-center mt-5 text-white'>
        <form onSubmit={addPlayers} className='md:w-1/2 md:my-20 mx-auto  rounded'>
            <div className='font-bold bg-slate-800 '>
              <h3 className='py-2 px-5'>Group</h3>
            </div>
            <div className='bg-gray-700 p-3'>
                <div className='mb-5'>
                    <h5>Match A</h5>
                    <div className='my-1' >
                        <input className='bg-zinc-600 ' type="text " value={competitorA} onChange={(e)=>setCompetitorA(e.target.value)} required/>
                    </div>
                    <div>
                        <input className='bg-zinc-600 ' type="text " value={competitora} onChange={(e)=>setCompetitora(e.target.value)} required/>
                    </div>                  
                </div>
                <div className='mb-5'>
                    <h5>Match B</h5>
                    <div className='my-1'>
                        <input className='bg-zinc-600 ' type="text " value={competitorB} onChange={(e)=>setCompetitorB(e.target.value)} required/>
                    </div>
                    <div>
                        <input className='bg-zinc-600 ' type="text " value={competitorb} onChange={(e)=>setCompetitorb(e.target.value)} required/>
                    </div>
                </div>
                <div className='mb-5'>
                    <h5>Match C</h5>
                    <div className='my-1'>
                        <input className='bg-zinc-600 ' type="text " value={competitorC} onChange={(e)=>setCompetitorC(e.target.value)} required/>
                    </div>
                    <div>
                        <input className='bg-zinc-600 ' type="text " value={competitorc} onChange={(e)=>setCompetitorc(e.target.value)} required/>    
                    </div>
                </div>
                <div className='mb-5'>
                    <h5>Match D</h5>
                    <div className='my-1'>
                        <input className='bg-zinc-600 ' type="text " value={competitorD} onChange={(e)=>setCompetitorD(e.target.value)} required/>
                    </div>
                    <div>
                        <input className='bg-zinc-600 ' type="text " value={competitord} onChange={(e)=>setCompetitord(e.target.value)} required/>
                    </div>
                </div>
                <button className='mt-5 px-5 py-2 rounded bg-blue-600' type='submit'>Add Players</button>
            </div>         
        </form>
    </div>
  )
}

export default AddPlayers