import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  AppRegistry,
  Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';


class LoginScreen extends React.Component {
  static navigationOptions = (props) => ({
    title: 'Login',
    headerRight: <TouchableOpacity onPress={() => {props.navigation.navigate('Register')}}><Text>Register</Text></TouchableOpacity>
  });

  press() {
    this.props.navigation.navigate('LoginFr');
  }

  register() {
    this.props.navigation.navigate('Register');
  }

  ping() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBig}>Login to Pickup</Text>
        <TouchableOpacity onPress={ () => {this.press()} } style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonLabel}>Tap to Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
          <Text style={styles.buttonLabel}>Tap to Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => this.ping() }>
          <Text style={styles.buttonLabel}>Ping</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class RegisterScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      name: '',
      age: '',
      skill: '',
      position: '',
      imgUrl: ''
    }
  }

  static navigationOptions = (props) => ({
    title: "Register",
    headerLeft: <TouchableOpacity onPress={() => {props.navigation.navigate('Login')}}><Text>Login</Text></TouchableOpacity>
  })

  login() {
    this.props.navigation.navigate('Login');
  }
  handleSubmit() {
    console.log("this state", this.state)
      fetch('http://e9aa7b6a.ngrok.io/create/user', {
      method: 'POST',
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
        age: this.state.age,
        skill: this.state.skill,
        position: this.state.postion,
        imgUrl: this.state.imgUrl
      })
      })
    .then((response) => {
      console.log("resonse from post ", response)
      return response.json()
      })
    .then((responseJson) => {
      if (responseJson.success) {
        console.log("Registration Success!", responseJson)
        this.setState({
          username: '',
          password: '',
          name: '',
          age: '',
          position: '',
          skill: '',
          imgUrl: ''
        })
      } else {
        alert(responseJson.error)
      }
    })
    .catch((err) => {
      console.log("Registration Error! (Network)", err)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ borderRadius: 4, borderWidth: 0.5, borderColor: 'black', width: 300, marginBottom: 10}}>
          <TextInput
            style={{height: 40}}
            placeholder="Enter your username"
            onChangeText={(text) => this.setState({username: text})}
            value={this.state.username}
          />
        </View>
        <View style={{ borderRadius: 4, borderWidth: 0.5, borderColor: 'black', width: 300, marginBottom: 10}}>
          <TextInput
            style={{height: 40}}
            placeholder="Enter a password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
            value = {this.state.password}
          />
        </View>
        <View style={{ borderRadius: 4, borderWidth: 0.5, borderColor: 'black', width: 300, marginBottom: 10}}>
          <TextInput
            style={{height: 40}}
            placeholder="Enter your name"
            onChangeText={(text) => this.setState({name: text})}
            value = {this.state.name}
          />
        </View>
        <View style={{ borderRadius: 4, borderWidth: 0.5, borderColor: 'black', width: 300, marginBottom: 10}}>
          <TextInput
            style={{height: 40}}
            placeholder="Enter your position"
            onChangeText={(text) => this.setState({position: text})}
            value = {this.state.position}
          />
        </View>
        <View style={{ borderRadius: 4, borderWidth: 0.5, borderColor: 'black', width: 300, marginBottom: 10}}>
          <TextInput
            style={{height: 40}}
            placeholder="Enter your age"
            onChangeText={(text) => this.setState({age: text})}
            value = {this.state.age}
          />
        </View>
        <View style={{ borderRadius: 4, borderWidth: 0.5, borderColor: 'black', width: 300, marginBottom: 10}}>
          <TextInput
            style={{height: 40}}
            placeholder="Enter your skill level"
            onChangeText={(text) => this.setState({skill: text})}
            value = {this.state.skill}
          />
        </View>
        <View style={{ borderRadius: 4, borderWidth: 0.5, borderColor: 'black', width: 300, marginBottom: 10}}>
          <TextInput
            style={{height: 40}}
            placeholder="Optional Image Url"
            onChangeText={(text) => this.setState({imgUrl: text})}
            value = {this.state.imgUrl}
          />
        </View>
        <View style={{backgroundColor: '#FFC0CB', borderRadius: 4, borderWidth: 0.5}}>
          <TouchableOpacity onPress={() => this.handleSubmit()}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white', height: 40, width: 300, fontSize: 30, textAlign:'center'}}>Submit</Text>
            </View>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}



export default StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen
  }
}, {initialRouteName: 'Login'});

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//       </View>
//     );
//   }
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: '#0074D9',
  },
  buttonGreen: {
    backgroundColor: '#2ECC40'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  messageContainer:{
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    alignSelf: 'stretch',
    borderColor: 'black',
    padding: 5
  }
});
