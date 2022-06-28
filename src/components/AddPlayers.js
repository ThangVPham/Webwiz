import React, {useEffect, useState} from 'react';
import{useLocation} from 'react-router-dom';
import useFetch from './useFetch';


function AddPlayers() {
    const location = useLocation();
    const tournamentId = location.state.id;
    const url=`http://localhost:8000/tournaments/${tournamentId}`;
    const navigate = useLocation();

    const [competitorA, setCompetitorA] = useState('')
    const [competitora, setCompetitora] = useState('')
    const [competitorB, setCompetitorB] = useState('')
    const [competitorb, setCompetitorb] = useState('')
    const [competitorC, setCompetitorC] = useState('')
    const [competitorc, setCompetitorc] = useState('')
    const [competitorD, setCompetitorD] = useState('')
    const [competitord, setCompetitord] = useState('')

    const{data:tournament, isPending, error} = useFetch(url);
    
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

        fetch(url,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(tournament)
          }).then(()=>{
            navigate(`/`);
          });
    }


  return (
    <div className='w-full mx-auto text-center mt-5 text-white'>
        <form onSubmit={addPlayers}>
            <div>
                <h5>Match A</h5>
                <div className='my-1' >
                    <input className='bg-zinc-600 ' type="text " value={competitorA} onChange={(e)=>setCompetitorA(e.target.value)}/>
                </div>
                <div>
                    <input className='bg-zinc-600 ' type="text " value={competitora} onChange={(e)=>setCompetitora(e.target.value)}/>
                </div>
                
            </div>
            <div>
                <h5>Match B</h5>
                <div className='my-1'>
                    <input className='bg-zinc-600 ' type="text " value={competitorB} onChange={(e)=>setCompetitorB(e.target.value)}/>
                </div>
                <div>
                    <input className='bg-zinc-600 ' type="text " value={competitorb} onChange={(e)=>setCompetitorb(e.target.value)}/>
                </div>
            </div>
            <div>
                <h5>Match C</h5>
                <div className='my-1'>
                    <input className='bg-zinc-600 ' type="text " value={competitorC} onChange={(e)=>setCompetitorC(e.target.value)}/>
                </div>
                <div>
                    <input className='bg-zinc-600 ' type="text " value={competitorc} onChange={(e)=>setCompetitorc(e.target.value)}/>    
                </div>
            </div>
            <div>
                <h5>Match D</h5>
                <div className='my-1'>
                    <input className='bg-zinc-600 ' type="text " value={competitorD} onChange={(e)=>setCompetitorD(e.target.value)}/>
                </div>
                <div>
                    <input className='bg-zinc-600 ' type="text " value={competitord} onChange={(e)=>setCompetitord(e.target.value)}/>
                </div>
            </div>
            <button type='submit'>Add Players</button>
        </form>


    </div>
  )
}

export default AddPlayers