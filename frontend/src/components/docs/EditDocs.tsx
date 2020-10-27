import { Tabs, Tab, Intent, Button, H3, Spinner, Card, FormGroup, Label, Toast } from '@blueprintjs/core';
import { navigate } from '@reach/router';
import { default as Select } from 'react-select';
// import { navigate } from '@reach/router';
import * as React from 'react';
import { Categories, User } from '../../../types';
import { fetchDoc, submitDoc } from '../../actions/docs.action';
import { UserContext } from '../../context/User.context';
import { EditTab } from './tabs/EditTab';
import { PreviewTab } from './tabs/PreviewTab';
import { SplitTab } from './tabs/SplitTab';
import './EditDocs.scss';
import { BASE_URL } from '../../actions/constants';
import { MainMenu } from '../menu/MainMenu';
import { DocImage } from './DocImage';
import { fetchCategories } from '../../actions/categories.action';

type TabIds = 'edit' | 'preview' | 'split';

type EditDocsProps = {
    path: string;
    id?: string;
    categories: Array<Categories>;
    setCategories: React.Dispatch<React.SetStateAction<Array<Categories>>>;
}



// Add in the contxt API so we can know who created the file.
export const EditDocs = (props: EditDocsProps): JSX.Element => {
    const { id, categories, setCategories } = props;
    const [articleName, setArticleName] = React.useState<string>('');
    const [uploads, setUploads] = React.useState<Array<File>>([]);
    const [article, setArticle] = React.useState<string>('');
    const [selectedTab, setSelectedTab] = React.useState<TabIds>('split');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState<undefined | {label: string, value: string}>(undefined);
    const options = categories.map((c) => {
        return {
            label: c.category_name,
            value: c.id.toString(),
        }
    });

    const handleSelectChange = (value: unknown, action: unknown) => {
        setSelectedCategory((value as {label: string, value: string}));
    };
    // TODO:  Move these out.
    // const [categories, setCategories] = React.useState<Array<Categories>>([])
    const user = React.useContext(UserContext) as User;


    React.useEffect(() => {
        if (id) {
            const setDoc = async () => {
                setLoading(true);
                const doc = await fetchDoc(id);
                setArticleName(doc.article_name);

                const files: Array<File> = [];
                if (doc.uploads?.length) {
                    for (const upload of doc.uploads) {
                        if (upload instanceof File) {
                            files.push(upload);
                        } else {
                            if (upload.url) {

                                const blob = await fetch(`${BASE_URL}${upload.url}`).then(r => r.blob());
                                const file = new File([blob], upload.url as string);
                                files.push(file);
                            }
                        }
                    }
                    setUploads(files);
                }
                setArticle(doc.article);
                setSelectedCategory({label: doc.categories.category_name, value: doc.categories.id.toString()})
                setLoading(false);
            };
            setDoc();
        }
    }, [id]);

    const handleSelectedTab = (newTabId: TabIds, prevTabId: string, evt: React.SyntheticEvent) => {
        setSelectedTab(newTabId);
    }

    const submitEdits = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (!selectedCategory) {
            setError('Must have a category selected!');
            return;
        }
        if (!articleName) {
            setError('Must have a name for the article');
            return;
        }
        if (!article) {
            setError('Must have an article!');
            return;
        }
        setError('');
        const resp = await submitDoc({
            id: id || '',
            article_name: articleName,
            article,
            uploads,
            user,
            categories: selectedCategory?.value,
        });

        const categoryResponse = await fetchCategories();
        setCategories(categoryResponse);
        // navigate(`${BASE_URL}/docs/${resp.id}`)
        // TODO:  Navigate away here.
        if (resp?.id) {
            navigate(`/docs/${resp.id}`);
        } else {
            navigate(`/docs/new`)
        }
    };

    const resetError = () => {
        setError('');
    }


    return (
        <MainMenu categories={categories} setCategories={setCategories}>
            <section className='edit-docs'>
                {error && (<Toast onDismiss={resetError} intent={Intent.DANGER} message={error} />)}
                <Card>
                    <Tabs id="TabsExample" onChange={handleSelectedTab} selectedTabId={selectedTab}>
                        <Tab id="split" title="Split Edit / Preview" panel={<SplitTab
                            article={article}
                            setArticle={setArticle}
                            articleName={articleName}
                            setArticleName={setArticleName}
                            uploads={uploads}
                            setUploads={setUploads}
                        />} />
                        <Tab id="edit" title="Edit" panel={<EditTab
                            article={article}
                            setArticle={setArticle}
                            articleName={articleName}
                            setArticleName={setArticleName}
                            uploads={uploads}
                            setUploads={setUploads}
                        />} />
                        <Tab id="preview" title="Preview" panel={<PreviewTab
                            article={article}
                            setArticle={setArticle}
                            articleName={articleName}
                            setArticleName={setArticleName}
                            uploads={uploads}
                            setUploads={setUploads}
                        />} />
                    </Tabs>
                    {loading && (<Spinner />)}
                    {!loading && (
                        <form className='form' encType='multipart/form-data' onSubmit={submitEdits} action={`${id ? `/docs/${id}` : '/docs'}`} method='post'>
                            <FormGroup className='submit-group'>
                                <Label className='submit-group'>Select category
                                <Select value={selectedCategory} onChange={handleSelectChange} isSearchable options={options} />
                            </Label>
                            </FormGroup>
                            <Button type='submit' intent={Intent.PRIMARY} text={id ? 'Update doc' : 'Create new Doc'} />
                        </form>
                    )}
                </Card>
                <div className='spacer'>
                    <hr/>
                </div>
                <H3 className={`mt-3`}>File Preview</H3>
                <Card>
                    <div className="file-area">

                        {uploads.length
                            ? uploads.map((u) => (<DocImage key={u.name} upload={u} />))
                            : (<div>No Files to Preview</div>)
                        }
                    </div>
                    <div className="categories">

                    </div>
                </Card>
            </section>
        </MainMenu>
    );
};
