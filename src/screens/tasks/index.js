import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native'

import {
  addButton,
  removeIcon,
  checkBoxDisabledIcon,
  checkBoxEnabledIcon,
} from '../../assets/svg'

import { SvgXml } from 'react-native-svg'
import DropDownPicker from 'react-native-dropdown-picker'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { useNavigation } from '@react-navigation/native'

function Tasks({ route }) {
  const [task, onChangeTask] = React.useState([])

  const [openDropDown, setOpenDropdown] = React.useState(false)
  const [taskValueDropdown, setTaskValueDropDown] = React.useState('all')
  const [taskItemsDropDown, setTaskItemsDropDown] = React.useState([
    { label: 'Todas Categorias', value: 'all' },
    { label: 'Trabalho', value: 'work' },
    { label: 'Dia a dia', value: 'day-to-day' },
    { label: 'Importante', value: 'important' },
    { label: 'Prioridade', value: 'priority' },
    { label: 'Normal', value: 'normal' },
  ])

  const [statusTaskFilter, onChangeStatusTaskFilter] = React.useState('all')

  const navigation = useNavigation()

  React.useEffect(() => {
    getTasksData()
  }, [])

  const getTasksData = async () => {
    const jsonValue = await AsyncStorage.getItem('@taskList')

    return onChangeTask(jsonValue != null ? JSON.parse(jsonValue) : [])
  }

  const storeTaskData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@taskList', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const addTask = async (taskObject) => {
    onChangeTask([...task, taskObject])

    return await storeTaskData([...task, taskObject])
  }

  const removeTask = async (taskId) => {
    const newTaskList = task.filter((item) => item.id !== taskId)

    onChangeTask(newTaskList)

    await storeTaskData(newTaskList)
  }

  const changeStatusTask = async (taskId) => {
    const newTaskList = task.map((item) => ({
      ...item,
      complete: taskId === item.id ? !item.complete : item.complete,
    }))

    onChangeTask(newTaskList)
    await storeTaskData(newTaskList)
  }

  if (route.params) {
    addTask(route.params.newTask)
    route.params = undefined
  }

  const returnTaskByFilter = () => {
    let newTaskListRender = task

    if (statusTaskFilter !== 'all') {
      if (statusTaskFilter === 'complete') {
        newTaskListRender = task.filter((obj) => obj.complete === true)
      }

      if (statusTaskFilter === 'incomplete') {
        newTaskListRender = task.filter((obj) => obj.complete === false)
      }
    }

    if (taskValueDropdown !== 'all') {
      newTaskListRender = newTaskListRender.filter(
        (obj) => obj.category === taskValueDropdown
      )
    }

    return newTaskListRender
  }

  const renderTaskListCard = ({ item }) => (
    <TouchableOpacity onPress={() => changeStatusTask(item.id)}>
      <View style={styleTaskList.taskCard}>
        {item.complete ? (
          <SvgXml xml={checkBoxEnabledIcon()} width="30" height="30" />
        ) : (
          <SvgXml xml={checkBoxDisabledIcon()} width="30" height="30" />
        )}

        {item.complete ? (
          <Text style={styleTaskList.titleTaskCardLine}>{item.name}</Text>
        ) : (
          <Text style={styleTaskList.titleTaskCard}>{item.name}</Text>
        )}

        <TouchableOpacity onPress={() => removeTask(item.id)}>
          <SvgXml xml={removeIcon()} width="30" height="30" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      style={{ flex: 1 }}
    >
      <View style={styles.todoField}>
        <Text style={styleTitle.textTask}>{'Tarefas'}</Text>

        <DropDownPicker
          style={styleDropdown.dropdown}
          placeholderStyle={styleDropdown.placeholderStyle}
          dropDownContainerStyle={styleDropdown.dropDownContainerStyle}
          open={openDropDown}
          value={taskValueDropdown}
          items={taskItemsDropDown}
          setOpen={setOpenDropdown}
          setValue={setTaskValueDropDown}
          setItems={setTaskItemsDropDown}
        />

        <View style={styleButtonsFilter.customButtonsField}>
          <Pressable
            style={
              statusTaskFilter === 'all'
                ? styleButtonsFilter.customButtonSelected
                : styleButtonsFilter.customButtonUnselected
            }
            onPress={() => onChangeStatusTaskFilter('all')}
          >
            <Text>Todas</Text>
          </Pressable>

          <Pressable
            style={
              statusTaskFilter === 'complete'
                ? styleButtonsFilter.customButtonSelected
                : styleButtonsFilter.customButtonUnselected
            }
            onPress={() => onChangeStatusTaskFilter('complete')}
          >
            <Text>Completas</Text>
          </Pressable>

          <Pressable
            style={
              statusTaskFilter === 'incomplete'
                ? styleButtonsFilter.customButtonSelected
                : styleButtonsFilter.customButtonUnselected
            }
            onPress={() => onChangeStatusTaskFilter('incomplete')}
          >
            <Text>Incompletas</Text>
          </Pressable>
        </View>

        <View style={styleTaskList.taskListField}>
          <FlatList
            data={returnTaskByFilter()}
            renderItem={renderTaskListCard}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styleAddTaskButton.button}>
          <TouchableHighlight
            style={styleAddTaskButton.button}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => navigation.navigate('AddTask')}
          >
            <SvgXml xml={addButton()} width="48" height="48" />
          </TouchableHighlight>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  todoField: {
    paddingLeft: 32,
    paddingRight: 32,
    alignItems: 'center',
    flex: 1,
    width: '100%',
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
    paddingBottom: 16,
  },
})

const styleDropdown = StyleSheet.create({
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#C9C9C9',
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
  placeholderStyle: {
    color: '#878787',
  },
  dropDownContainerStyle: {
    backgroundColor: '#fff',
    borderColor: '#C9C9C9',
  },
})

const styleButtonsFilter = StyleSheet.create({
  customButtonsField: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 16,
    paddingTop: 4,
    paddingBottom: 4,
  },

  customButtonSelected: {
    backgroundColor: '#F56D5B',

    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,

    borderRadius: 8,
    borderColor: '#F56D5B',
    borderWidth: 1,
    marginRight: 8,
  },
  customButtonUnselected: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,

    borderRadius: 8,
    borderColor: '#878787',
    borderWidth: 1,
    marginRight: 8,
  },
})

const styleTaskList = StyleSheet.create({
  taskListField: {
    flex: 1,
    width: '100%',
  },
  taskCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#C9C9C9',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 10,
    minHeight: 60,
    padding: 10,
    width: '100%',
  },
  titleTaskCard: {
    color: '#3E536B',
    flex: 1,
    paddingLeft: 8,
  },
  titleTaskCardLine: {
    color: '#3E536B',
    flex: 1,
    paddingLeft: 8,
    textDecorationColor: '#000',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
})

const styleAddTaskButton = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderRadius: 48 / 2,
    position: 'absolute',
    bottom: 16,
    right: 16,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
})

export default Tasks
