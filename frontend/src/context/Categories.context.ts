import * as React from 'react';
import { Categories } from './../../types/index';

export const defaultCategories: Array<Categories> = [];

export const CategoriesContext = React.createContext(defaultCategories);