import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import db from '../Config';
import firebase from 'firebase';

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      clicked: false,
      isModalVisible: false,
      firstName: '',
      lastName: '',
      address: '',
      contact: '',
      confirmPassword: '',
    };
  }

  login = async (email, password) => {
    if (this.state.clicked === true) {
      if (email && password) {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            alert('User Login Successful.');
          })
          .catch((error) => {
            var message = error.message;
            alert(message);
          });
      } else {
        alert('Enter your details');
      }
    }
  };

  signUp = async (email, password) => {
    if (
      this.state.firstName != '' &&
      this.state.address != '' &&
      this.state.contact != ''
    ) {
      if (this.state.clicked === true) {
        if (password === this.state.confirmPassword) {
          if (email && password) {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                alert('User SignUp Successful.');
              })
              .catch((error) => {
                var message = error.message;
                alert(message);
              });

            db.collection('Users').add({
              contact: this.state.contact,
              address: this.state.address,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              emailId: this.state.emailId,
              password: this.state.password,
            });
          } else {
            alert('Enter your password and email id.');
          }
        } else {
          alert('Your passwords do not match.\nPlease check your password.');
        }
      }
    } else {
      alert('Enter your details.');
    }
  };

  render() {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isModalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.text3}>Registration Form</Text>
              <TextInput
                placeholder="First Name"
                placeholderTextColor="white"
                style={styles.input3}
                maxLength={20}
                onChangeText={(val) => this.setState({ firstName: val })}
                value={this.state.firstName}
              />

              <TextInput
                placeholder="Last Name"
                placeholderTextColor="white"
                style={styles.input3}
                maxLength={20}
                onChangeText={(val) => this.setState({ lastName: val })}
                value={this.state.lastName}
              />

              <TextInput
                placeholder="Address"
                placeholderTextColor="white"
                style={styles.input3}
                multiline={true}
                onChangeText={(val) => this.setState({ address: val })}
                value={this.state.address}
              />

              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="white"
                style={styles.input3}
                maxLength={10}
                keyboardType="numeric"
                onChangeText={(val) => this.setState({ contact: val })}
                value={this.state.contact}
              />

              <TextInput
                placeholder="Email Address"
                placeholderTextColor="white"
                style={styles.input3}
                keyboardType="email-address"
                onChangeText={(val) => this.setState({ emailId: val })}
                value={this.state.emailId}
              />

              <TextInput
                placeholder="Password"
                placeholderTextColor="white"
                style={styles.input3}
                secureTextEntry={true}
                onChangeText={(val) => this.setState({ password: val })}
                value={this.state.password}
              />

              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="white"
                style={styles.input3}
                secureTextEntry={true}
                onChangeText={(val) => this.setState({ confirmPassword: val })}
                value={this.state.confirmPassword}
              />

              <TouchableOpacity
                style={styles.container2}
                onPress={() => {
                  this.setState({ clicked: true });
                  this.signUp(this.state.emailId, this.state.password);
                }}>
                <Text style={styles.text4}>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.container3}
                onPress={() => {
                  this.setState({
                    clicked: false,
                    isModalVisible: false,
                  });
                }}>
                <Text style={styles.text4}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <KeyboardAvoidingView style={{ alignItems: 'center', marginTop: 20 }}>
          <View>
            <Text style={{ textAlign: 'center', fontSize: 30 }}>
              Barter App
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email address"
              keyboardType="email-address"
              onChangeText={(text) => {
                this.setState({
                  emailId: text,
                });
              }}
            />

            <TextInput
              style={styles.input2}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                this.login(this.state.emailId, this.state.password);
              }}>
              <Text style={styles.text2}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                this.setState({ isModalVisible: true });
              }}>
              <Text style={styles.text2}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    borderRadius: 3,
    borderWidth: 2,
    alignSelf: 'center',
    padding: 2,
    backgroundColor: 'yellow',
    fontWeight: 'bold',
  },
  input2: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
    borderRadius: 3,
    borderWidth: 2,
    alignSelf: 'center',
    padding: 2,
    backgroundColor: 'yellow',
    fontWeight: 'bold',
  },
  input3: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 20,
    borderRadius: 3,
    borderWidth: 2,
    alignSelf: 'center',
    padding: 2,
    backgroundColor: 'purple',
    fontWeight: 'bold',
  },
  container: {
    fontSize: 30,
    backgroundColor: 'black',
    fontWeight: 'bold',
    borderRadius: 5,
    borderWidth: 2,
    alignSelf: 'center',
    marginTop: 10,
    padding: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'green',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text2: {
    color: 'white',
    fontSize: 15,
    padding: 2,
  },

  text3: {
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'yellow',
    padding: 5,
    borderRadius: 5,
    color: 'red',
    textAlign:"center",
  },

  container2: {
    backgroundColor: 'brown',
    padding: 2,
    marginTop: 10,
    borderRadius: 3,
    borderWidth: 2,
    fontSize: 20,
  },

  container3: {
    backgroundColor: 'blue',
    padding: 2,
    marginTop: 10,
    borderRadius: 3,
    borderWidth: 1,
    fontSize: 15,
  },
  text4: {
    fontSize: 20,
    color: 'white',
  },
});
