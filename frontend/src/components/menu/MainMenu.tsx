import * as React from 'react';
import { TreeFinder } from '../docs/utils/TreeFinder';
import { fetchCategories } from '../../actions/categories.action';
import { Categories } from '../../../types';
import './MainMenu.scss';

type Props = {
    children: JSX.Element,
    categories: Array<Categories>;
    setCategories: React.Dispatch<React.SetStateAction<Array<Categories>>>;
};

export const MainMenu = (p: Props): JSX.Element => {
    const {setCategories, children} = p;

    React.useEffect(() => {
        fetchCategories().then(c => setCategories(c));
    }, [setCategories]);

    return (
        <section className="main-menu">
            <div className="side-menu">
                <TreeFinder />
            </div>
            <div className="col">
                {children}
            </div>
        </section>
    )
}