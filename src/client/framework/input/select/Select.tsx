import React from "react";
import ReactSelect from "react-select";
import { useField } from "formik";

type SelectProps = Omit<React.ComponentProps<typeof ReactSelect>, 'defaultValue'> & {
    name: string;
}

const Select = (props: SelectProps) => {
    const { name, options, ...passThroughProps } = props;

    const [{ value }, { initialValue }, { setValue }] = useField(name)

    const selectValue = options && options.find((option: any) => option?.value === value);
    const defaultValue = options && options.find((option: any) => option?.value === initialValue);

    return (
        <ReactSelect
            {...passThroughProps}
            defaultValue={defaultValue}
            options={options}
            name={name}
            value={selectValue}
            onChange={(option: any) => setValue(option?.value)}
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary25: '#f7e4e4',
                    primary: '#b92626',
                },
            })}
        />
    )
}

export { Select }