import { Dialog, Spinner } from '@blueprintjs/core';
import * as React from 'react';
import { Upload } from '../../../types';
import { BASE_URL } from '../../actions/constants';
import './DocImage.scss';
import { FileType } from './utils/FileFinder';
// import { Upload } from '../../../types';
// import { BASE_URL } from '../../actions/constants';

type Props = {
    upload: File | Upload;
}

type FigureProps = {
    name: string;
    href: string;
    loading: boolean;
    baseUrl: string;
}

export const Figure = (p: FigureProps): JSX.Element => {
    const { name, href, loading, baseUrl } = p;
    return (
        <div className="figure">
            <figure className="figure">
                {loading ? (<Spinner />) : <FileType baseUrl={baseUrl} name={name as string} href={href} />}
                <figcaption>{name}</figcaption>
            </figure>
        </div>
    );
}

export const DocImage = (props: Props): JSX.Element => {
    const [loading, setLoading] = React.useState(false);
    const [href, setHref] = React.useState('');
    const [showOverlay, setShowOverlay] = React.useState(false);
    const { upload } = props;
    const [base, setBase] = React.useState('');

    React.useEffect(() => {
        if (upload instanceof File) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                if (reader.result) {
                    setHref(reader.result?.toString());
                }
                setLoading(false);
            }, false);
            setLoading(true);
            reader.readAsDataURL(upload);
        } else {
            setHref(`${BASE_URL}${upload.url}`);
            setBase(`${BASE_URL}${upload.url}`);
        }
    }, [setHref, upload, setBase]);

    const handleOverlayClick = () => {
        setShowOverlay(!showOverlay);
    }

    return (
        <section className="doc-image">
            <Dialog className='responsive-dialog' title={upload.name as string} isOpen={showOverlay} onClose={handleOverlayClick}>
                <Figure name={upload.name as string} loading={loading} baseUrl={base} href={href} />
            </Dialog>
            <div onClick={handleOverlayClick} className="image-container" role='button'>
                <Figure name={upload.name as string} loading={loading} baseUrl={base} href={href} />
            </div>
        </section>
    );
}