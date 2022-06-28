import React, {useState,useEffect} from 'react';
import{useLocation, Link} from 'react-router-dom';
import  Logo from '../asset/tailwind-css-logo.svg'

function Tournament() {
    const location = useLocation();
    const data = location.state;
    const tournament = data.data;
    const color= "bg-green-600";
  
    let playerCount = 0;
    tournament.firstRound.matches.forEach(match=>{
        playerCount+=match.players.length;
    })
    
    const[tabActive,setTabActive] = useState('Round of 8');

    const tabSelection = (tabName)=>{
        setTabActive(tabName);    
    }

    const advanceToNext = (e,round, match, player)=>{
        e.target.classList.add(color);
        match.winner = player;
        
        match.players.forEach(player=>{
            if(player!==match.winner){
                match.loser = player;
            }
        })
       
        if(round==='Round of 8'){            
            if(tournament.secondRound.matches[0].players.length<2){                            
                tournament.secondRound.matches[0].players.push(player)
                
            }else{
                tournament.secondRound.matches[1].players.push(player)
            }
        }
        
        if(round==='Semi-Final'){          
            tournament.final.players.push(player);       
        }
        
        if(tournament.final.players.length>=2){
            tournament.secondRound.matches.forEach(match=>{
                tournament.thirdRound.players.push(match.loser);
            })
        }

        
       
        if(round==='3rd Place'){
            tournament.thirdPlace = player;
        }

        if(round==='Final'){
            tournament.champion = player;
            tournament.final.players.forEach(player=>{
                if(player!==tournament.champion){
                    tournament.runnerUp = player
                }
            })
            tournament.status='Complete';
           
        }
        
        fetch(`http://localhost:8000/tournaments/${tournament.id}`,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(tournament)
          }).then(()=>{          
            console.log('Tournament updated.');
          
          }).catch((e)=>{
            console.log(e.message);
          });    
    }
    
    

  return (
    <div className='sm:w-2/3 sm:mx-auto text-white mb-20'>
    <div className='bg-zinc-700'>
        <div>
            <img src="https://jumpseller.s3.eu-west-1.amazonaws.com/store/juegosya/assets/banner_nintendo.jpg" alt="" />
        </div>
        <div className=' mx-10 py-1'>
            <div className='mt-5 font-bold'>
                <h3>{tournament.game}</h3>
            </div>
            <div className='mt-2 text-sm'>
                <p>{tournament.competitors} Players</p>
                <p>{tournament.type}</p>
                <p className='text-amber-600'>{tournament.game}</p>
            </div>
            <div className='flex my-2'>
                <div className='border w-10 rounded-full mr-2 flex justify-center bg-slate-800'>
                    <img className='w-full p-1' src={Logo} alt="" /> 
                </div>               
                <div className='text-sm'>
                    <p>Organized by</p>   
                    <p className='text-amber-600'>Random User</p>    
                </div>                                                  
            </div>
        </div>
        <div className='mx-auto bg-zinc-800'>
                <ul className='flex w-full text-sm justify-between px-10 py-1'>
                    <li className={tabActive==='Round of 8'?'bg-gray-600 py-0.1 rounded px-2  cursor-pointer':'px-2 cursor-pointer'} ><button disabled={playerCount<8} onClick={()=>{tabSelection('Round of 8')}}>Round of 8</button> </li>
                    <li className={tabActive==='Semi-Final'?'bg-gray-600 py-0.1 rounded px-2  cursor-pointer':'px-2 cursor-pointer'}><button  disabled={playerCount<8} onClick={()=>{tabSelection('Semi-Final')}}>Semi-Final</button></li>
                    <li className={tabActive==='3rd Place'?'bg-gray-600 py-0.1 rounded  px-2 cursor-pointer':'px-2 cursor-pointer'} ><button disabled={playerCount<8} onClick={()=>{tabSelection('3rd Place')}}>3rd Place</button></li>
                    <li className={tabActive==='Final'?'bg-gray-600 py-0.1 rounded px-2  cursor-pointer':'px-2 cursor-pointer'}><button  disabled={playerCount<8} onClick={()=>{tabSelection('Final')}}>Final</button></li>
                    <li className={tabActive==='Result'?'bg-gray-600 py-0.1 rounded px-2  cursor-pointer':'px-2 cursor-pointer'} ><button disabled={playerCount<8} onClick={()=>{tabSelection('Result')}}>Result</button></li>
                </ul>
        </div>
    </div>
    {playerCount<tournament.competitors &&
    <div className='my-2 p-3 bg-zinc-700'>

            <div className='border-l-2 border-stone-600 px-3' > 
                <p>Please add players to the tournament to begin.</p>                      
            </div>  
            <div className='flex justify-center my-2'>              
                <Link  className='bg-blue-400 px-2 py-1 mx-1 rounded' to={`/tournaments/addplayers/${tournament.id}`} state={{id:tournament.id}} >Add Players</Link>
            </div>                                                            
            
    </div>
    }
    
        {(tabActive==='Round of 8' && playerCount===tournament.competitors)?
        <div className='w-full mx-auto text-center mt-5'>
            {tournament.firstRound.matches.map(match=>{
                return(
                <div className='my-3 md:w-1/2 mx-auto'>
                    <h5>{match.matchName}</h5>
                    <button  className={match.winner===match.players[0]?'mx-auto w-2/3 p-1  h-8 bg-green-600 my-1' :' mx-auto w-2/3 p-1 bg-zinc-600  my-1 h-8'} onClick={(e)=>advanceToNext(e,tabActive,match, match.players[0])} disabled={match.winner}>{match.players[0]}</button>
                    <button className={match.winner===match.players[1]?'mx-auto w-2/3 p-1  h-8 bg-green-600':' mx-auto w-2/3 p-1 bg-zinc-600  h-8'} onClick={(e)=>advanceToNext(e,tabActive,match,match.players[1])} disabled={match.winner}>{match.players[1]}</button>
                </div>
                )
            })}
        </div>:''
        }

        {tabActive==='Semi-Final'&&
        <div className='w-full mx-auto text-center mt-5 md:w-1/2 mx-auto'>
            {tournament.secondRound.matches.map(match=>{
                return(
                <div className='my-3'>                   
                    <h5>{match.matchName}</h5>
                    <button className={match.winner===match.players[0]?'mx-auto w-2/3 p-1 h-8 bg-green-600 my-1':' mx-auto w-2/3 p-1 bg-zinc-600  h-8 my-1'} onClick={(e)=>advanceToNext(e,tabActive,match,match.players[0])} disabled={match.winner}>{match.players[0]}</button>
                    <button className={match.winner===match.players[1]?'mx-auto w-2/3 p-1 h-8 bg-green-600':' mx-auto w-2/3 p-1 bg-zinc-600  h-8'} onClick={(e)=>advanceToNext(e,tabActive,match,match.players[1])} disabled={match.winner}>{match.players[1]}</button>
                </div>
            )
        })}
        </div>
        }

        {tabActive==='3rd Place' &&
        <div className='w-full mx-auto text-center mt-5 md:w-1/2 mx-auto'>
                   {console.log(tournament.thirdRound)}
                <div>
                    <h5>{tournament.thirdRound.matchName}</h5>
                    <button className={tournament.thirdRound.winner===tournament.thirdRound.players[0]?'mx-auto w-2/3 p-1 h-8 bg-green-600 my-1':' mx-auto w-2/3 p-1 bg-zinc-600  h-8 my-1'} onClick={(e)=>advanceToNext(e,tabActive,tournament.thirdRound,tournament.thirdRound.players[0])} disabled={tournament.thirdRound.winner}>{tournament.thirdRound.players[0]}</button>
                    <button className={tournament.thirdRound.winner===tournament.thirdRound.players[1]?'mx-auto w-2/3 p-1 h-8 bg-green-600 ':'mx-auto w-2/3 p-1 bg-zinc-600  h-8'} onClick={(e)=>advanceToNext(e,tabActive,tournament.thirdRound,tournament.thirdRound.players[1])} disabled={tournament.thirdRound.winner}>{tournament.thirdRound.players[1]}</button>
                </div>
            
            
        </div>
        }

        {tabActive==='Final' &&
        <div className='w-full mx-auto text-center mt-5 md:w-1/2 mx-auto'>
            
                <div>
                    <h5>{tournament.final.matchName}</h5>
                    <button className={tournament.final.winner===tournament.final.players[0]?'mx-auto w-2/3 p-1 h-8 bg-green-600 my-1':' mx-auto w-2/3 p-1 bg-zinc-600  h-8 my-1'} onClick={(e)=>advanceToNext(e,tabActive,tournament.final,tournament.final.players[0])} disabled={tournament.final.winner}>{tournament.final.players[0]}</button>
                    <button className={tournament.final.winner===tournament.final.players[1]?'mx-auto w-2/3 p-1 h-8 bg-green-600':' mx-auto w-2/3 p-1 bg-zinc-600  h-8'} onClick={(e)=>advanceToNext(e,tabActive,tournament.final,tournament.final.players[1])} disabled={tournament.final.winner}>{tournament.final.players[1]}</button>
                </div>
           
        </div>  
        }

        {tabActive==='Result'&&
            <div className='w-full mx-auto text-center mt-5 md:w-1/2 mx-auto'>
                <div>
                    <h5 className='text-lg font-bold my-1'>Tournament Result</h5>
                    <h6>Champion</h6>
                    <div className='mx-auto w-2/3 p-1   my-1 h-8 bg-yellow-400  font-bold flex justify-center'>
                        <div className=''>{tournament.champion}</div>
                        <div><i className="fas fa-trophy"></i></div>
                    </div>
                    <h6 className='mt-3'>Runner Up</h6>
                    <div className='mx-auto w-2/3 p-1 bg-slate-400  my-1 h-8  font-bold'>
                        {tournament.runnerUp}
                    </div>
                    <h6 className='mt-3'>Third Place</h6>
                    <dir className='mx-auto w-2/3 p-1  my-1 h-8 bg-yellow-900 font-bold'>
                        {tournament.thirdPlace}
                    </dir>
                </div>
                <div className='my-5'>
                    <p>Thank you all for participating in the tournament. Good Game.</p>
                </div>
            </div>
            
        }
    </div>
  )
}

export default Tournament