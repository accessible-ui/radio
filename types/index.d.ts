import * as React from 'react';
export declare const useRadioGroup: () => RadioGroupContextValue;
export declare function RadioGroup({ name, value, defaultValue, onChange, children, }: RadioGroupProps): JSX.Element;
export declare namespace RadioGroup {
    var displayName: string;
}
export declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>>;
export declare const useRadio: () => RadioContextValue;
export declare function Checked({ children }: CheckedProps): JSX.Element | null;
export declare namespace Checked {
    var displayName: string;
}
export declare function Unchecked({ children }: UncheckedProps): JSX.Element | null;
export declare namespace Unchecked {
    var displayName: string;
}
export declare function Mark({ children, checkedClass, uncheckedClass, checkedStyle, uncheckedStyle, }: MarkProps): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export declare namespace Mark {
    var displayName: string;
}
export interface RadioContextValue {
    checked: boolean;
    check: () => void;
    uncheck: () => void;
    focused: boolean;
    disabled: boolean;
}
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'name' | 'checked' | 'defaultChecked'> {
    value: string | number | string[] | undefined;
    disabled?: boolean;
    onChange?: (checked: boolean) => any;
    onFocus?: (event: React.FocusEvent) => any;
    onBlur?: (event: React.FocusEvent) => any;
    children?: React.ReactNode;
}
export interface UncheckedProps {
    children: React.ReactNode;
}
export interface CheckedProps {
    children: React.ReactNode;
}
export interface RadioGroupContextValue {
    name: string;
    value: string | number | string[] | undefined;
    setValue: (value: string | number | string[] | undefined | ((current: string | number | string[] | undefined) => string | number | string[] | undefined)) => void;
}
export interface RadioGroupProps {
    name: string;
    value?: string | number | string[] | undefined;
    defaultValue?: string | number | string[] | undefined;
    onChange?: (value: string | number | string[] | undefined) => any;
    children: React.ReactNode;
}
export interface MarkProps {
    checkedClass?: string;
    uncheckedClass?: string;
    checkedStyle?: React.CSSProperties;
    uncheckedStyle?: React.CSSProperties;
    children: JSX.Element | React.ReactElement;
}
