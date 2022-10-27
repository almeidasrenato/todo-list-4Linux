import React from 'react'
import { Text } from 'react-native'

function ExampleComponent() {
    const examples = ['exemple1', 'exemple2']

    return (
        <>
            {examples.map((examplesName) => (
                // eslint-disable-next-line react/jsx-key
                <Text>{examplesName}</Text>
            ))}
        </>

        // <div style={ backgroundColor: 'red' }>
        //     ...
        // </div>

        // <View style={ backgroundColor: 'red' }>
        //     ...
        // </View>
    )
}

export { ExampleComponent }
