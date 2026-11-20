import type { Recipe, RecipeDraft, RecipeFilter, Review } from "./types.js";

export function filterRecipes(
  recipes: Recipe[],
  filter: RecipeFilter
): Recipe[] {
  const query = filter.query.trim().toLowerCase();
  return recipes.filter((recipe) => {
    const matchesQuery = recipe.title.toLowerCase().includes(query);
    const matchesCategory =
      filter.category === "Все" || recipe.category === filter.category;
    const matchesFavorite = !filter.favoritesOnly || recipe.favorite;

    return matchesQuery && matchesCategory && matchesFavorite;
  });
}

export function createRecipe(draft: RecipeDraft): Recipe {
  return {
    ...draft,
    id: crypto.randomUUID(),
    favorite: false,
    reviews: []
  };
}

export function toggleFavorite(
  recipes: Recipe[],
  id: string
): Recipe[] {
  return recipes.map((recipe) =>
    recipe.id === id
      ? { ...recipe, favorite: !recipe.favorite }
      : recipe
  );
}

export function deleteRecipe(recipes: Recipe[], id: string): Recipe[] {
  return recipes.filter((recipe) => recipe.id !== id);
}

export function addReview(
  recipes: Recipe[],
  recipeId: string,
  author: string,
  text: string
): Recipe[] {
  const newReview: Review = {
    id: crypto.randomUUID(),
    author: author.trim(),
    text: text.trim(),
    liked: false
  };

  return recipes.map((recipe) =>
    recipe.id === recipeId
      ? { ...recipe, reviews: [...recipe.reviews, newReview] }
      : recipe
  );
}

export function toggleReviewLike(
  recipes: Recipe[],
  recipeId: string,
  reviewId: string
): Recipe[] {
  return recipes.map((recipe) => {
    if (recipe.id !== recipeId) return recipe;

    return {
      ...recipe,
      reviews: recipe.reviews.map((review) =>
        review.id === reviewId
          ? { ...review, liked: !review.liked }
          : review
      )
    };
  });
}