import React from "react";

type CaptchaPageProps = {
    html: string;
}

const CaptchaPage: React.FC<CaptchaPageProps> = (props) => {
    const { html } = props;

    return (<div dangerouslySetInnerHTML={{ __html: html }} />)
};

export { CaptchaPage }