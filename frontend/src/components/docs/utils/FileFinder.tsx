import * as React from 'react';
import { BASE_URL } from '../../../actions/constants';
import './FileFinder.scss';

const imageTypes = ['gif', 'jpg', 'jpeg', 'png', 'bmp'];
const videoTypes = ['mp4', 'mov', 'webm'];
const audioTypes = ['mp3'];


type Props = {
    name: string;
    href: string;
    baseUrl?: string;
};

// TODO:  Create some state here.  Needs an event listener.  Listen if the image/video/audio is loading.


export const FileType = (props: Props): JSX.Element => {
    const { name, href, baseUrl } = props;
    let src;
    if (baseUrl) {
        src = encodeURI(baseUrl);
    } else if (name.includes('uploads')) {
        src = `${BASE_URL}${name}`;
    } else {
        src = href;
    }
    const match = name.split('.');
    if (match.length) {
        const extension = match[match.length - 1];
        if (imageTypes.includes(extension)) {
            return (<img src={src} className='responsive img img-responsive' alt={name} />);
        } else if (videoTypes.includes(extension)) {
            return (<video controls src={src} className='responsive video video-responsive' />);
        } else if (audioTypes.includes(extension)) {
            return (<audio preload='auto' controls src={src} className='responsive audio audio-responsive' />);
        }
    }
    return (<div>Cannot determine what type [{name}] is.</div>);
}


export const FileFinder = (p: Props): JSX.Element => {
    return (
        <section className="file-finder">
            <FileType {...p} />
        </section>
    );



}