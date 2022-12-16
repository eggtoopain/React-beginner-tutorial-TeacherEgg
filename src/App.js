const App = () => {
  const [pokemons, setPokemons] = React.useState([]);
  const [filteredPokemons, setFilteredPokemons] = React.useState([]);

  React.useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then(res => res.json())
      .then(json => {
        json.results.map((result, index) => {
          result.id = index + 1;
        });
        setPokemons(json.results);
        setFilteredPokemons(json.results);
      });
  }, []);
  
  const onChangeHandler = event => {
    const comparedPokemons = pokemons.filter(pokemon => {
      return pokemon.name.includes(event.target.value);
    });
    setFilteredPokemons(comparedPokemons);
  };

  return (
    <div>
      <h1>宝可梦</h1>
      <Input onChangeHandler={onChangeHandler}/>
      <Lists pokemonsLists={filteredPokemons} />
    </div>
  );
};

/*
class App extends React.Component {
  constructor() {
    console.log("构造函数");

    super();
    this.state = {
      pokemons: [],
      filteredPokemons: [],
    };
  }

  componentDidMount() {
    console.log("组件已挂载");

    fetch("https://pokeapi.co/api/v2/pokemon")
      .then(res => res.json())
      .then(json => {
        json.results.map((result, index) => {
          result.id = index + 1;
        });
        this.setState(
          () => {
            return { 
              pokemons: json.results,
              filteredPokemons: json.results,
            };
          },
          () => {
            console.log( this.state );
          }
        );
      });
  }

  onChangeHandler = event => {
    const comparedPokemons = this.state.pokemons.filter(pokemon => {
      return pokemon.name.includes(event.target.value);
    });

    this.setState(
      () => {
        return { filteredPokemons: comparedPokemons };
      },
      () => {
        console.log( this.state.searching );
    });
  }

  render() {
    console.log("渲染");

    return ( 
      <div>
        <h1>宝可梦</h1>
        <Input onChangeHandler={this.onChangeHandler}/>
        <Lists pokemonsLists={this.state.filteredPokemons} />
      </div>
    );
  }
}
*/
