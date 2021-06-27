import { StyleSheet} from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',

    },

    user:{
        flexDirection:'row',
        alignItems: 'center',
    },

    greeting:{
        fontFamily: theme.fonts.title500,
        fontSize:24,
        color:theme.colors.heading,
        marginRight:6
    },

    username:{
        fontFamily: theme.fonts.title700,
        fontSize:24,
        color:theme.colors.heading
    },

    message:{
        fontFamily: theme.fonts.text400,
        color: theme.colors.heading
    },

    title:{
        fontFamily: theme.fonts.title700,
        color:theme.colors.heading,
        fontSize:18,
        textAlign:'center',
        paddingTop:30
    },

    buttoncontainer:{
        flex:1,
        flexDirection:'row',
        paddingHorizontal:24,
        paddingTop:30
    },

    buttoncancel:{
        width: 160,
        height:56,
        borderColor:theme.colors.secondary30,
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems:'center',
        textAlign:'center',
        justifyContent:'center',
        marginRight:8,
        
    },

    buttonexit:{
        width: 160,
        height:56,
        backgroundColor:theme.colors.primary,
        borderColor:theme.colors.secondary100,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems:'center',
        textAlign:'center',
        justifyContent:'center'
    },

    titlesim:{
        fontFamily: theme.fonts.text400,
        color:theme.colors.heading,
        fontSize:18,
        textAlign:'center',
        justifyContent:'center'
    },

    titlenao:{
        fontFamily: theme.fonts.text400,
        color:theme.colors.heading,
        fontSize:18,
        textAlign:'center',
        justifyContent:'center'
    }


});