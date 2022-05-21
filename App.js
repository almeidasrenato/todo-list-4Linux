import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,

  //Pressable
} from 'react-native'

import uuid from 'react-native-uuid'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { SvgXml } from 'react-native-svg'
import {
  addIcon,
  removeIcon,
  checkBoxDisabledIcon,
  checkBoxEnabledIcon,
} from './src/assets/svg/'

export default function App() {
  const [taskName, onChangeTaskName] = React.useState('')
  const [task, onChangeTask] = React.useState([])

  const [getStoreData, onChangeGetStoreData] = React.useState(false)

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@taskList', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    if (!getStoreData) {
      try {
        const jsonValue = await AsyncStorage.getItem('@taskList')

        onChangeGetStoreData(true)
        return onChangeTask(jsonValue != null ? JSON.parse(jsonValue) : [])
      } catch (e) {
        // error reading value
      }
    }
  }

  getData()

  const addTask = async (taskName) => {
    let taskObject = {
      id: uuid.v4(),
      name: taskName,
      complete: false,
    }

    onChangeTaskName('')
    onChangeTask([...task, taskObject])

    await storeData([...task, taskObject])
  }

  const removeTask = async (taskId) => {
    var newTaskList = task.filter((item) => item.id !== taskId)

    onChangeTask(newTaskList)

    await storeData(newTaskList)
  }

  const changeStatusTask = async (taskId) => {
    let newTaskList = task.map((item) => {
      return {
        ...item,
        complete: taskId === item.id ? !item.complete : item.complete,
      }
    })

    onChangeTask(newTaskList)
    await storeData(newTaskList)
  }

  const renderTaskList = ({ item }) => (
    <TouchableOpacity onPress={() => changeStatusTask(item.id)}>
      <View style={styles.taskCard}>
        {item.complete ? (
          <SvgXml xml={checkBoxEnabledIcon()} width='30' height='30' />
        ) : (
          <SvgXml xml={checkBoxDisabledIcon()} width='30' height='30' />
        )}

        {item.complete ? (
          <Text style={styles.titleTaskCardLine}>{item.name}</Text>
        ) : (
          <Text style={styles.titleTaskCard}>{item.name}</Text>
        )}

        <TouchableOpacity onPress={() => removeTask(item.id)}>
          <SvgXml xml={removeIcon()} width='30' height='30' />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{ flex: 1 }}
      >
        <StatusBar style='auto' />

        <View style={styles.todoField}>
          <Text style={styles.textTask}>Tarefas</Text>

          {/* Field Tasks List */}
          <View style={styles.taskListField}>
            <FlatList
              data={task}
              renderItem={renderTaskList}
              keyExtractor={(item) => item.id}
            />
          </View>

          {/* Add Task Field */}
          <View style={styles.addTaskField}>
            <View style={styles.inputTextAndButtonField}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeTaskName}
                value={taskName}
                placeholder='Digite a Tarefa'
              />

              <TouchableOpacity
                onPress={() => (taskName === '' ? null : addTask(taskName))}
              >
                <SvgXml
                  xml={addIcon(taskName === '' ? true : false)}
                  width='30'
                  height='30'
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6F5',
    paddingTop: Platform.OS === 'android' ? 28 : 0,
  },
  todoField: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },

  // Field Tasks List

  taskListField: {
    flex: 1,
    width: '100%',
    padding: 32,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#C9C9C9',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
  },
  titleTaskCard: {
    flex: 1,
    paddingLeft: 8,
    color: '#3E536B',
  },
  titleTaskCardLine: {
    flex: 1,
    paddingLeft: 8,
    color: '#3E536B',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
  },

  //Field addTask
  textTask: {
    fontSize: 34,
    fontWeight: '500',
    color: '#3E536B',
    padding: 4,
    paddingTop: 16,
  },

  addTaskField: {
    padding: 32,
  },
  inputTextAndButtonField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#C9C9C9',
    borderWidth: 1,
    borderRadius: 8,

    paddingRight: 10,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
  },
})
