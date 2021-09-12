import './App.css';
import CardTemplate from './Card';
import AutoCorrect from './Autocorrect';

const opis = {
  "title":"autocorrect", 
  "description":
  `Javascript autocorrect written in React.js by. The words are taken from the titles of articles on Wikipedia, 
  this allows you to use words as well as proper names like "Pewdiepie" or "Quebonafide". The style of the app
   comes from the Material UI framework. If you like my code, feel free to copy and use it, however, don't forget to add a comment
    next to the code where it is from. And please follow me on github :)`, 
  "learnmore":"https://github.com/BartekK2/autocorrect-reactjs", "effect":<AutoCorrect></AutoCorrect>
}

function App() {
  return (
    <>
      <div style={
        {
          'display': 'flex',
          'flexDirection':'column',
          'justifyContent': 'center',
          'alignItems': 'center',
        }
      }>
        <CardTemplate title={opis.title} description={opis.description} learnmore={opis.learnmore}>{opis.effect}</CardTemplate>
        </div>
   </>
   );
}

export default App;
