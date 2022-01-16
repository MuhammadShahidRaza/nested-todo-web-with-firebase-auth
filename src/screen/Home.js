import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Home() {
  // All states
  const [modalVisible, setModalVisible] = useState(true);
  const toggleModal = () => setModalVisible(!modalVisible);
  const [addTask, setAddTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());
  const [todo, setTodo] = useState("");
  const [subTaskIndex, setSubTaskIndex] = useState(null);
  const [open, setOpen] = useState(false);

  //task Model Object
  const TaskModel = {
    id: null,
    title: "",
    createdAt: "",
    subTasks: [],
  };

  // adding tasks function
  async function addTasks() {
    try {
      if (addTask) {
        const newTask = { ...TaskModel };
        newTask.title = addTask;
        newTask.createdAt = date.toLocaleDateString();
        newTask.id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
        setTasks([...tasks, newTask]);
        setAddTask("");
        return;
      } else {
        alert("Please enter field to proceed");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  // deleting tasks function
  function deletingTasks(index) {
    let copyingItems = [...tasks];
    copyingItems.splice(index, 1);
    setTasks(copyingItems);
  }

  //sub task model
  const SubTaskModel = {
    id: null,
    title: "",
    createdAt: "",
  };

  // add sub task function
  function addSubTask(subindex) {
    let selectedTask = tasks.filter((task) => task.id === subindex);
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
      alert("Please enter field to proceed");
    }
  }

  //deleting sub task function

  // function deletingSubTasks(subindex) {
  //   let selectedTask = tasks.filter((task) => task.id === subTaskIndex + 1);
  //   let copyingItems = [...selectedTask];
  //   copyingItems[0].subTasks.splice(subindex, 1);
  // }

  //saving arrays to firestore

  // useEffect(() => {
  //   const q = query(collection_(db, "todos"));

  //   const unsub = onSnapshot(q, (querySnapshot) => {
  //     let todosArray = [];
  //     querySnapshot.forEach((doc) => {
  //       todosArray.push({ ...doc.data(), id: doc.id });
  //     });
  //     setTasks(todosArray);
  //   });
  //   return () => unsub();
  // }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#543c27", height: "100%" }}>
      <View style={{ marginTop: 30, marginHorizontal: 25 }}>
        <ScrollView>
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
                    backgroundColor: "#956f4b",
                  }}
                >
                  <TextInput
                    onChangeText={(text) => {
                      setAddTask(text);
                    }}
                    value={addTask}
                    style={{ fontSize: 18, color: "white" }}
                    placeholder="Add Task ..."
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    addTasks();
                  }}
                >
                  <View style={styles.addTask}>
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
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white" }}>Todo List</Text>
            </View>

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
                            }}
                          >
                            <View>
                              <Text style={{ color: "white" }}>{item.id})</Text>
                            </View>
                            <View style={{ marginLeft: 10 }}>
                              <Text style={{ color: "white" }}>
                                {item.title}
                              </Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              deletingTasks(index);
                            }}
                            style={{
                              position: "absolute",
                              top: -10,
                              right: 0,
                              backgroundColor: "#956f4b",
                              elevation: 10,
                              borderColor: "#a94724",
                              borderWidth: 1.5,

                              height: 30,
                              width: 30,
                              borderRadius: 50,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <View>
                              <Text style={{ color: "#544434" }}>X</Text>
                            </View>
                          </TouchableOpacity>
                          <View
                            style={{
                              position: "absolute",
                              bottom: 5,
                              right: 15,
                            }}
                          >
                            <Text style={{ color: "white" }}>
                              {item.createdAt}
                            </Text>
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
                              backgroundColor: "#956f4b",
                              width: 150,
                              elevation: 10,
                              borderRadius: 12,
                              left: 5,
                              paddingVertical: 10,
                              alignItems: "center",
                              justifyContent: "center",
                              borderColor: "#a94724",
                              borderWidth: 3,
                            }}
                          >
                            <Text style={{ color: "#544434" }}>Sub Task</Text>
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
                                      backgroundColor: "#785c41",
                                      marginVertical: 8,
                                      paddingHorizontal: 10,
                                      paddingVertical: 20,
                                      elevation: 10,
                                    }}
                                  >
                                    <View
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        backgroundColor: "#785c41",
                                      }}
                                    >
                                      <View>
                                        <Text style={{ color: "white" }}>
                                          {item.id})
                                        </Text>
                                      </View>
                                      <View style={{ marginLeft: 10 }}>
                                        <Text style={{ color: "white" }}>
                                          {item.title}{" "}
                                        </Text>
                                      </View>
                                    </View>
                                    {/* <TouchableOpacity
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
                                    </TouchableOpacity> */}
                                    <View
                                      style={{
                                        position: "absolute",
                                        bottom: 5,
                                        right: 15,
                                      }}
                                    >
                                      <Text style={{ color: "white" }}>
                                        {item.createdAt}
                                      </Text>
                                    </View>
                                  </View>
                                );
                              }}
                            />

                            <View>
                              <View
                                style={{
                                  borderColor: "#785c41",
                                  borderRadius: 12,
                                  borderWidth: 1,
                                  width: "90%",
                                  alignSelf: "center",
                                  paddingHorizontal: 15,
                                  paddingVertical: 15,
                                  marginVertical: 15,
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
                                    backgroundColor: "#544434",
                                    alignSelf: "center",
                                    borderRadius: 20,
                                    paddingVertical: 15,
                                    paddingHorizontal: 60,
                                    marginVertical: 10,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "white",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Add
                                  </Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "#382311",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  addTask: {
    backgroundColor: "#956f4b",
    marginVertical: 15,
    display: "flex",
    width: "50%",
    alignSelf: "flex-end",
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    borderRadius: 20,
  },
});
