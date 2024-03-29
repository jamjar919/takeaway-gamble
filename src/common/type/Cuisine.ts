enum Cuisine {
    any = 'any',
    grocery = 'grocery',
    chicken = 'chicken',
    vegan = 'vegan',
    asian = 'asian',
    chinese = 'chinese',
    rewards = 'rewards',
    japanese = 'japanese',
    pizza = 'pizza',
    sushi = 'sushi',
    dessert = 'dessert',
    burgers = 'burgers',
    healthy = 'healthy',
    kebab = 'kebab',
    salads = 'salads',
    burritos = 'burritos',
    offers = 'offers',
    italian = 'italian',
    mexican = 'mexican',
    poke = 'poke',
    tacos = 'tacos',
    thai = 'thai',
    indian = 'indian',
    korean = 'korean',
    american = 'american',
    ramen = 'ramen',
    icecream = 'icecream',
    breakfast = 'breakfast'
}

type CuisineType = keyof typeof Cuisine;

const CuisineUrlParam: Record<CuisineType, string> = {
    [Cuisine.any]: 'all-restaurants',
    [Cuisine.grocery]: 'grocery',
    [Cuisine.chicken]: 'chicken',
    [Cuisine.vegan]: 'vegan',
    [Cuisine.asian]: 'asian',
    [Cuisine.chinese]: 'chinese',
    [Cuisine.rewards]: 'rewards',
    [Cuisine.japanese]: 'japanese',
    [Cuisine.pizza]: 'pizza',
    [Cuisine.sushi]: 'sushi',
    [Cuisine.dessert]: 'dessert',
    [Cuisine.burgers]: 'burgers',
    [Cuisine.healthy]: 'healthy',
    [Cuisine.kebab]: 'kebab',
    [Cuisine.salads]: 'salads',
    [Cuisine.burritos]: 'burritos',
    [Cuisine.offers]: 'offers',
    [Cuisine.italian]: 'italian',
    [Cuisine.mexican]: 'mexican',
    [Cuisine.poke]: 'poke',
    [Cuisine.tacos]: 'tacos',
    [Cuisine.thai]: 'thai',
    [Cuisine.indian]: 'indian',
    [Cuisine.korean]: 'korean',
    [Cuisine.american]: 'american',
    [Cuisine.ramen]: 'ramen',
    [Cuisine.icecream]: 'ice+cream',
    [Cuisine.breakfast]: 'breakfast' 
}

export { Cuisine, CuisineType, CuisineUrlParam }