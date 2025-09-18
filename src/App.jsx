import { useEffect,useRef,useState } from 'react'
import './App.css'

function App() {
  const gridsize = 10;
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150},
  ]);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState({x: Math.floor(Math.random() * (300 / gridsize)) * gridsize,
    y: Math.floor(Math.random() * (300 / gridsize)) * gridsize,});


  //restart game 
  const [gameOver, setGameOver] = useState(false);
  
  //for snake movement
  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const context = canvas.getContext('2d');
  
    const drawsnake = () => {
      snake.forEach(segment => {
        context.fillStyle = 'green';
        context.fillRect(segment.x, segment.y, gridsize, gridsize);
        context.strokeStyle = 'red';
        context.strokeRect(segment.x, segment.y, gridsize, gridsize);  
      });
    };
    context.fillStyle = 'blue';
    context.fillRect(food.x, food.y, gridsize, gridsize);


    const interval = setInterval(() => {
      //moving the snake
      setSnake(prev =>{
        const newSnake = [...prev];
        const head = {...newSnake[newSnake.length - 1]};

        if(head.x === food.x && head.y === food.y){
          newSnake.push({...head});
          setFood({
            x: Math.floor(Math.random() * (300 / gridsize)) * gridsize,
            y: Math.floor(Math.random() * (300 / gridsize)) * gridsize,
          });
        }

        switch(direction) {
          case "UP":head.y -= gridsize; break;
          case "DOWN":head.y += gridsize; break;
          case "LEFT":head.x -= gridsize; break;
          case "RIGHT":head.x += gridsize; break;
          default: break;
        }
        //wall collision
        if(head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height){
          alert("Game Over");
          // window.location.reload();
          setGameOver(true);
          clearInterval(interval);
          return prev;
        }
        newSnake.push(head);
        newSnake.shift();
        return newSnake;
      })
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawsnake();
    },200);
    return () => clearInterval(interval);

},[snake, direction, food.x, food.y]);


 
//keys arrow
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch(event.key){
        case "ArrowUp": setDirection("UP"); break;
        case "ArrowDown": setDirection("DOWN"); break;
        case "ArrowLeft": setDirection("LEFT"); break;
        case "ArrowRight": setDirection("RIGHT"); break;
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  },[]);
   return ( 
    <div data-testid="game-board">
      <h1>Welcome to Snake Game</h1>
      {gameOver?(
        <div style={{textAlign:"center"}}>
          <h2>Game Over</h2>
          <button onClick={() => window.location.reload()}>Restart Game</button>
        </div>
      ):(
              <canvas id="gameCanvas" width="300" height="300" ref={canvasRef} style={{border: "1px solid black", display: "block", margin: "20px auto"}}></canvas>

      )}
     
    </div>
  )
}

export default App
