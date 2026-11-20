export function filterRecipes(recipes, filter) {
    const query = filter.query.trim().toLowerCase();
    return recipes.filter((recipe) => {
        const matchesQuery = recipe.title.toLowerCase().includes(query);
        const matchesCategory = filter.category === "Все" || recipe.category === filter.category;
        const matchesFavorite = !filter.favoritesOnly || recipe.favorite;
        return matchesQuery && matchesCategory && matchesFavorite;
    });
}
export function createRecipe(draft) {
    return {
        ...draft,
        id: crypto.randomUUID(),
        favorite: false,
        reviews: []
    };
}
export function toggleFavorite(recipes, id) {
    return recipes.map((recipe) => recipe.id === id
        ? { ...recipe, favorite: !recipe.favorite }
        : recipe);
}
export function deleteRecipe(recipes, id) {
    return recipes.filter((recipe) => recipe.id !== id);
}
export function addReview(recipes, recipeId, author, text) {
    const newReview = {
        id: crypto.randomUUID(),
        author: author.trim(),
        text: text.trim(),
        liked: false
    };
    return recipes.map((recipe) => recipe.id === recipeId
        ? { ...recipe, reviews: [...recipe.reviews, newReview] }
        : recipe);
}
export function toggleReviewLike(recipes, recipeId, reviewId) {
    return recipes.map((recipe) => {
        if (recipe.id !== recipeId)
            return recipe;
        return {
            ...recipe,
            reviews: recipe.reviews.map((review) => review.id === reviewId
                ? { ...review, liked: !review.liked }
                : review)
        };
    });
}
