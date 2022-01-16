import { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { addDoc_, auth, collection_, createUser_, db } from "../../firebase";
import {
  AntDesignIcon,
  FeatherIcon,
  MaterialCommunityIconsIcon,
} from "../components/icons";
const { fontScale } = Dimensions.get("screen");
import { ENTER_ALL_FIELDS, PASSWORDS_DONT_MATCH } from "../constant/errorCodes";
import { LOGIN_ROUTE } from "../navigation/routes";
import { IsNullOrEmpty } from "../utils/helpers";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function signUp() {
    const listToCheck = [email, password, confirmPassword];

    if (!IsNullOrEmpty(listToCheck)) {
      if (password != confirmPassword) {
        Alert.alert(PASSWORDS_DONT_MATCH);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);

      try {
        await createUser_(auth, email, password).then((userCredential) => {
          const user = userCredential.user;
          // console.log(user);
          addDoc_(collection_(db, "users"), {
            name: name,
            phoneNumber: phoneNumber,
            uid: user.uid,
          });
          // console.log(user.user.phoneNumber);
        });
        navigation.navigate(LOGIN_ROUTE);
        setIsLoading(false);
        return;
      } catch (error) {
        setIsLoading(false);
        const errorMessage = error.message;
        console.log("error signing up:" + errorMessage);
        // const errorCode = error.code;
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

  return (
    <SafeAreaView style={{ backgroundColor: "#664a2f", height: "100%" }}>
      <View style={{ marginHorizontal: 20 }}>
        <ScrollView>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 100,
            }}
          >
            <Text
              style={{
                color: "#956f4b",
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
            }}
          >
            <Input
              placeholder="Name"
              onChangeText={setName}
              value={name}
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
              leftIcon={<AntDesignIcon name="user" size={24} color="#9C9C9C" />}
            />
            <Input
              placeholder="Phone Number"
              onChangeText={setPhoneNumber}
              value={phoneNumber}
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
              leftIcon={<FeatherIcon name="phone" size={24} color="#9C9C9C" />}
            />
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
            <Input
              placeholder="Confirm Password"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry={true}
              containerStyle={{
                marginBottom: 33,
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

          <TouchableOpacity onPress={signUp}>
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
                Signup
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(LOGIN_ROUTE);
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: "black",
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
                Have an account ? Login here
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
