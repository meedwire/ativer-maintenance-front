import { Dimensions, StyleSheet } from "react-native";
import { Theme } from "../../theme";

export default StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxContent:{
        backgroundColor: 'white',
        padding: Theme.padding.L,
        borderRadius: 4,
        maxWidth: Dimensions.get('screen').width * 0.3
    },
    divider:{
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.light.border,
        marginVertical: 8
    },
    textTitle:{
        fontSize: 19
    },
    textMessage:{
        fontSize: 18
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center'
    }
})