import {useReducer} from "react"
import { AudioContext } from "components/AudioContext"

const reducer = (state, action) => {
    switch (action.type) {
        case 'PLAY':
            return {
                ...state,
                src: action.src,
                isPlaying:false,
                isPlay: true,
                isEnd: false,
                ref: action.ref,
            };
        case 'PAUSE':
            return {
                ...state,
                isPlay: false,
                isPlaying:false,
            };
        case 'SET_PLAYING':
            return {
                ...state,
                isPlaying:action.isPlaying,
                isEnd:action.isEnd,
            };
        default:
            return state;
    }
};



export default function AudioProvider({ children }) {
  
 const [state, dispatch] = useReducer(reducer)

  return (
    <AudioContext.Provider value={[state, dispatch]}>

        {children}

    </AudioContext.Provider>
  );
}
