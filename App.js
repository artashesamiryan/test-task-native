import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import axios from "axios";
import AwesomeAlert from 'react-native-awesome-alerts';

class App extends Component {
  constructor() {
    super();
    this.state = {showAlert:false, showgetAlert:false, showTitle: null, showDesc: null};
    this.send = this.send.bind(this);
    this.get = this.get.bind(this);
  }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
  
  setShowTitle = (text) => {
    this.setState({
      showTitle: text
    })
  };

  setShowDescription = (desc) => {
    this.setState({
      showDesc: desc
    })
  }
  
 
  hideAlert = () => {
    this.setState({
      showAlert:false, showAlert:false,
    });
  };
  

  send = () => {
    axios
      .post("https://efc50644efba.ngrok.io/api/set-book", {
        author: "Dan Brown",
        description: "The Lost Symbol",
      })
      .then((res) => {
        console.log(res);
        this.setShowTitle(res.data.message)
        this.setShowDescription(res.data.book.author)
        this.showAlert();
      });
  }

  get = () => {
    axios.get("https://efc50644efba.ngrok.io/api/get-book/1").then((res) => {
      this.setShowTitle(res.data.author)
      this.setShowDescription(res.data.description)
      this.showAlert();
    })
    .catch(err=>{
      this.setShowTitle('Something went wrong')
      this.setShowDescription('Could not create a book')
      this.showAlert();
    });
  }
  render() {
    const {showAlert, showTitle, showDesc} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={showTitle}
          message={showDesc}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
        <button
          onClick={this.get}
          style={{ padding: "10px", width: "100px", marginBottom: "20px" }}
        >
          GET
        </button>
        <button onClick={this.send} style={{ padding: "10px", width: "100px" }}>
          POST
        </button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App