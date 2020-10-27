export type DocResponse = {
    article: string;
    article_name: string;
    created_at: string;
    id: number;
    published_at: string;
    updated_at: string;
    uploads: Array<File | Upload>;
    categories: Categories;
    // user who created the doc.
    user: {
        id: number,
        firstname: string;
        lastname: string;
        username: string;
    }
}

export type Categories = {
    category_name: string;
    id: number;
    docs: Array<Doc>;
};

export type Upload = {
    id?: string;
    name?: string,
    alternativeText?: string,
    caption?: string,
    width?: number,
    height?: number,
    formats?: Record<string, unknown>,
    hash?: string,
    ext?: string,
    mime?: string,
    size?: 0,
    url?: string,
    previewUrl?: string,
    provider?: string,
    provider_metadata?: Record<string, unknown>,
    related?: string,
    created_by?: string,
    updated_by?: string
};
/**
 * alternativeText: ""
caption: ""
created_at: "2020-10-25T21:43:29.938Z"
ext: ".png"
formats: {thumbnail: {…}, large: {…}, medium: {…}, small: {…}}
hash: "diagram_view_spread_4aae62a638"
height: 2634
id: 1
mime: "image/png"
name: "diagram_view_spread.png"
previewUrl: null
provider: "local"
provider_metadata: null
size: 614.16
updated_at: "2020-10-25T21:43:29.957Z"
url: "/uploads/diagram_view_spread_4aae62a638.png"
 */

export type EditTabProps = {
    articleName: string;
    setArticleName: React.Dispatch<React.SetStateAction<string>>;
    article: string;
    setArticle: React.Dispatch<React.SetStateAction<string>>;
    uploads: Array<File>;
    setUploads: React.Dispatch<React.SetStateAction<Array<File>>>;
};

export type DocUser = User | {
    id: string,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string,
    resetPasswordToken: string,
    registrationToken: string,
    isActive: true,
    roles: [
        string
    ],
    blocked: true
};

export type Doc = {
    id: string,
    article_name: string,
    article: string,
    uploads?: Array<Upload>,
    user: DocUser,
    published_at?: string;
    categories: string;
}

export type DocRequest = Omit<Doc, 'uploads'> & {
    uploads: Array<File>
};

export type User = {
    jwt: string;
    blocked: boolean;
    confirmed: boolean;
    created_at: string; // datetime string
    email: string;
    id: number;
    provider: string;
    role: {
        description: string;
        id: number;
        name: string;
        type: string;
    }
    updated_at: string;
    username: string;
}