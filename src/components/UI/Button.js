import { Pressable, StyleSheet, Text, View } from 'react-native';

function Button({ children, onPress, backgroundColor }) {
    return (
        <Pressable
            testID="button-pressable"
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: backgroundColor || '#ccc' },
                pressed && styles.pressed,
            ]}
            onPress={onPress}
        >
            <View>
                <Text style={styles.buttonText}>{children}</Text>
            </View>
        </Pressable>
    );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
    },
});
