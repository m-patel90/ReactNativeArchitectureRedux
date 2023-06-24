/**
 * @visiblename Light Themed Alert
 * Used to show success/failure alert with icon
 * props-list
 * isModalVisible-bool
 * onOkayPress-fn
 */
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Modal from "react-native-modal";
import ScreenUtil from '../../commons/utility/ScreenUtil'
import { spacings, colors, fonts } from '../../commons/styles/theme';
import {hp,wp} from '../../commons/utility/Dimens'
import FIcons from 'react-native-vector-icons/Feather'

export default class AlertDilaogue extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let color='#EBEFF2'
        return (
            <Modal isVisible={this.props.isModalVisible}
                style={styles.modalStyle}
                animationIn={'slideInLeft'}
                animationOut={'slideOutRight'}
                backdropColor={colors.transparentDarkBlue}
                backdropOpacity={1}>
               

                    <View style={[styles.modalContentStyle,{height:this.props.message?hp(50):hp(44)}]}>
                        <View style={{ height:hp(20), justifyContent:'center'}}>
                            {this.props.imageSource?
                            <Image source={this.props.imageSource} />
                            :
                            <FIcons name="alert-triangle" size={hp(10)} color={colors.lightButtonColor}/>    
                        }
                        
                        </View>
                        <View style={{ height:hp(8), justifyContent:'flex-start',marginBottom:this.props.message?0:hp(6)}}>
                            <Text style={styles.headerText}>{this.props.title}</Text>
                        </View>
                        {
                            this.props.message?
                        <View style={{ height:hp(12), justifyContent:'center',justifyContent: 'flex-start',paddingStart:wp(6),paddingEnd:wp(6) }}>
                            <Text style={styles.messageText}>{this.props.message}</Text>
                        </View>
                        :
                        <View />
                    }
                        <View style={{ height:hp(10), justifyContent:'flex-end', width: '100%', justifyContent: 'flex-end',alignContent:'flex-end' }}>
                        {this.props.hideButton?
                        <View /> :
                        <TouchableOpacity onPress={this.props.onOkayPress} 
                            style={{ height:hp(9),borderTopColor:color, borderTopWidth: ScreenUtil.getPercentage(0.2), alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{color:this.props.forError?'red':colors.lightButtonColor,fontFamily:fonts.fontStyles.bold,fontSize:fonts.mediumLargeFont*1.09}}>OK</Text>
                            </TouchableOpacity>
                        }
                            
                        </View>
                    </View>
                
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    modalStyle: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContentStyle: {
        height: hp(50),
        width: '90%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderColor: '#000',
        borderWidth: 0.5,
        borderRadius: ScreenUtil.getPercentage(1.25)
    },
    headerText: {
        // fontWeight: '400',
        fontFamily: fonts.fontStyles.semiBold,
        fontSize: fonts.mediumLargeFont*1.09,
        color: '#051C3D',
        textAlign:'center',

    },
    messageText: {
        fontSize: fonts.mediumLargeFont*0.90,
        fontFamily: 'poppins',
        textAlign:'center',
        color:'#949DAC'
    }
});
