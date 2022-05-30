import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ScrollView,
} from 'react-native'

import DropDownPicker from 'react-native-dropdown-picker'

import { useNavigation } from '@react-navigation/native'

import uuid from 'react-native-uuid'

function AddTask() {
    const [taskName, onChangeTaskName] = React.useState('')

    const [openDropDown, setOpenDropdown] = React.useState(false)
    const [taskValueDropdown, setTaskValueDropDown] = React.useState(null)
    const [taskItemsDropDown, setTaskItemsDropDown] = React.useState([
        { label: 'Trabalho', value: 'work' },
        { label: 'Dia a dia', value: 'day-to-day' },
        { label: 'Importante', value: 'important' },
        { label: 'Prioridade', value: 'priority' },
        { label: 'Normal', value: 'normal' },
    ])

    const navigation = useNavigation()

    const addTask = () => {
        const taskObject = {
            id: uuid.v4(),
            name: taskName,
            category: taskValueDropdown,
            complete: false,
        }

        navigation.navigate('Tasks', {
            newTask: taskObject,
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styleTitle.textTask}>{'Nova Tarefa'}</Text>
            <View style={styles.todoField}>
                <ScrollView nestedScrollEnabled>
                    <View style={styleCard.card}>
                        <Text style={styleCard.textAction}>Tarefa</Text>
                        <View style={styleCard.inputTextAndButtonField}>
                            <TextInput
                                style={styleCard.input}
                                onChangeText={onChangeTaskName}
                                value={taskName}
                                placeholder="Digite a Tarefa"
                            />
                        </View>

                        <Text style={styleCard.textAction}>Categoria</Text>
                        <DropDownPicker
                            style={dropdownStyle.dropdown}
                            placeholderStyle={dropdownStyle.placeholderStyle}
                            dropDownContainerStyle={
                                dropdownStyle.dropDownContainerStyle
                            }
                            open={openDropDown}
                            value={taskValueDropdown}
                            placeholder="Selecione uma categoria"
                            items={taskItemsDropDown}
                            setOpen={setOpenDropdown}
                            setValue={setTaskValueDropDown}
                            setItems={setTaskItemsDropDown}
                        />

                        <View style={styleCard.buttonField}>
                            <Button
                                title="Criar"
                                color="#1499EF"
                                onPress={() => addTask()}
                                disabled={
                                    taskName === '' ||
                                    taskValueDropdown === null
                                        ? true
                                        : false
                                }
                            />
                        </View>

                        <View style={styleCard.buttonField}>
                            <Button
                                title="Voltar"
                                color="#F56D5B"
                                onPress={() => navigation.navigate('Tasks')}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FAF6F5',
    },
    styleScrollView: {
        width: '100%',
    },
    todoField: {
        flex: 1,
        width: '100%',
        padding: 32,
        backgroundColor: '#FAF6F5',
    },
})

const styleTitle = StyleSheet.create({
    textTask: {
        color: '#3E536B',
        fontSize: 34,
        fontWeight: '500',
        padding: 4,
        paddingTop: 16,
    },
})

const styleCard = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        width: '100%',
        minHeight: 350,

        padding: 16,

        borderColor: '#C9C9C9',
        borderWidth: 1,
        borderRadius: 8,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,
    },
    textAction: {
        color: '#3E536B',
        paddingLeft: 8,
        textDecorationColor: '#000',
        textDecorationStyle: 'solid',
    },
    inputTextAndButtonField: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#C9C9C9',
        borderRadius: 4,
        borderWidth: 1,
        flexDirection: 'row',
        marginTop: 8,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        height: 40,
        padding: 10,
    },
    buttonField: {
        marginTop: 32,
    },
})

const dropdownStyle = StyleSheet.create({
    dropdown: {
        backgroundColor: '#fff',
        borderColor: '#C9C9C9',
        borderRadius: 4,
    },
    placeholderStyle: {
        color: '#878787',
    },
    dropDownContainerStyle: {
        backgroundColor: '#fff',
        borderColor: '#C9C9C9',
        height: 170,
    },
})

export default AddTask
