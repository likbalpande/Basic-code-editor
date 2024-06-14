import { useState } from 'react';
import { HACKER_EARTH_LANGUAGE_FORMAT } from '../configuration/compilerConfiguration';

const useCompileCode = () => {
    const [compiling, setCompiling] = useState(false);
    const [compileError, setCompileError] = useState(null);
    const [outputLink, setOutputLink] = useState(null);

    const getCompilationResult = async (callbackLink) => {
        const res = await fetch(callbackLink, {
            headers: {
                'Content-Type': 'application/json',
                'client-secret': '2cc9633a62b892b84dff0a9a156ceb95260e112a'
            },
        })
        const { result } = await res.json() || {};
        const compileStatus = result.compile_status;
        const runStatus = result.run_status.status;
        console.log(result)
        if (compileStatus != 'OK') {
            console.log('xxx ', compileStatus);
            setCompileError(`Compilation Error: ${compileStatus}`);
            setCompiling(false);
        }
        else if (runStatus === 'AC') {
            console.log('---/ ', result.run_status.output);
            setCompileError(null);
            setOutputLink(result.run_status.output);
            setCompiling(false);
        }
        else if (runStatus === 'RE') {
            console.log('---/ ', result.run_status.output);
            setCompileError(result.run_status.stderr);
            setOutputLink(null);
            setCompiling(false);
        }
    }
    const compileCode = async (code, language) => {
        setCompiling(true);
        const res = await fetch('https://api.hackerearth.com/v4/partner/code-evaluation/submissions/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'client-secret': import.meta.env.VITE_HACKER_EARTH_CLIENT_SECRET
            },
            body: JSON.stringify({
                "lang": HACKER_EARTH_LANGUAGE_FORMAT[language],
                "source": code,
                "input": "",
                "memory_limit": 243232,
                "time_limit": 5,
                "context": { id: 213121 },
                "callback": "https://client.com/callback/"
            })
        });
        const data = await res.json();
        const callbackLink = data.status_update_url;
        [...Array(3).keys()].forEach((key) => {
            setTimeout(() => {
                getCompilationResult(callbackLink);
            }, 1000 * (key + 1)*(key + 1) / 2);
        });
        setCompileError('Something went wrong');
        setTimeout(() => { setCompiling(false) }, 9000);
    }

    return { outputLink, compiling, compileError, compileCode };
}

export default useCompileCode;