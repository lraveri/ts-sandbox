import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const App = () => {
    const [name, setName] = useState('');
    const [displayedName, setDisplayedName] = useState('');

    const handleSubmit = (): void => {
        if (!name) return;
        setDisplayedName(name);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    const greet = (name: string): string => {
        return `Hello, ${name}!`;
    };

    return (
        <>
            <h1>React Sandbox</h1>
            <p>Type your name...</p>
            <input onChange={handleChange} value={name} type="text" />
            <button onClick={handleSubmit}>Submit</button>
            {displayedName && <Card title={greet(displayedName)} content="Lorem ipsum...."></Card>}
        </>
    );
};

type CardProps = {
    title: string;
    content: string;
};

const Card = (props: CardProps) => {
    return (
        <div className="card">
            <h3>{props.title}</h3>
            <p>{props.content}</p>
        </div>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
