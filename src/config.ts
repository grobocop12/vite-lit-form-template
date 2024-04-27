
const properties: { [key: string]: any; } = {
    foo: "PROD",
    searchUrl: 'localhost:3000/query'
};

const devProperties: { [key: string]: any; } = {
    foo: "DEV",
    searchUrl: 'localhost:3000/query'
}

const env = process.env.NODE_ENV || 'development';

export function getProperty(name: string): any {
    if (env === 'production') {
        return properties[name];
    } else {
        return devProperties[name];
    }
}