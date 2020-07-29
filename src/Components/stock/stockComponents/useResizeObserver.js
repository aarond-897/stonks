import { useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useResizeObserver = ref=>{
    const [dimensions, setDimensions] = useState(null);
    useEffect(()=>{
        console.log(ref)
        const observeTarget=ref.current;
        const resizeObserver = new ResizeObserver((entries)=>{
            console.log(entries)
            entries.forEach(entry=>{
                console.log(entry)
                console.log(entry.contentRect)
                setDimensions(entry.contentRect)
            })
        })
        resizeObserver.observe(observeTarget)
        return ()=>{
            resizeObserver.unobserve(observeTarget)
        }
    },[ref])
    console.log(dimensions)
    return dimensions;
}

export default useResizeObserver;


