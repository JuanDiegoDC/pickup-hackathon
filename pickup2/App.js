import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  AppRegistry,
  Image,
  Button

} from 'react-native';
import { StackNavigator } from 'react-navigation';
// import { Button } from 'react-native-elements';
// import { Icon } from 'react-native-vector-icons/FontAwesome';
import { MapView } from 'expo';

class LoginScreen extends React.Component {
  static navigationOptions = (props) => ({
    title: 'Login',
    headerRight: <TouchableOpacity onPress={() => {props.navigation.navigate('Register')}}><Text>Register</Text></TouchableOpacity>
  });

  press() {
    this.props.navigation.navigate('LoginScreen');
  }

  register() {
    this.props.navigation.navigate('Register');
  }

  ping() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBig}>Login to Pickup!</Text>
        <TouchableOpacity onPress={ () => {this.press()} } style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonLabel}>Tap to Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
          <Text style={styles.buttonLabel}>Tap to Register</Text>
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
    this.props.navigation.navigate('LoginScreen');
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
    this.login()
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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errMsg: ''
    }
  }

  redirect() {
    this.props.navigation.navigate('Map');
  }

  handleSubmit(event) {
    event.preventDefault()
      fetch('http://e9aa7b6a.ngrok.io/login', {
      method: 'POST',
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
      })
    .then((response) => {
      console.log("resonse from post ", response)
      return response.json()
      })
    .then((responseJson) => {
      if (responseJson.success) {
        console.log("Login Success!", responseJson)
        this.setState({
          username: '',
          password: '',
        })
      } else {
        alert(responseJson.error)
      }
    })
    .catch((err) => {
      console.log("Login Error! (Network)", err)
    });
    this.redirect()
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{ borderRadius: 4, borderWidth: 0.5, borderColor: 'black', width: 300, marginBottom: 10}}>
          <TextInput
            style={{height: 40}}
            placeholder="Username"
            onChangeText={(text) => this.setState({username: text})}
            value={this.state.username}
          />
        </View>
        <View style={{ borderRadius: 4, borderWidth: 0.5, borderColor: 'black', width: 300, marginBottom: 10}}>
          <TextInput
            style={{height: 40}}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
            value = {this.state.password}
          />
        </View>
        <View style={{backgroundColor: '#FFC0CB', borderRadius: 4, borderWidth: 0.5}}>
          <TouchableOpacity onPress={(e) => this.handleSubmit(e)}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white', height: 40, width: 300, fontSize: 30, textAlign:'center'}}>Login</Text>
            </View>
        </TouchableOpacity>
      </View>
      </View>
    )
  }
}

class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 37.802981,
      long: -122.412146,
      latDelta: .1,
      longDelta: .05
    }
  }

  render() {
    return(
      <View style={{
          flex: 1
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>

          <TouchableOpacity
            style={{flex: 1,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center'}}
              onPress={() => this.handleInstanbul()}>
            <Text>Istanbul</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{flex: 1,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center'}}
              onPress={() => this.handleCurrent()}>
            <Text>Here</Text>
          </TouchableOpacity>

        </View>
        <MapView style={{flex: 7}}
        region={{
          latitude: this.state.lat,
          longitude: this.state.long,
          latitudeDelta: this.state.latDelta,
          longitudeDelta: this.state.longDelta
        }}
        />
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
  },
  Map: {
    screen: MapScreen
  },
  LoginScreen: {
    screen: Login
  }
}, {initialRouteName: 'Login'});


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
