import { StyleSheet, Text, TouchableOpacity } from "react-native";



function Botao(props) {
    return (<TouchableOpacity style={styles.btn} onPress={props.onPress}>
            <Text style={styles.text}>{props.text}</Text>
            </TouchableOpacity>)
}

const styles = StyleSheet.create({
    btn: {
        width: "90%",
        backgroundColor: "firebrick",
        borderRadius: 7,
        marginTop: 40
    },
    text: {
        fontSize: 20,
        color: "white",
        padding: 15,
        textAlign: "center"
    }
});

export default Botao;