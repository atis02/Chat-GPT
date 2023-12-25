import React, { useState } from 'react'
import axios from 'axios'

export default function ChatGpt() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const http = 'http://localhost:8020/chat'
    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.post(`${http}`, { prompt })
            .then((res) => setResponse(res.data))
            .catch(error => { setError(error.message) });
        setLoading(false);

    };
    const handlePrompt = (event) => {
        setPrompt(event.target.value)
    };
    return (
        <div className='all'>
            <form onSubmit={handleSubmit} className='form' >
                <input
                    type="text"
                    value={prompt}
                    placeholder='Enter text'
                    className="form-input"
                    onChange={handlePrompt}
                />
                <input type="submit" className='form-button' />
            </form>
            {
                loading ? (<div>Loading...</div>) :
                    error ? (<div>{error}</div>) :
                        (<div className='response'>
                            <p className='response-text'>
                                {response ? response : 'ask me anything I`m Gpt'}
                            </p>
                        </div>)
            }
        </div>
    )
}
