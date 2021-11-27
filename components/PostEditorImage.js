import React from 'react';


export const UploadedImage = (props) => {
    const { block, contentState } = props;
    const { src } = contentState.getEntity(block.getEntityAt(0)).getData();
    return (
        <img
            src={src}
            alt={src}
            width="100%"
            role="presentation"
        />


    )
};
const Media = (props) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const type = entity.getType();
    let media = null;
    if (type === 'image') {
        media = <UploadedImage {...props} />;
    }
    return media;
};


export const mediaBlockRenderer = (block) => {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false,
        };
    }
    return null;
};