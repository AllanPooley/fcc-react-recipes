/* React Component Hierarchy: */
//
//  | App
//    | RecipeBox
//      | Recipe
//      | RecipeEditorModal


import React from "react";
import ReactDOM from "react-dom";

// Importing React-Bootstrap Components
import { Well } from 'react-bootstrap';
import { PanelGroup } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Checkbox } from 'react-bootstrap';


class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit(e) {
    this.props.showRecipeEditor(this.props.index);
  }

  handleDelete(e) {
    this.props.deleteRecipe(this.props.index);
  }

  render() {
    // Recipe = an object containing: name, ingredients (comma separated), directions.
    var ingredients = [];

    // Giving the Ingredients list a heading.
    const ingredientsHeader = <ListGroupItem bsStyle="info">Ingredients</ListGroupItem>;
    ingredients.push(ingredientsHeader);

    // Populating the Ingredients list with stored comma-separated ingredients.
    var ingredientsArr = this.props.recipe.ingredients.split(",");
    ingredientsArr.forEach((ingredient, index) => {
      ingredients.push(
        <ListGroupItem key={ingredient}>
          <Checkbox key={index}>{ingredient}</Checkbox>
        </ListGroupItem>
      );
    });

    return (
      <Panel header={this.props.recipe.name}
        key={this.props.recipe.name}
        collapsible>
        <ListGroup key={this.props.recipe.name}>
          <ListGroup>
            {ingredients}
          </ListGroup>
          <ListGroupItem bsStyle="info">
            Instructions
          </ListGroupItem>
          <ListGroupItem>
            {this.props.recipe.directions}
          </ListGroupItem>
        </ListGroup>
        <Button bsStyle="danger" className='button' onClick={this.handleDelete}>Delete</Button>
        <Button bsStyle="primary" className='button' onClick={this.handleEdit}>Edit</Button>
      </Panel>
    );
  }
}

class RecipeEditorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeNameInput: '',
      recipeIngredientsInput: '',
      recipeDirectionsInput: ''
    };

    if (props.modalEditMode) {
      // If the modal was opened following an 'Edit' request, prefill the form
      // with the values of the recipe in focus.
      this.setState({
          recipeNameInput: props.newRecipe.name,
          recipeIngredientsInput: props.newRecipe.ingredients,
          recipeDirectionsInput: props.newRecipe.directions
      });
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
    this.handleDirectionsChange = this.handleDirectionsChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

  }

  handleNameChange(e) {
    this.setState({
      recipeNameInput: e.target.value
    })
  }

  handleIngredientsChange(e) {
    this.setState({
      recipeIngredientsInput: e.target.value
    })
  }

  handleDirectionsChange(e) {
    this.setState({
      recipeDirectionsInput: e.target.value
    })
  }

  handleFormSubmit() {

    var newRecipe = {
        name: this.state.recipeNameInput,
        ingredients: this.state.recipeIngredientsInput,
        directions: this.state.recipeDirectionsInput
    };

    if (this.props.modalEditMode) {
      this.props.editRecipe(this.props.modalRecipeIndex, newRecipe);
    } else {
      this.props.addRecipe(newRecipe);
    }

    this.props.hide();
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.modalEditMode) {

      this.setState({
          recipeNameInput: nextProps.newRecipe.name,
          recipeIngredientsInput: nextProps.newRecipe.ingredients,
          recipeDirectionsInput: nextProps.newRecipe.directions
      });

    } else {

      this.setState({
          recipeNameInput: '',
          recipeIngredientsInput: '',
          recipeDirectionsInput: ''
      });
    }

  };

  render() {

    console.log("Modal rerendered");

    return (
      <Modal
        show={this.props.visibility}
        onHide={this.props.hide}
        container={this}
        aria-labelledby="contained-modal-title"
        >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.modalEditMode ? 'Edit Recipe' : 'New Recipe'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup>
              <ControlLabel>Recipe Name</ControlLabel>
              <FormControl
                type="text"
                placeholder="Here, give your recipe a name."
                value={this.state.recipeNameInput}
                onChange={this.handleNameChange}
                className="modal-form-control"
                />
              <ControlLabel>Ingredients</ControlLabel>
              <FormControl
                type="text"
                placeholder="Here, list the ingredients, each separated by a comma."
                value={this.state.recipeIngredientsInput}
                onChange={this.handleIngredientsChange}
                className="modal-form-control"
                />
              <ControlLabel>Directions</ControlLabel>
              <FormControl
                type="text"
                placeholder="Here, write the steps required to cook this recipe."
                value={this.state.recipeDirectionsInput}
                onChange={this.handleDirectionsChange}
                className="modal-form-control"
                />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" onClick={this.handleFormSubmit}>{this.props.modalEditMode ? 'Save' : 'Add'}</Button>
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
        directions: "In a large pan, heat oil over medium heat and cook onion for 1-2 minutes. Add the onions and garlic and then cook for 1 minute."
      },
      {
        name: "Coconut Curry Lentil Soup",
        ingredients: "Coconut oil, onion, garlic, ginger, tomato paste, curry powder, red pepper flakes, vegetable broth, coconut milk, diced tomatos, lentils, salt, pepper",
        directions: "In a stockpot, heat the coconut oil over medium heat and stir-fry the onion, garlic and ginger until the onion is translucent, a couple minutes. Add the tomato paste (or ketchup), curry powder, and red pepper flakes and cook for another minute. Add the vegetable broth, coconut milk, diced tomatoes and lentils. Cover and bring to a boil, then simmer on low heat for 20-30 minutes, until the lentils are very tender. Season with salt and pepper."
      }
    ];
    this.state = {
      recipes: starterRecipes,
      newRecipe: {},
      modalEditMode: false,
      modalVisibility: false
    }

    this.hideModal = this.hideModal.bind(this);
    this.showModalAdd = this.showModalAdd.bind(this);
    this.showModalEdit = this.showModalEdit.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  hideModal() {
    this.setState({ modalVisibility: false });
  }

  showModalAdd(){
    this.setState({
      newRecipe: {},
      modalEditMode: false,
      modalVisibility: true
    });
  }

  showModalEdit(index){
    this.setState({
      newRecipe: this.state.recipes[index],
      modalEditMode: true,
      modalVisibility: true
    });

  }

  editRecipe(recipeIndex, updatedRecipe) {
    var newRecipesState = this.state.recipes.map( (recipe, index) => {
        if(index !== recipeIndex) {
          // This is not the element that needs updating, return as is
          return recipe;
        }
        // Return the new element instead of the original.
        return updatedRecipe;
    });

    this.setState({
      recipes: newRecipesState
    });

    console.log("Recipe edited @ index: " + recipeIndex);
    console.log(this.state.recipes);
  }

  deleteRecipe(index) {
    // Creating a new array with the specified element removed.
    var newRecipesState = [
      ...this.state.recipes.slice(0, index),
      ...this.state.recipes.slice(index + 1)];

    this.setState({
      recipes: newRecipesState
    });

    console.log("Recipe deleted @ index " + index);
    console.log(this.state.recipes);
  }

  addRecipe(recipe) {
    // React states are immutable.
    // To add a recipe, a new state with the new recipe appended must be created.
    var newRecipesState = this.state.recipes.slice();
    newRecipesState.push(recipe);

    this.setState({
      recipes: newRecipesState
    });

    console.log("New recipe added: ");
    console.log(this.state.recipes);
  }


  render() {
    var recipesArr = this.state.recipes;
    console.log("RecipeBox rerendered");

    var recipes = [];
    recipesArr.forEach((recipe, index) => {
      recipes.push(<Recipe
        recipe={recipe}
        index={index}
        key={recipe.name}
        showRecipeEditor={this.showModalEdit}
        deleteRecipe={this.deleteRecipe}/>);
    })

    return (
      <div className="recipe-box-container">
        <RecipeEditorModal
          visibility={this.state.modalVisibility}
          newRecipe={this.state.newRecipe}
          modalEditMode={this.state.modalEditMode}
          addRecipe={this.addRecipe}
          editRecipe={this.editRecipe}
          hide={this.hideModal}/>
        <Accordion>
          {recipes}
        </Accordion>
        <Button
          bsStyle="primary"
          className='button'
          onClick={this.showModalAdd}>
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
