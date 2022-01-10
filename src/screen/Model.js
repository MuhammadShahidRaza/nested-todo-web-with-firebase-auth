// import React from 'react'
// import { View, Text } from 'react-native'

// export default function Model() {
//     const [todos, setTodo] = useState([
//         {
//               "id": 1,
//               "title": "Shopping",
//               "status": 0,
//               "subtasks": [
//                 {
//                   "id": 101,
//                   "title": "Reach Mall",
//                   "status": 0
//                 },
//                 {
//                   "id": 102,
//                   "title": "Pick Dresses",
//                   "status": 0
//                 },
//                 {
//                   "id": 103,
//                   "title": "Pick Groceries",
//                   "status": 0
//                 },
//                 {
//                   "id": 104,
//                   "title": "take Lunch",
//                   "status": 0
//                 }
//               ]
//             },
//       ]);
    
//       const addTodo = (title, description) => {
//         let sno;
//         if (todos.length === 0) {
//           sno = 1;
//         } else {
//           sno = todos[todos.length - 1].sno + 1;
//         }
    
//         const getTodo = {
//           title: title,
//           description: description,
//           sno: sno,
//         };
//         setTodo([...todos, getTodo]);
//       };
    
//       const onDelete = (todo) => {
//         setTodo(
//           todos.filter((e) => {
//             return e !== todo;
//           })
//         );
//       };
//     return (
//         <View>
//             <Text></Text>
//         </View>
//     )
// }

//   // const TaskModel = {
//   //   id: null,
//   //   title: "",
//   //   status: 0,
//   //   createdAt: "",
//   //   subtasks: [],
//   // };
//   // const SubTaskModel = {
//   //   id: null,
//   //   title: "",
//   //   createdAt: "",
//   //   status: 0,
//   // };
//   // 