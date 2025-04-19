import { io } from 'socket.io-client';
import { CHAT_URL } from '../../Utils/Base.js'
import { useEffect, useMemo, useState } from 'react';

function Chat(props) {
    const socket = useMemo(() => io(CHAT_URL), []);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [to, setTo] = useState('')
    const [group, setGroup] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(message);
        socket.emit("message", {message, to})
    }

    const handleGroupSubmit = (event) => {
        event.preventDefault()
        socket.emit("group", group)
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
 
        
        <div className="container-fluid contact py-5" style={{marginTop:200}}>
            <div className="container py-5">
                <div className="p-5 bg-light rounded">
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="text-center mx-auto" style={{ maxWidth: 700 }}>

                                <div> <form onSubmit={handleGroupSubmit}>
                                    <input
                                            name="group"
                                            placeholder='Enter the group name'
                                            onChange={(e) => setGroup(e.target.value)}
                                            value={group}
                                        />
                                       
                                        <input type="submit" />
                                    </form></div>
                                <div>
                                    <form onSubmit={handleSubmit}>
                                    <input
                                            name="to"
                                            placeholder='Enter the person Number'
                                            onChange={(e) => setTo(e.target.value)}
                                            value={to}
                                        />
                                        <input
                                            name="message"
                                            placeholder='Enter a Message'
                                            onChange={(e) => setMessage(e.target.value)}
                                            value={message}
                                        />
                                        <input type="submit" />
                                    </form>

                                    {messages.map((m) => (
                                        <p>{m}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;