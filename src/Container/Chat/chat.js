import { io } from 'socket.io-client';
import {CHAT_URL} from '../../Utils/Base.js'
import { useEffect, useMemo, useState } from 'react';

function Chat(props) {
    const socket = useMemo(() => io(CHAT_URL), []);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(message);
        socket.emit("message", message)
    }
    
    useEffect(() => {
        socket.on('connect', () => {
            console.log("Client connect at: ", socket.id);
        });

        socket.on("Welcome", (msg) => {
            console.log(msg)
        })

        socket.on("recceive_msg", (msg) => {
            console.log(msg)
            setMessages((prev) => [...prev, msg])
        })

        return () => {
            socket.off('connect');
            socket.off('Welcome');
            socket.off('recceive_msg');
        };
    }, [socket])

    return (
        <div style={{margin: '100px', border: '1px solid black', padding: '100px'}}>
            <p>sddddddddddddddddddddddddddddddddddddddddddddsddddddddddddddddddddddddddddddddddddddddddddsddddddddddddddddddddddddddddddddddddddddddddsdddddddddddddddddddddddddddddddddddddddddddd</p>            
            <form onSubmit={handleSubmit}>
                <input 
                    name="message" 
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <input type="submit" />
            </form>

            {messages.map((m) => (
                <span >{m}</span>
            ))}
        </div>
    );
}

export default Chat;