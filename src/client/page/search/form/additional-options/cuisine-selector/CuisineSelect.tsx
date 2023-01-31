import React from "react";
import { SearchPageFormField } from "../../SearchPageForm";
import { Cuisine, CuisineType } from "../../../../../../common/type/Cuisine";

import styles from './CuisineSelect.scss';
import { Select } from "../../../../../framework/input/select/Select";

const cuisineOptions: Record<CuisineType, { label: string }> = {
    [Cuisine.any]: { label: "All Cuisines"},
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

const options = Object.entries(cuisineOptions)
    .map(([value ,{ label }]) => ({
        value,
        label
    }));

const CuisineSelect: React.FC = () => {

    return (
        <div className={styles.cuisineSelect}>
            <label className={styles.label} htmlFor={SearchPageFormField.CUISINE}>Cuisine filter: </label>
            <Select
                name={SearchPageFormField.CUISINE}
                options={options}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: '#f7e4e4',
                        primary: '#b92626',
                    },
                })}
            />
        </div>
    )
}

export { CuisineSelect }