import React, {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import useFetch from './useFetch';

function Form({navigation}) {
  const[name,setName] = useState('');
  const[description, setDescription] = useState('');
  const[type,setType] = useState('Single Elimination');
  const[game,setGame] = useState('');
  const[date, setDate] = useState('');
  const[competitors, setCompetitors] = useState(8);
  const[status] = useState('Pending');
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
    const tournament = {name, description, type, game, date, competitors, status};
    tournament.firstRound = {
      matches:[{
        matchName:"",
        players:[],
        winner:"",
        loser:""
      }]
    };
    tournament.secondRound ={};
    tournament.champion='';
    tournament.runnUp ='';
    tournament.thirdPlace = '';
    
    tournament.secondRound.matches = [
      {
          matchId:5,
          matchName:"Match E",
          players:[],
          winner:"",
          loser:""
      },
      {
          matchId:5,
          matchName:"Match E",
          players:[],
          winner:"",
          loser:""
      }
  ];
  tournament.thirdRound = {
      matchId:7,
      matchName:"Match G",
      players:[],
      winner:"",
      loser:""
  };
  tournament.final = {
      matchId:8,
      matchName:"Match H",
      players:[],
      winner:"",
      loser:""
  }
  console.log('post');
    fetch('http://localhost:5000/new-tournaments',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(tournament)
    }).then(()=>{
      navigate('/');
    });
  }
  
  return (
    <div className=' mx-5 mt-5 text-white md:w-2/3 lg:w-1/3 md:mx-auto'>
        <form onSubmit={handleSubmit} className=' w-full '>
          <div className='my-3 '>      
            <div className='font-bold bg-slate-800 '>
              <h3 className='py-2 px-5'>Basic Info</h3>
            </div>
            <div className='bg-gray-700 '>
              <div className='pt-2 pb-1 px-5'>
                <label>Tournament name</label>
              </div>
              <div className='pb-2 px-5'>
                <input className=' bg-slate-800 w-full' 
                type="text" required 
                value={name} 
                onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div className='pt-2 pb-1 px-5'>
                <label>Description</label>
              </div>
              <div className='pb-2 px-5'>
                <textarea className=' bg-slate-800 w-full' 
                type="text"
                value={description}
                onChange={(e)=>setDescription(e.target.value)} />
              </div>
            </div>
            
          </div>
          <div className='border border-slate-800 rounded'>
            <div className='font-bold bg-slate-800'>
              <h3 className='py-2 px-5'>Game Info</h3>
            </div>
            <div className='bg-gray-700 '>
              <div className='pt-2 pb-1 px-5'>
                <label>Game Title</label>
              </div> 
              <div className='pb-2 px-5'>
                <input className=' bg-slate-800 w-full' 
                required
                type="text" 
                value={game}
                onChange={(e)=>setGame(e.target.value)}/>
              </div>
              <div className='pt-2 pb-1 px-5'>
                <label>Format</label>
              </div> 
              <div className='pb-2 px-5'>
                <select className=' bg-slate-800 w-full'  name="game-type" id="game-type"
                value={type}
                onChange={(e)=>setType(e.target.value)}
                required
                >
                  <option value="Single Elimination">Single Elimination</option>
                  <option value="Leaderboard">Leaderboard</option>
                  <option value="Free for All">Free for All</option>
                </select>
              </div>
              <div className='pt-2 pb-1 px-5'>
                <label>Number of Competitors</label>
              </div> 
              <div className='pb-2 px-5'>
                <input type="radio" id='4 players' name='player' disabled value={competitors} onSelect={()=>setCompetitors(4)}/>
                <label for = "4 players"
                > 4 players &nbsp;&nbsp;</label>
                <input  type="radio" id='8 players' name='player'  value={competitors} onSelect={()=>setCompetitors(8)}/>
                <label for="8 players"> 8 players</label>              
              </div>  
              <div  className='pt-2 pb-1 px-5'>
                <label htmlFor="">Start Time</label>
              </div>
              <div className='pt-1 pb-3 px-5 '>
                <input className='w-full bg-slate-800' type="date" required value={date} onChange={(e)=>setDate(e.target.value)}/>
              </div>                    
            </div>
          
          </div>
          <div className='bg-amber-600 rounded my-6 w-1/2 text-center mx-auto text-white'>
            <button type='submit'>Save and Continue</button>
          </div>
        </form>
        <div>

        </div>
    </div>
  )
}

export default Form