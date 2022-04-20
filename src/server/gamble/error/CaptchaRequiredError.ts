class CaptchaRequiredError extends Error {
    public html: string;

    constructor(html: string) {
        super('Captcha required');
        this.html = html;
    }
}

export { CaptchaRequiredError }