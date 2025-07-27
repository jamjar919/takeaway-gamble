import { Cuisine, CuisineType } from "../../../../../common/type/Cuisine";

const CuisineOptions: Record<CuisineType, { label: string }> = {
    [Cuisine.any]: { label: "Anything"},
    [Cuisine.grocery]: { label: 'Grocery'},
    [Cuisine.chicken]: { label: 'Chicken'},
    [Cuisine.vegan]: { label: 'Vegan'},
    [Cuisine.asian]: { label: 'Asian'},
    [Cuisine.chinese]: { label: 'Chinese'},
    [Cuisine.rewards]: { label: 'Rewards'},
    [Cuisine.japanese]: { label: 'Japanese'},
    [Cuisine.pizza]: { label: 'Pizza'},
    [Cuisine.sushi]: { label: 'Sushi'},
    [Cuisine.dessert]: { label: 'Dessert'},
    [Cuisine.burgers]: { label: 'Burgers'},
    [Cuisine.healthy]: { label: 'Healthy'},
    [Cuisine.kebab]: { label: 'Kebab'},
    [Cuisine.salads]: { label: 'Salads'},
    [Cuisine.burritos]: { label: 'Burritos'},
    [Cuisine.offers]: { label: 'Offers'},
    [Cuisine.italian]: { label: 'Italian'},
    [Cuisine.mexican]: { label: 'Mexican'},
    [Cuisine.poke]: { label: 'Poke'},
    [Cuisine.tacos]: { label: 'Tacos'},
    [Cuisine.thai]: { label: 'Thai'},
    [Cuisine.indian]: { label: 'Indian'},
    [Cuisine.korean]: { label: 'Korean'},
    [Cuisine.american]: { label: 'American'},
    [Cuisine.ramen]: { label: 'Ramen'},
    [Cuisine.icecream]: { label: 'Ice Cream'},
    [Cuisine.breakfast]: { label: 'Breakfast' }
}

export { CuisineOptions }