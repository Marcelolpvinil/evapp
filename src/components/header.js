import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { vapp } from "../constants/icons.js";

const Header = (props) => {
    return(
        <View style={ {backgroundColor: "lavender"}}>
        <Image style={styles.vapp} source={vapp} />
        <View><Text style={styles.title}> {props.title} </Text></View>
        </View>
    )
}

const styles = StyleSheet.create({
vapp:{
    
    width: 320,
    height: 100,
},
title:{
    color: "darkslateblue",
    fontSize: 18,
    textAlign: "center",
    width: "100%",
    padding: 5,
}
});


export default Header;