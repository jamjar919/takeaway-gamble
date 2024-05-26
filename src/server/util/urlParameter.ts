const addUrlParameter = (url: string, key: string, value: string) => {
    const [path, params] = url.split("?");

    const newParams = [
        `${key}=${value}`,
        ...(params ?? "").split("&").filter((param) => {
            // Remove the param if it already exists
            return param.split("=")?.[0] !== key
        })
    ].filter((param) => !!param);

    return `${path}?${newParams.join("&")}`;
}

export { addUrlParameter }