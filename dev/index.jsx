/* React Component Hierarchy: */
//
//  | App
//    | RecipeBox
//      | Recipe
//      | RecipeEditorModal
//

import React from "react";
import ReactDOM from "react-dom";
import ReactBootstrap from "react-bootstrap";

// Importing React-Bootstrap Components
var Well = ReactBootstrap.Well;
var PanelGroup = ReactBootstrap.PanelGroup;
var Panel = ReactBootstrap.Panel;
var Accordion = ReactBootstrap.Accordion;
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var Form = ReactBootstrap.Form
var FormGroup = ReactBootstrap.FormGroup;
var Col = ReactBootstrap.Col;
var FormControl = ReactBootstrap.FormControl;
var ControlLabel = ReactBootstrap.ControlLabel;
var Checkbox = ReactBootstrap.Checkbox;


class Recipe extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Recipe = an object containing: name, ingredients (comma separated), directions.
    var ingredients = [];

    // Giving the Ingredients list a heading.
    const ingredientsHeader = <ListGroupItem bsStyle="info">Ingredients</ListGroupItem>;
    ingredients.push(ingredientsHeader);

    // Populating the Ingredients list with stored comma-separated ingredients.
    var ingredientsArr = this.props.recipe.ingredients.split(",");
    ingredientsArr.forEach((ingredient) => {
      ingredients.push(
        <ListGroupItem>
          <Checkbox>{ingredient}</Checkbox>
        </ListGroupItem>
      );
    });

    return (
      <Panel header={this.props.recipe.name} collapsible>
        <ListGroup>
          <ListGroup>
            {ingredients}
          </ListGroup>
          <ListGroupItem bsStyle="info">
            Instructions
          </ListGroupItem>
          <ListGroupItem>
            {this.props.recipe.instructions}
          </ListGroupItem>
        </ListGroup>
        <Button bsStyle="danger" className='button'>Delete</Button>
        <Button bsStyle="primary" className='button'>Edit</Button>
      </Panel>
    );
  }
}

class RecipeEditorModal extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <Modal
        show={this.props.visibility}
        onHide={this.props.hide}
        container={this}
        aria-labelledby="contained-modal-title"
        >
        <Modal.Header closeButton>
          <Modal.Title>New Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup>
              <ControlLabel>Recipe Name</ControlLabel>
              <FormControl
                type="text"
                placeholder="Here, give your recipe a name."
                className="modal-form-control"
                />
              <ControlLabel>Ingredients</ControlLabel>
              <FormControl
                type="text"
                placeholder="Here, list the ingredients, each separated by a comma."
                className="modal-form-control"
                />
              <ControlLabel>Directions</ControlLabel>
              <FormControl
                type="text"
                placeholder="Here, write the steps required to cook this recipe."
                className="modal-form-control"
                />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" onClick={this.props.hide}>Add</Button>
          <Button bsStyle="danger" onClick={this.props.hide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class RecipeBox extends React.Component {
  constructor(props) {
    super(props);
    const starterRecipes = [
      {
        name: "The Ultimate Base",
        ingredients: "Onion, garlic, mushrooms, oil",
        instructions: "In a large pan, heat oil over medium heat and cook onion for 1-2 minutes. Add the onions and garlic and then cook for 1 minute."
      },
      {
        name: "Coconut Curry Lentil Soup",
        ingredients: "Coconut oil, onion, garlic, ginger, tomato paste, curry powder, red pepper flakes, vegetable broth, coconut milk, diced tomatos, lentils, salt, pepper",
        instructions: "In a stockpot, heat the coconut oil over medium heat and stir-fry the onion, garlic and ginger until the onion is translucent, a couple minutes. Add the tomato paste (or ketchup), curry powder, and red pepper flakes and cook for another minute. Add the vegetable broth, coconut milk, diced tomatoes and lentils. Cover and bring to a boil, then simmer on low heat for 20-30 minutes, until the lentils are very tender. Season with salt and pepper."
      }
    ];
    this.state = {
      recipes: starterRecipes,
      modalVisibility: false
    }

    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
  }

  hideModal() {
    this.setState({ modalVisibility: false });
  }

  showModal() {
    this.setState({ modalVisibility: true });
  }

  addRecipe(recipe) {
    // React states are immutable.
    // To add a recipe, a new state with the new recipe appended must be created.
    var newRecipesState = this.state.recipes.slice()
    newRecipesState.push(recipe)

    this.setState({
      recipes: newRecipesState
    });
  }


  render() {

    var recipesArr = this.state.recipes;

    console.log(recipesArr);

    var recipes = [];
    recipesArr.forEach((recipe, index) => {
      recipes.push(<Recipe recipe={recipe}/>)
    })

    return (
      <div className="recipe-box-container">
        <RecipeEditorModal
          visibility={this.state.modalVisibility}
          recipes={this.state.recipes}
          addRecipe={this.addRecipe}
          hide={this.hideModal}/>
        <Accordion>
          {recipes}
        </Accordion>
        <Button
          bsStyle="primary"
          className='button'
          onClick={this.showModal}>
          Add Recipe
        </Button>
      </div>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className='header'>
          <h1>Recipe Box</h1>
        </div>
        <RecipeBox />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
