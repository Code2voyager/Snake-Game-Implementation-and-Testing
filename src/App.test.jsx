 <reference types="vitest" />
import {render,screen} from '@testing-library/react';
import SnakeGame from './App.jsx';
import { describe, expect, it } from 'vitest';

describe('SnakeGame Game', () => { 
    it('renders the game board',()=>{
        render(<SnakeGame/>);
        const board = screen.getByTestId('game-board');
        expect(board).toBeInTheDocument();
    })
});

// import { render, screen } from '@testing-library/react';
// import { describe, it, expect } from 'vitest';
// import App from './App.jsx';  

// describe('SnakeGame Game', () => {
//   it('renders the game board', () => {
//     render(<App />);  
//     const board = screen.getByTestId('game-board');  
//     expect(board).toBeInTheDocument();  
//   });
// });
