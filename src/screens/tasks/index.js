/* eslint-disable no-use-before-define */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  KeyboardAvoidingView,
  // Pressable
} from "react-native";

import { SvgXml } from "react-native-svg";
import {
  addButton,
  removeIcon,
  checkBoxDisabledIcon,
  checkBoxEnabledIcon,
} from "../../assets/svg";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

function Tasks({ route }) {
  const [task, onChangeTask] = React.useState([]);

  const navigation = useNavigation();

  React.useEffect(() => {
    getTasksData();
  }, []);

  const getTasksData = async () => {
    const jsonValue = await AsyncStorage.getItem("@taskList");

    return onChangeTask(jsonValue != null ? JSON.parse(jsonValue) : []);
  };

  const storeTaskData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@taskList", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const addTask = async (taskObject) => {
    onChangeTask([...task, taskObject]);

    return await storeTaskData([...task, taskObject]);
  };

  if (route.params) {
    addTask(route.params.newTask);
    route.params = undefined;
  }

  const removeTask = async (taskId) => {
    const newTaskList = task.filter((item) => item.id !== taskId);

    onChangeTask(newTaskList);

    await storeTaskData(newTaskList);
  };

  const changeStatusTask = async (taskId) => {
    const newTaskList = task.map((item) => ({
      ...item,
      complete: taskId === item.id ? !item.complete : item.complete,
    }));

    onChangeTask(newTaskList);
    await storeTaskData(newTaskList);
  };

  const TitleRender = () => (
    <Text style={styleTitle.textTask}>{"Tarefas"}</Text>
  );

  const TaskListRender = () => {
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
    );

    return (
      <View style={styleTaskList.taskListField}>
        <FlatList
          data={task}
          renderItem={renderTaskListCard}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  const AddTaskButton = () => (
    <View style={styleAddTaskButton.button}>
      <TouchableHighlight
        style={styleAddTaskButton.button}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => navigation.navigate("AddTask")}
      >
        <SvgXml xml={addButton()} width="60" height="60" />
      </TouchableHighlight>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : ""}
      style={{ flex: 1 }}
    >
      <View style={styles.todoField}>
        <TitleRender />
        <TaskListRender />
        <AddTaskButton />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  todoField: {
    alignItems: "center",
    flex: 1,
    width: "100%",
    backgroundColor: "#FAF6F5",
  },
});

const styleTitle = StyleSheet.create({
  textTask: {
    color: "#3E536B",
    fontSize: 34,
    fontWeight: "500",
    padding: 4,
    paddingTop: 16,
  },
});

const styleTaskList = StyleSheet.create({
  taskListField: {
    flex: 1,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
    width: "100%",
  },
  taskCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#C9C9C9",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 10,
    minHeight: 60,
    padding: 10,
    width: "100%",
  },
  titleTaskCard: {
    color: "#3E536B",
    flex: 1,
    paddingLeft: 8,
  },
  titleTaskCardLine: {
    color: "#3E536B",
    flex: 1,
    paddingLeft: 8,
    textDecorationColor: "#000",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});

const styleAddTaskButton = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    borderRadius: 60 / 2,
    position: "absolute",
    bottom: 20,
    right: 20,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
});

export default Tasks;
