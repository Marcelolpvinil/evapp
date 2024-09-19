import { Text, TextInput, StyleSheet, View } from "react-native";


const TextBox = (props) => {
    return (<View>
        <Text style ={textboxStyles.rotulo}>{props.rotulo}</Text>
        <TextInput style ={textboxStyles.text}
            placeholder={props.placeholder}
            secureTextEntry={props.isSenha}
            onChangeText={props.onChangeText} 
            value={props.value}/>
    </View>)
}

const textboxStyles  = StyleSheet.create({
    rotulo: {
        marginLeft: 5,
        color: "indigo",
        fontSize: 18,
        marginBottom: 5,
        marginTop: 40
    },
    text: {
        width: 330,
        backgroundColor: "lavender",
        padding: 11,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "honeydew",
        marginBottom: 15
    }
   
})

export default TextBox;

