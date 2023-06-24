import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Alert from './Alert'

export default class example extends Component {
  constructor(props){
    super(props)
    this.state={
      isModalVisible:false
    }
  }
  _toggleModal=()=>{
    this.setState({
      ...this.state,
      isModalVisible:!this.state.isModalVisible
    })
  }
  render() {
    return (
      <View style={{backgroundColor:'gray',padding:50}}>
        <Text onPress={()=>{this._toggleModal()}}>Toggle</Text>
       <Alert isModalVisible={this.state.isModalVisible}
         title="Request submitted successfully"
         message="Your documents are pending verification. We will notify you once it is complete"
         onOkayPress={this._toggleModal }
         imageSource={require('../../assets/images/success.png')}
         />
      </View>
    )
  }
}