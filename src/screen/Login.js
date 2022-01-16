import { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, signIn_ } from "../../firebase";
const { fontScale } = Dimensions.get("screen");
import { MaterialCommunityIconsIcon } from "../components/icons";
import { ENTER_ALL_FIELDS } from "../constant/errorCodes";
import { USER_LOGGED_IN } from "../constant/strings";
import { APP_ROUTE, REGISTER_ROUTE } from "../navigation/routes";
import { IsNullOrEmpty } from "../utils/helpers";
import { SaveItemToStorage } from "../utils/storage";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function signIn() {
    const listToCheck = [email, password];
    if (!IsNullOrEmpty(listToCheck)) {
      setIsLoading(true);
      try {
        await signIn_(auth, email, password).then((userCredential) => {
          const user = userCredential.user;
          // console.log(user);
        });
        SaveItemToStorage(USER_LOGGED_IN, "true");
        navigation.navigate(APP_ROUTE);
        setIsLoading(false);
        return;
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
        return;
      }
    }
    Alert.alert(ENTER_ALL_FIELDS);
  }
  if (isLoading) {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  // async function setUser() {
  //   const doc = await db.collection_(users).doc(user.uid).get();
  //   const userData = doc.data();
  //   console.log(userData);

  // }

  return (
    <SafeAreaView style={{ backgroundColor: "#664a2f", height: "100%" }}>
      <View style={{ marginHorizontal: 20 }}>
        <ScrollView>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 180,
            }}
          >
            <Text
              style={{
                color: "grey",
                fontSize: fontScale * 55,
                fontWeight: "bold",
              }}
            ></Text>
          </View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Input
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
              containerStyle={{
                marginBottom: 13,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: "#956f4b",
                height: 64,
              }}
              inputContainerStyle={{
                borderColor: "#664a2f",
                paddingHorizontal: 15,

                paddingVertical: 10,
              }}
              inputStyle={{
                paddingHorizontal: 10,
                fontSize: fontScale * 17,
              }}
              leftIcon={
                <MaterialCommunityIconsIcon
                  name="email-outline"
                  size={24}
                  color="#9C9C9C"
                />
              }
            />
            <Input
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
              containerStyle={{
                marginBottom: 13,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: "#956f4b",
                height: 64,
              }}
              inputContainerStyle={{
                borderColor: "#664a2f",
                paddingHorizontal: 15,

                paddingVertical: 10,
              }}
              inputStyle={{
                paddingHorizontal: 10,
                fontSize: fontScale * 17,
              }}
              leftIcon={
                <MaterialCommunityIconsIcon
                  name="key-outline"
                  size={24}
                  color="#9C9C9C"
                />
              }
            />
          </View>
          <TouchableOpacity onPress={signIn}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#543c27",
                paddingVertical: 15,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  color: "#956f4b",
                  fontSize: fontScale * 18,
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(REGISTER_ROUTE);
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: "#543c27",
                // elevation: 0.5,
                paddingVertical: 15,
                marginVertical: 15,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  color: "#956f4b",
                  fontSize: fontScale * 18,
                  fontWeight: "bold",
                }}
              >
                Register
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}