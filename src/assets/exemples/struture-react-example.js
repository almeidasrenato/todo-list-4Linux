import React from 'react'

function ExampleComponent() {
    const examples = ['exemple1', 'exemple2']

    return (
        <>
            {examples.map((examplesName) => (
                // eslint-disable-next-line react/jsx-key
                <p>{examplesName}</p>
            ))}
        </>
    )
}

export { ExampleComponent }
