import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { CheckBox } from "react-native-elements";
import SnackBar from "react-native-snackbar-component";
export default function TodoList({ tasks, deletingTasks }) {
  const [date, setDate] = useState(new Date());
  const [todo, setTodo] = useState("");
  const [snackBar, setSnackBar] = useState(false);

  const [subtasks, setSubtasks] = useState([]);
  const [open, setOpen] = useState(false);
  function addSubTask(index) {
    if (todo) {
      setSubtasks([...subtasks, todo]);
      setTodo("");
    
    } else {
      setSnackBar(true);
      setTimeout(() => {
        setSnackBar(false);
      }, 3000);
    }
  }

  function deletingSubTasks(index) {
    let copyingItems = [...subtasks];
    copyingItems.splice(index, 1);
    setSubtasks(copyingItems);
  }
  return (
    <View>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <>
              <View style={{ marginVertical: 10 }} key={index}>
                <View style={{ display: "flex", flexDirection: "row" ,alignSelf:"flex-end"}}>
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
                    borderRadius:20
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
                      <Text>{index + 1})</Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <Text>{item}</Text>
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

                  <View style={{ position: "absolute", bottom: 5, right: 15 }}>
                    <Text>{date.toLocaleDateString()}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={(index) => {
                    setOpen(!open);
                  }}
                >
                  <View
                    style={{
                      bottom: 10,
                      backgroundColor: "red",
                      width: 150,
                    borderRadius:12
,
                      paddingVertical: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text>Sub Task</Text>
                  </View>
                </TouchableOpacity>

                {open ? (
                  <>
                    <FlatList
                      data={subtasks}
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
                                <Text>{index + 1})</Text>
                              </View>
                              <View style={{ marginLeft: 10 }}>
                                <Text>{item} </Text>
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
                              <Text>{date.toLocaleDateString()}</Text>
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
                          addSubTask(index);
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
        <SnackBar
        visible={snackBar}
        textMessage="Please enter field to proceed"
        backgroundColor="#a83c32"
      />
    </View>
  );
}

























