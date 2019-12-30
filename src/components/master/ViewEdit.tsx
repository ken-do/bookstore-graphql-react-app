import React, { useState } from 'react';

interface IProps {
    title: string,
    onSubmit(e: React.FormEvent<HTMLFormElement>): void,
    fields: React.ReactNode[]
}

const ViewEdit: React.FC<IProps> = ({ title, onSubmit, fields }) => {


    return (
        <div>
            <h4>{title}</h4>
            <form onSubmit={onSubmit}>
                {fields}
                <div>
                    <button type="submit" className="waves-effect waves-light btn right">Update</button>
                </div>
            </form>
        </div>
    )
}

export default ViewEdit;