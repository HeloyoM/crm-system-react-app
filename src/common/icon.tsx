import React from 'react';

export interface IIcon {
    name: any,
    width: number,
    style: any,
    className: string,

}
function Icon(props: IIcon) {

    return (
        <img
            src={props.name}
            alt={props.name}
            width={props.width}
            style={Object.assign({}, props.style)}
            className={props.className} />
    )

}
export default Icon;