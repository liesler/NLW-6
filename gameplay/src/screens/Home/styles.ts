import { StyleSheet} from 'react-native';
import { theme } from '../../global/styles/theme';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({

    container:{
        flex:1,
    },

    header:{
        width:'100%',
        paddingHorizontal:24,
        flexDirection: 'row',
        justifyContent: 'space-between', //oculpa as estremidades
        marginTop: getStatusBarHeight() + 26,
        marginBottom: 42,
    },

    content:{
        
    }, 

    matches:{
        marginTop:24,
        marginLeft:24,
    }
});