import { Text } from "react-native";
import React, { Component } from "react";
import { recipes, categories, ingredients } from "./dataArrays";

export function getCategoryById(categoryId) {
  let category;
  categories.map((data) => {
    if (data.id == categoryId) {
      category = data;
    }
  });
  return category;
}

export function getIngredientName(ingredientID) {
  let name;
  ingredients.map((data) => {
    if (data.ingredientId == ingredientID) {
      name = data.name;
    }
  });
  return name;
}

export function getIngredientUrl(ingredientID) {
  let url;
  ingredients.map((data) => {
    if (data.ingredientId == ingredientID) {
      url = data.photo_url;
    }
  });
  return url;
}

export function getCategoryName(categoryId) {
  let name;
  categories.map((data) => {
    if (data.id == categoryId) {
      name = data.name;
    }
  });
  return name;
}

export function getRecipes(categoryId) {
  const recipesArray = [];
  recipes.map((data) => {
    if (data.categoryId == categoryId) {
      recipesArray.push(data);
    }
  });
  return recipesArray;
}

// modifica
export function getRecipesByIngredient(ingredientId) {
  const recipesArray = [];
  recipes.map((data) => {
    data.ingredients.map((index) => {
      if (index[0] == ingredientId) {
        //vérifie si l'id de l'ingredient utilisé sur la recette correspond à l'id des ingredients
        recipesArray.push(data); //Push dans le tableau toutes les recettes trouvées
      }
    });
  });
  return recipesArray;
}

export function getNumberOfRecipes(categoryId) {
  let count = 0;
  recipes.map((data) => {
    if (data.categoryId == categoryId) {
      count++;
    }
  });
  return count;
}

export function getAllIngredients(idArray) {
  const ingredientsArray = [];
  idArray.map((index) => {
    ingredients.map((data) => {
      if (data.ingredientId == index[0]) {
        ingredientsArray.push([data, index[1]]);
      }
    });
  });
  return ingredientsArray;
}

// functions for search

export function getRecipesByIngredientName(ingredientName) {
  const wordsingredientName = ingredientName.split(","); //je recupère chaque ingredient renseigné séparé par ;
  const recipesArray = [];
  let nameUpper = "";
  let resultat = "";
  let tabingredient = [];

  let idUpper2;

  if (ingredientName) {
    for (let i = 0; i < wordsingredientName.length; i++) {
      nameUpper = wordsingredientName[i].toUpperCase();

      ingredients.map((data) => {
        if (data.name.toUpperCase() === nameUpper) {
          idUpper2 = data.ingredientId;
        }
      });
      recipes.map((daterecipe) => {
        for (let i = 0; i < daterecipe.ingredients.length; i++) {
          if (daterecipe.ingredients[i] == idUpper2) {
            tabingredient.push(idUpper2);
          }
        }
      });
    }
  }

  ingredients.map((data) => {
    //je recupère dans data tous les ingrédients => dataArrays.js

    const estVrai = (e) => e === true;

    resultat = tabingredient.every(estVrai);
    //getRecipesByIngredientName

    for (let k = 0; k < tabingredient.length; k++) {
      if (tabingredient[k]) {
        const recipes = getRecipesByIngredient(tabingredient[k]);
        const unique = [...new Set(recipes)];
        unique.map((item) => {
          recipesArray.push(item);
        });
      }
    }
  });
  const uniqueArray = [...new Set(recipesArray)];

  return uniqueArray;
}

export function getRecipesByCategoryName(categoryName) {
  const nameUpper = categoryName.toUpperCase();
  const recipesArray = [];
  categories.map((data) => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      const recipes = getRecipes(data.id); // return a vector of recipes
      recipes.map((item) => {
        recipesArray.push(item);
      });
    }
  });
  return recipesArray;
}

export function getRecipesByRecipeName(recipeName) {
  const nameUpper = recipeName.toUpperCase();
  const recipesArray = [];
  recipes.map((data) => {
    if (data.title.toUpperCase().includes(nameUpper)) {
      recipesArray.push(data);
    }
  });
  return recipesArray;
}
