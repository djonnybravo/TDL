import React from 'react';

type EditableSpanPropsType = {title:string}

const EditableSpan = (props: EditableSpanPropsType) => {
    return <span>{props.title}</span>
}

export default EditableSpan;