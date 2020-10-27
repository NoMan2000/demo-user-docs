import * as React from 'react';
import { Classes, ITreeNode, Tree } from "@blueprintjs/core"
import { CategoriesContext } from '../../../context/Categories.context';
import { Categories } from '../../../../types';
import { navigate } from '@reach/router';

type CreateTreeNode = ITreeNode<{ documentId: string }>;

export const createTree = (categories: Array<Categories>): CreateTreeNode[] => {
    return categories.map((c): CreateTreeNode => {
        const childNodes: Array<CreateTreeNode> = c.docs.map((d) => {
            return {
                id: d.id,
                hasCaret: false,
                label: d.article_name,
                nodeData: { documentId: d.id },
            }
        });
        return {
            id: c.category_name,
            isExpanded: true,
            isSelected: false,
            hasCaret: true,
            icon: "folder-close",
            label: c.category_name,
            childNodes
        }
    });
};

export const TreeFinder = (): JSX.Element => {
    const categories = React.useContext(CategoriesContext);
    const [tree, setTree] = React.useState<Array<CreateTreeNode>>([]);

    React.useEffect(() => {
        const realTree = createTree(categories);
        setTree(realTree);
    }, [categories]);

    const handleNodeClick = (nodeData: ITreeNode<{ documentId: string }>, nodePath: number[], e: React.MouseEvent<HTMLElement>) => {
        nodeData.isExpanded = true;
        const topLevelTree = tree[nodePath[0]];
        tree.forEach(nt => {
            nt.isSelected = false;
            nt?.childNodes?.forEach(nts => {
                nts.isSelected = false;
            });
        })
        topLevelTree?.childNodes?.forEach((t, idx) => {
            if (idx === nodePath[1]) {
                t.isSelected = true;
            } else {
                t.isSelected = false;
            }
        });
        setTree([...tree]);
        if (nodeData?.nodeData?.documentId) {
            navigate(`/docs/${nodeData?.nodeData?.documentId}`);
        }

    };

    const handleNodeCollapse = (nodeData: ITreeNode<{ documentId: string }>) => {
        nodeData.isExpanded = false;
        nodeData.isSelected = false;
        setTree([...tree]);

    };

    const handleNodeExpand = (nodeData: ITreeNode<{ documentId: string }>) => {
        nodeData.isExpanded = true;
        setTree([...tree]);
    };

    return (
        <section className="tree-finder">
            <Tree
                contents={tree}
                onNodeClick={handleNodeClick}
                onNodeCollapse={handleNodeCollapse}
                onNodeExpand={handleNodeExpand}
                className={Classes.ELEVATION_0}
            />
        </section>

    )
}
// abcABC123!!