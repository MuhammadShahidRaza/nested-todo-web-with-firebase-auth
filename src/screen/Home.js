import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  Platform,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TodoList from "./TodoList";
import SnackBar from "react-native-snackbar-component";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(true);
  const toggleModal = () => setModalVisible(!modalVisible);
  const [addTask, setAddTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());

  const [snackBar, setSnackBar] = useState(false);
  function deletingTasks(index) {
    let copyingItems = [...tasks];
    copyingItems.splice(index, 1);
    setTasks(copyingItems);
  }

  const TaskModel = {
    id: null,
    title: "",
    createdAt: "",
    subTasks: [],
  };

  function addTasks() {
    if (addTask) {
      const newTask = { ...TaskModel };
      newTask.title = addTask;
      newTask.createdAt = date.toLocaleDateString();
      newTask.id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;

      setTasks([...tasks, newTask]);
      setAddTask("");
      return;
    } else {
      setSnackBar(true);
      setTimeout(() => {
        setSnackBar(false);
      }, 3000);
    }
  }

  // todolis wala

  const [todo, setTodo] = useState("");
  const [subTaskIndex, setSubTaskIndex] = useState(null);

  const [open, setOpen] = useState(false);

  // const [subtasks, setSubtasks] = useState([]);

  const SubTaskModel = {
    id: null,
    title: "",
    createdAt: "",
  };

  function addSubTask(subindex) {
    let selectedTask = tasks.filter(
      (task) =>
        // console.log(subindex)
        task.id === subindex
    );
    // console.log(selectedTask);
    if (todo) {
      const newSubTask = { ...SubTaskModel };

      newSubTask.title = todo;
      newSubTask.createdAt = date.toLocaleDateString();
      newSubTask.id = selectedTask[0].subTasks.length
        ? selectedTask[0].subTasks[selectedTask[0].subTasks.length - 1].id + 1
        : 1;

      selectedTask[0].subTasks = [...selectedTask[0].subTasks, newSubTask];
      // newSubTask.id = subindex
      // selectedTask[0].subtasks = [{...selectedTask[0].subtasks, newSubTask}];
      setTasks([...tasks]);

      setTodo("");
    } else {
      setSnackBar(true);
      setTimeout(() => {
        setSnackBar(false);
      }, 3000);
    }
  }

  function deletingSubTasks(subindex) {
    // console.log(subindex + " sub");
    let selectedTask = tasks.filter((task) => task.id === subTaskIndex + 1);
    // let copyingItems = [...selectedTask ];
    // console.log(copyingItems);
    // copyingItems.splice(subindex , 1); ;
    // setSubtasks(copyingItems);
  }
  // function deletingTasks(index) {
  //   let copyingItems = [...tasks];
  //   copyingItems.splice(index, 1);
  //   setTasks(copyingItems);
  // }
  // console.log(tasks);

  return (
    <SafeAreaView style={{ backgroundColor: "#956f4b", height: "100%" }}>
      <View style={{ marginTop: 30, marginHorizontal: 25 }}>
        <ScrollView>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 20 }}>Home</Text>
          </View>
          <View style={{ height: 160 }}>
            <Pressable
              style={{ position: "absolute", top: 5, alignSelf: "center" }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Add Tasks</Text>
            </Pressable>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {}}
            >
              <View style={styles.modalView}>
                <View
                  style={{
                    borderColor: "#956f4b",
                    borderRadius: 12,
                    borderWidth: 2,
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                  }}
                >
                  <TextInput
                    onChangeText={(text) => {
                      setAddTask(text);
                    }}
                    value={addTask}
                    style={{ fontSize: 18 }}
                    placeholder="Add Task ..."
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    addTasks();
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#956f4b",
                      marginVertical: 15,
                      display: "flex",
                      width: "50%",
                      alignSelf: "flex-end",
                      alignItems: "center",
                      height: 40,
                      justifyContent: "center",
                      borderRadius: 20,
                    }}
                  >
                    <Text style={{ fontSize: 18, color: "white" }}>
                      Add Task
                    </Text>
                  </View>
                </TouchableOpacity>

                <Pressable
                  style={{ position: "absolute", bottom: 5, right: 10 }}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide</Text>
                </Pressable>
              </View>
            </Modal>
          </View>

          <View>
            <View>
              <Text>Todo List</Text>
            </View>

            {/* <TodoList tasks={tasks} deletingTasks={deletingTasks} /> */}

            <View>
              <FlatList
                data={tasks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <>
                      <View style={{ marginVertical: 10 }} key={index}>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignSelf: "flex-end",
                          }}
                        >
                          <TouchableOpacity>
                            <View>
                              <Text>Complete</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <View>
                              <Text>Pending</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 30,
                            backgroundColor: "#a94724",
                            paddingHorizontal: 15,
                            borderRadius: 20,
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              backgroundColor: "yellow",
                            }}
                          >
                            <View>
                              <Text>{item.id})</Text>
                            </View>
                            <View style={{ marginLeft: 10 }}>
                              <Text>{item.title}</Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              deletingTasks(index);
                            }}
                            style={{
                              position: "absolute",
                              top: 5,
                              right: 15,
                              backgroundColor: "red",
                              height: 30,
                              width: 30,
                              borderRadius: 50,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <View>
                              <Text>X</Text>
                            </View>
                          </TouchableOpacity>

                          <View
                            style={{
                              position: "absolute",
                              bottom: 5,
                              right: 15,
                            }}
                          >
                            <Text>{item.createdAt}</Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            setOpen(!open);
                            setSubTaskIndex(index);
                          }}
                        >
                          <View
                            style={{
                              bottom: 10,
                              backgroundColor: "red",
                              width: 150,
                              borderRadius: 12,
                              paddingVertical: 10,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text>Sub Task</Text>
                          </View>
                        </TouchableOpacity>

                        {subTaskIndex !== null && index === subTaskIndex ? (
                          <>
                            <FlatList
                              data={tasks[index].subTasks}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={({ item, index }) => {
                                return (
                                  <View
                                    key={index}
                                    style={{
                                      width: "88%",
                                      alignSelf: "center",
                                      borderRadius: 20,
                                      backgroundColor: "yellow",
                                      marginVertical: 8,
                                      paddingHorizontal: 10,
                                      paddingVertical: 20,
                                    }}
                                  >
                                    <View
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        backgroundColor: "yellow",
                                      }}
                                    >
                                      <View>
                                        <Text>{item.id})</Text>
                                      </View>
                                      <View style={{ marginLeft: 10 }}>
                                        <Text>{item.title} </Text>
                                      </View>
                                    </View>
                                    <TouchableOpacity
                                      onPress={() => {
                                        deletingSubTasks(index);
                                      }}
                                      style={{
                                        position: "absolute",
                                        top: 5,
                                        right: 15,
                                        backgroundColor: "red",
                                        height: 30,
                                        width: 30,
                                        borderRadius: 50,
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <View>
                                        <Text>X</Text>
                                      </View>
                                    </TouchableOpacity>
                                    <View
                                      style={{
                                        position: "absolute",
                                        bottom: 5,
                                        right: 15,
                                      }}
                                    >
                                      <Text>{item.createdAt}</Text>
                                    </View>
                                  </View>
                                );
                              }}
                            />

                            <View>
                              <View
                                style={{
                                  borderColor: "grey",
                                  borderRadius: 12,
                                  borderWidth: 1,
                                  width: "90%",
                                  alignSelf: "center",
                                  paddingHorizontal: 15,
                                  paddingVertical: 15,
                                }}
                              >
                                <TextInput
                                  onChangeText={(text) => {
                                    setTodo(text);
                                  }}
                                  value={todo}
                                  style={{ fontSize: 18 }}
                                  placeholder="Add Todo"
                                />
                              </View>

                              <TouchableOpacity
                                onPress={() => {
                                  addSubTask(index + 1);
                                }}
                              >
                                <View
                                  style={{
                                    backgroundColor: "grey",
                                    alignSelf: "center",
                                    borderRadius: 20,
                                    paddingVertical: 15,
                                    paddingHorizontal: 60,
                                    marginVertical: 10,
                                  }}
                                >
                                  <Text>Add</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </>
                        ) : (
                          <></>
                        )}
                      </View>
                    </>
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <SnackBar
        visible={snackBar}
        textMessage="Please enter field to proceed"
        backgroundColor="#a83c32"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "#a94724",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
