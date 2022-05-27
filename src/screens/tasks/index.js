import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

import { SvgXml } from "react-native-svg";
import {
  addIcon,
  removeIcon,
  checkBoxDisabledIcon,
  checkBoxEnabledIcon,
} from "../../assets/svg";

import uuid from "react-native-uuid";

import AsyncStorage from "@react-native-async-storage/async-storage";

function Tasks() {
  const [taskName, onChangeTaskName] = React.useState("");
  const [task, onChangeTask] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("@taskList");

    return onChangeTask(jsonValue != null ? JSON.parse(jsonValue) : []);
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@taskList", jsonValue);
    } catch (e) {
      Alert.alert("Erro! Não foi possivel carregar suas tarefas.");
    }
  };

  const addTask = async (taskNameProp) => {
    const taskObject = {
      id: uuid.v4(),
      name: taskNameProp,
      category: "",
      complete: false,
    };

    onChangeTaskName("");
    onChangeTask([...task, taskObject]);

    await storeData([...task, taskObject]);
  };

  const removeTask = async (taskId) => {
    const newTaskList = task.filter((item) => item.id !== taskId);

    onChangeTask(newTaskList);

    await storeData(newTaskList);
  };

  const changeStatusTask = async (taskId) => {
    const newTaskList = task.map((item) => ({
      ...item,
      complete: taskId === item.id ? !item.complete : item.complete,
    }));

    onChangeTask(newTaskList);
    await storeData(newTaskList);
  };

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : ""}
      style={{ flex: 1 }}
    >
      <View style={styles.todoField}>
        <Text style={styleTitle.textTask}>{"Tarefas"}</Text>

        <View style={styleTaskList.taskListField}>
          <FlatList
            data={task}
            renderItem={renderTaskListCard}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styleAddTask.addTaskField}>
          <View style={styleAddTask.inputTextAndButtonField}>
            <TextInput
              style={styleAddTask.input}
              onChangeText={onChangeTaskName}
              value={taskName}
              placeholder="Digite a tarefa"
            />

            <TouchableOpacity
              onPress={() => (taskName === "" ? null : addTask(taskName))}
            >
              <SvgXml xml={addIcon(taskName === "")} width="30" height="30" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  todoField: {
    alignItems: "center",

    paddingLeft: 32,
    paddingRight: 32,

    flex: 1,
    width: "100%",
  },
});

const styleTitle = StyleSheet.create({
  textTask: {
    color: "#3E536B",
    fontSize: 34,
    fontWeight: "500",
    padding: 4,
    paddingTop: 16,
    paddingBottom: 16,
  },
});

const styleTaskList = StyleSheet.create({
  taskListField: {
    flex: 1,
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

const styleAddTask = StyleSheet.create({
  addTaskField: {},
  inputTextAndButtonField: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#C9C9C9",
    borderRadius: 8,
    borderWidth: 1,
    elevation: 4,
    flexDirection: "row",

    paddingRight: 10,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    width: "100%",
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
  },
});

export default Tasks;
