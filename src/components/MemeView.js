import React,{ useState} from 'react';
import './MemeView.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useClipboard } from 'use-clipboard-copy';

function MemeView() {

    const clipboard = useClipboard();
    const history = useHistory();
    const location = useLocation();
    const url = new URLSearchParams(location.search).get('url');

    const[copy,setCopy] = useState(false);

    const copyLink = () => {
        clipboard.copy(url);
        setCopy(true);
    }


    return (
        <div className = 'memeview_container'>
           <button onClick ={() => history.push('/')} className="memeview_button">Make More Memes</button>
            { url && <img src={url} alt="MemeImage" />}
            <button onClick ={copyLink} className="memeview_copy">
                { copy ? 'Link Copied' : 'Copy Link'}
            </button>
        </div>
    )
}

export default MemeView
