import logo from './logo.svg';
import './App.css';
import React , {useEffect , useState} from 'react';
import Recipe from './Recipe'
  

const App = () => {
  const APP_ID = "1e9f912a";
  const APP_KEY = "e135dba0503d002abf47ee5a16e50fed";

  const[recipes , setRecipe] = useState([]);
  const[search, setSearch] = useState("");
  const[query, setQuery] = useState('chicken');

  useEffect(() => {
    getReceipes();
  }, [query]);

  const getReceipes = async () => {

    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipe(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form"> 
       
        <input className="search-bar"  type="text" value={search} onChange={updateSearch}/>
        <button className="search-button"  type="submit"> Search </button>
      
      </form>
      <div className="recipes">
      {
        recipes.map(recipe => (
          <Recipe
          key = {recipe.recipe.label} 
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          />

        ))
      }
    </div>
    </div>

  );
};

export default App;
