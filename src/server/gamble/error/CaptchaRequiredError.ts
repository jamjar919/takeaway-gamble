class CaptchaRequiredError extends Error {
    private readonly _html: string;

    constructor(html: string) {
        super('Captcha required');
        this._html = html;
    }

    html(): string {
        return this._html;
    }
}

export { CaptchaRequiredError }