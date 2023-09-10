
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, FlatList, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Calculator Screen
function Calculator({ navigation }) {
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [result, setResult] = useState();
  const [text, setText] = useState();
  const [data, setData] = useState([]);
  
  
  const plusPressed = () => {
    setResult(Number(num1) + Number(num2));
    setText(num1 + "+" + num2 + "=" + (Number(num1) + Number(num2)));
    setData([...data, { key: (num1 + "+" + num2 + "=" + (Number(num1) + Number(num2))) }]);
  }
  
  const minusPressed = () => {
    setResult(Number(num1) - Number(num2));
    setText(num1 + "-" + num2 + "=" + (Number(num1) - Number(num2)));
    setData([...data, { key: (num1 + "-" + num2 + "=" + (Number(num1) - Number(num2))) }]);
  }
  
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput style={styles.input} onChangeText={num1 => setNum1(num1)} value={num1} keyboardType="numeric" />
      <TextInput style={styles.input} onChangeText={num2 => setNum2(num2)} value={num2} keyboardType="numeric" />
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button onPress={plusPressed} title="+" />
        </View>
        <View style={styles.button}>
          <Button onPress={minusPressed} title="-" />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => navigation.navigate("History", {data: data})}
            title="History"
          />
        </View>
      </View>
    </View>
  );
}

// History Screen
function History({route, navigation}) {

  const {data} = route.params;

  return (
    <View style={styles.container}>
      <Text>History</Text>

      <FlatList style={styles.list}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <Text>{item.key}</Text>
        }
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50,
  },
  input: {
    marginBottom: 5,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  buttons: {
    //borderWidth: 1,
    flexDirection: "row",
    alignItems: "centre",
    width: 260,
    //justyifyContent: "space-around",
    //marginTop: 20,
  },
  button: {
    flex: 1,
    //borderWidth: 1,
    margin: 5,
  }
});
