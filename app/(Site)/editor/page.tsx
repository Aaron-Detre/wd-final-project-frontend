"use client";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Ingredient } from "../UtilClasses/Types";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import * as localRecipeClient from "../Clients/localRecipeClient";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

export default function Editor() {
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.account);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { ingredient: "", measure: "" },
  ]);
  const [instructions, setInstructions] = useState<string[]>([""]);

  const titleChanges = (e: any) => setTitle(e.target.value);
  const ingredientChanges = (e: any, ingredientIndex: number) =>
    setIngredients(
      ingredients.map((ingredient: Ingredient, index) => {
        if (ingredientIndex === index) {
          return { ...ingredient, ingredient: e.target.value };
        } else {
          return ingredient;
        }
      })
    );
  const measurementChanges = (e: any, measurementIndex: number) =>
    setIngredients(
      ingredients.map((ingredient: Ingredient, index) => {
        if (measurementIndex === index) {
          return { ...ingredient, measure: e.target.value };
        } else {
          return ingredient;
        }
      })
    );
  const addNewIngredient = () =>
    setIngredients([...ingredients, { ingredient: "", measure: "" }]);
  const deleteIngredient = (ingredientIndex: number) =>
    setIngredients(
      ingredients.filter((ingredient, index) => ingredientIndex !== index)
    );
  const instructionChanges = (e: any, instructionIndex: number) =>
    setInstructions(
      instructions.map((instruction: string, index) => {
        if (instructionIndex === index) {
          return e.target.value;
        } else {
          return instruction;
        }
      })
    );
  const addNewInstruction = () => setInstructions([...instructions, ""]);
  const deleteInstruction = (instructionIndex: number) =>
    setInstructions(
      instructions.filter((instruction, index) => instructionIndex !== index)
    );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const id = uuidv4();
    await publishRecipe(id);
    router.push(`/details/${id}/local`);
  };

  const publishRecipe = async (newRecipeId: string) => {
    if (currentUser) {
      const author = { _id: currentUser._id, username: currentUser.username };
      await localRecipeClient.createRecipe({
        _id: newRecipeId,
        recipeTitle: title,
        recipeAuthor: author,
        datePosted: new Date(Date.now()),
        ingredients: ingredients,
        instructions: instructions,
      });
    }
  };

  return currentUser ? (
    currentUser.role !== "REVIEWER" ? (
      <div>
        <h1>Create a new recipe</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup controlId="wdf-editor-title">
            <FormLabel>Title</FormLabel>
            <FormControl type="text" onChange={titleChanges} required />
          </FormGroup>
          <div className="wdf-editor-ingredients">
            <FormLabel>Ingredients</FormLabel>
            <Button onClick={addNewIngredient}>+Ingredient</Button>
            <ListGroup>
              {ingredients.map((ingredient, index) => (
                <ListGroupItem key={index}>
                  <FormGroup controlId={`wdf-editor-ingredient-${index}`}>
                    <FormLabel>Ingredient {index + 1}</FormLabel>
                    <FormControl
                      type="text"
                      onChange={(e: any) => ingredientChanges(e, index)}
                      required
                    />
                  </FormGroup>
                  <FormGroup controlId={`wdf-editor-measure-${index}`}>
                    <FormLabel>Measurement</FormLabel>
                    <FormControl
                      type="text"
                      onChange={(e: any) => measurementChanges(e, index)}
                      required
                    />
                  </FormGroup>
                  <FaTrashAlt onClick={() => deleteIngredient(index)} />
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
          <div className="wdf-editor-instructions">
            <FormLabel>Instructions</FormLabel>
            <Button onClick={addNewInstruction}>+Instruction</Button>
            <ListGroup>
              {instructions.map((instruction, index) => (
                <ListGroupItem key={index}>
                  <FormGroup controlId={`wdf-editor-instruction-${index}`}>
                    <FormLabel>Step {index + 1}</FormLabel>
                    <FormControl
                      type="text"
                      onChange={(e: any) => instructionChanges(e, index)}
                      required
                    />
                  </FormGroup>
                  <FaTrashAlt onClick={() => deleteInstruction(index)} />
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>

          <Button type="submit">Publish</Button>
        </Form>
      </div>
    ) : (
      <div>
        <h1>Change your role to create a recipe</h1>
        <Button href="/settings">Go to Settings</Button>
      </div>
    )
  ) : (
    <h1>Sign in to create a recipe</h1>
  );
}
