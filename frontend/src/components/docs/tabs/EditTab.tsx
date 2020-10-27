import { FormGroup, Label, FileInput, TextArea, InputGroup, Intent } from '@blueprintjs/core';
import * as React from 'react';
import { EditTabProps } from '../../../../types';
import './EditTab.scss';


export const EditTab = (props: EditTabProps): JSX.Element => {

    const handleArticleName = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const val = evt.target.value;
        props.setArticleName(val);
    }

    const handleArticle = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = evt.target.value;
        props.setArticle(val);
    }

    const handleFiles = (evt: React.FormEvent<HTMLInputElement>) => {
        const { files } = evt.currentTarget;
        if (files) {
            const uploads = [];
            for (let i = 0; i < files.length; i += 1) {
                const file = files[i];
                uploads.push(file);
            }
            props.setUploads(uploads);

        }
    };

    return (
        <section className="edit-tab">
            <FormGroup>
                <Label>Article Title:
                <InputGroup id="articleName"
                        value={props.articleName}
                        placeholder="Type article title"
                        onChange={handleArticleName} />
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>Article:
                <TextArea
                        growVertically={true}
                        large={true}
                        intent={Intent.PRIMARY}
                        onChange={handleArticle}
                        value={props.article}
                        placeholder={'Type markdown here'}
                    />
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>Files:
                    <div>
                        <FileInput text="Choose files" inputProps={{ multiple: true }} onInputChange={handleFiles} />
                    </div>
                </Label>
            </FormGroup>
        </section>
    )
};