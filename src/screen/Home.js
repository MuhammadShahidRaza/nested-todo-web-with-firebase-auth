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
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TodoList from "./TodoList";
import SnackBar from "react-native-snackbar-component";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(true);
  const toggleModal = () => setModalVisible(!modalVisible);
  const [addTask, setAddTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [snackBar, setSnackBar] = useState(false);
  function deletingTasks(index) {
    let copyingItems = [...tasks];
    copyingItems.splice(index, 1);
    setTasks(copyingItems);
  }

  //   console.log(tasks);
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
                    if (addTask) {
                      setTasks([...tasks, addTask]);
                      setAddTask("");
                    } else {
                      setSnackBar(true);
                      setTimeout(() => {
                        setSnackBar(false);
                      }, 3000);
                    }
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
                    <Text style={{ fontSize: 18, color: "whites" }}>
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

            <TodoList tasks={tasks} deletingTasks={deletingTasks} />
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
