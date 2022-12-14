import React from "react"
import {View ,Text, TouchableWithoutFeedBack,Image,StyleSheet} from "react-native"
import {fonts} from "../../utils/utils"
const CircleBtn = ({icon,text})=>{
    
    return(
        <View>
            <View style={styles.iconContainer}>
                <Image source={icon}/>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{text}</Text>  
            </View>
        </View>
    )
}

export default CircleBtn



// circle sizes
const styles = StyleSheet.create({
 
    iconContainer:{
    height:48,
    width:48,
    backgroundColor:"#fff",
    justifyContent:"center",
    marginBottom:10,
    alignItems:"center",
    borderRadius:20,
    shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 6,
        shadowColor: "#4D7179",
      shadowOffset: { width: 0, height: 1 },
    },
    textContainer:{
        
   
        alignItems:"center"
    },
    text:{
        
        
        //styleName: Text/S;
fontFamily:fonts.medium,
fontSize: 13,
lineHeight: 20,
letterSpacing: 0.005,



    }
})