import React from 'react';
import App from 'next/app';
import 'antd/dist/antd.css';

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <style jsx global>{`
                    body {
                        margin: 0px;
                        padding: 0px;
                    }
                `}</style>
                <Component {...pageProps} />
            </>
        );
    }
}

export default MyApp;
