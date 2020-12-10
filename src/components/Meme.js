import React,{ useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Meme.css';

function Meme() {
    const history = useHistory();
   const[memes,setMemes] = useState([]);
   const[memecount,setMemecount] = useState(0);
   const[captions,setCaptions] = useState([]);

   const shuffleMemes = (array) => {
       for(let i = array.length -1;i > 0; i--){
           const j = Math.floor(Math.random() * i);
           const temp = array[i];
           array[i]= array[j];
           array[j] = temp;
       };
   }

  useEffect(() => {
      fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then( data =>{
          //console.log(data.data.memes)
          shuffleMemes(data.data.memes);
         setMemes(data.data.memes)
        })
   },[]);

   useEffect(() => {
       if(memes.length){
        setCaptions(Array(memes[memecount].box_count).fill(''));
       }
  },[memes,memecount])

   const generateMeme = () =>{
       const currentMeme = memes[memecount];
       const formData = new FormData();

       formData.append('username', process.env.REACT_APP_USERNAME);
       formData.append('password', process.env.REACT_APP_PASSWORD);
       formData.append('template_id', currentMeme.id);
       captions.forEach((c,index) => formData.append(`boxes[${index}][text]`,c));

       fetch('https://api.imgflip.com/caption_image',{
           method:'POST',
           body: formData
       }).then(response => response.json())
         .then( data => {
             history.push(`/view?url=${data.data.url}`)
         })
   }

   const updateChange = (e,index) =>{
       const text = e.target.value || '';
       setCaptions(captions.map((c,i) => {
           if(index === i){
               return text;
           } else {
               return c;
           }
       }))
   }

const handleSkip = () => {
      setMemecount(memecount+1);
  }



    return (
              memes.length ? 
               <div className="meme_container">
                  <h1>Meme Producer App</h1>
                  <button onClick={generateMeme} className="meme_generate">Generate</button>
                  <button onClick={handleSkip} className="meme_skip">Skip</button>
                  {
                      captions.map((c,index) => (
                          <input type="text" key={index} onChange={(e) => updateChange(e,index)}/>
                      ))
                  }
                  <img src={memes[memecount].url} alt="Meme"/> 
               </div>
               : <></>
        
    )
}

export default Meme;
