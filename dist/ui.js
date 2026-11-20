function requireElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Не найден элемент: ${selector}`);
    }
    return element;
}
export const searchInput = requireElement("#search");
export const categoryFilter = requireElement("#category-filter");
export const favoritesOnly = requireElement("#favorites-only");
export const recipeForm = requireElement("#recipe-form");
export const recipeList = requireElement("#recipe-list");
export const formMessage = requireElement("#form-message");
export const resultsCount = requireElement("#results-count");
export function renderRecipes(recipes) {
    recipeList.replaceChildren();
    resultsCount.textContent = `Найдено рецептов: ${recipes.length}`;
    if (recipes.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "Ничего не найдено. Измените фильтр.";
        recipeList.append(empty);
        return;
    }
    for (const recipe of recipes) {
        const card = document.createElement("article");
        card.className = "recipe-card";
        const title = document.createElement("h3");
        title.textContent = recipe.title;
        const meta = document.createElement("p");
        meta.textContent = `${recipe.category} · ${recipe.cookingTime} мин. · ${recipe.servings} порц.`;
        const ingredients = document.createElement("p");
        ingredients.textContent = `Ингредиенты: ${recipe.ingredients.join(", ")}`;
        const instructions = document.createElement("p");
        instructions.textContent = recipe.instructions;
        const favoriteButton = document.createElement("button");
        favoriteButton.type = "button";
        favoriteButton.dataset.action = "favorite";
        favoriteButton.dataset.id = recipe.id;
        favoriteButton.textContent = recipe.favorite
            ? "★ Убрать из избранного"
            : "☆ В избранное";
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.dataset.action = "delete";
        deleteButton.dataset.id = recipe.id;
        deleteButton.textContent = "Удалить";
        const reviewsSection = document.createElement("div");
        reviewsSection.className = "reviews-section";
        const reviewsHeader = document.createElement("h4");
        reviewsHeader.textContent = `Отзывы (${recipe.reviews.length})`;
        reviewsSection.append(reviewsHeader);
        if (recipe.reviews.length === 0) {
            const noReviews = document.createElement("p");
            noReviews.className = "no-reviews";
            noReviews.textContent = "Отзывов пока нет. Будьте первым!";
            reviewsSection.append(noReviews);
        }
        else {
            const reviewsList = document.createElement("ul");
            reviewsList.className = "reviews-list";
            for (const review of recipe.reviews) {
                const reviewItem = document.createElement("li");
                reviewItem.className = "review-item";
                const reviewContent = document.createElement("span");
                reviewContent.textContent = `${review.author}: ${review.text} `;
                const likeButton = document.createElement("button");
                likeButton.type = "button";
                likeButton.className = review.liked ? "like-btn liked" : "like-btn";
                likeButton.dataset.action = "like-review";
                likeButton.dataset.id = recipe.id;
                likeButton.dataset.reviewId = review.id;
                likeButton.textContent = review.liked ? "♥ Понравилось" : "♡ Нравится";
                reviewItem.append(reviewContent, likeButton);
                reviewsList.append(reviewItem);
            }
            reviewsSection.append(reviewsList);
        }
        const reviewForm = document.createElement("form");
        reviewForm.className = "review-form";
        reviewForm.dataset.recipeId = recipe.id;
        const authorInput = document.createElement("input");
        authorInput.type = "text";
        authorInput.name = "author";
        authorInput.placeholder = "Ваше имя";
        authorInput.required = true;
        authorInput.maxLength = 40;
        const textInput = document.createElement("input");
        textInput.type = "text";
        textInput.name = "text";
        textInput.placeholder = "Напишите отзыв...";
        textInput.required = true;
        textInput.maxLength = 200;
        const submitReviewButton = document.createElement("button");
        submitReviewButton.type = "submit";
        submitReviewButton.textContent = "Оставить отзыв";
        reviewForm.append(authorInput, textInput, submitReviewButton);
        reviewsSection.append(reviewForm);
        card.append(title, meta, ingredients, instructions, favoriteButton, deleteButton, reviewsSection);
        recipeList.append(card);
    }
}
