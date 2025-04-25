import { StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react'

const Calculator = () => {
    // Dark mode
    const [isDarkMode, setIsDarkMode] = useState(false);
    const theme = {
        bgColorFunction: isDarkMode ? '#414853' : '#ededed',
        bgColorNumber: isDarkMode ? '#303946' : '#fff',
        bgColorResult: isDarkMode ? '#282f3b' : '#f5f5f5',
        bgColorThemeButton: isDarkMode ? '#7b8084' : '#e5e5e5',
        textColorHistory: isDarkMode ? '#b5b7bb' : '#7c7c7c',
        textColorButton: isDarkMode ? '#fff' : '#000',
        colorIcon: isDarkMode ? 'white' : 'black',
    }

    // Button
    const buttonsLeft = [
        ['C', 'DEL'],
        ['7', '8', '9'],
        ['4', '5', '6'],
        ['1', '2', '3'],
        ['0', '.'],
    ];
    const buttonsRight = ['/', 'x', '-', '+', '='];

    // Events
    const [currentNumber, setCurrentNumber] = useState('');
    const [lastNumber, setLastNumber] = useState('');
    const calculate = () => {
        let lastChar = currentNumber.slice(-1);
        if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/' || lastChar === '.') {
            setCurrentNumber(currentNumber);
        } else {
            let result = eval(currentNumber).toString();
            setCurrentNumber(result);
        }
    }

    const handleInput = (buttonPressed: string) => {
        switch (buttonPressed) {
            case '+':
            case '-':
            case '/':
            case '.':
                Vibration.vibrate(35);
                setCurrentNumber(currentNumber + buttonPressed);
                break;
            case 'x':
                Vibration.vibrate(35);
                setCurrentNumber(currentNumber + '*');
                break;
            case 'DEL':
                Vibration.vibrate(35);
                setCurrentNumber(currentNumber.slice(0, -1));
                break;
            case 'C':
                Vibration.vibrate(35);
                setCurrentNumber('');
                setLastNumber('');
                break;
            case '=':
                Vibration.vibrate(35);
                setLastNumber(currentNumber + buttonPressed);
                calculate();
                break;
            default:
                Vibration.vibrate(35);
                setCurrentNumber(currentNumber + buttonPressed);
                break;
        }
    }
    
    // Render UI
  return (
    <View style={styles.container}>
        <View style={{...styles.containerResult, backgroundColor: theme.bgColorResult}}>
            <TouchableOpacity style={{...styles.themeButton, backgroundColor: theme.bgColorThemeButton}} onPress={() => setIsDarkMode(!isDarkMode)}>
                <Entypo name={isDarkMode ? 'light-up' : 'moon'} size={40} color={theme.colorIcon} />
            </TouchableOpacity>
            <Text style={{...styles.historyText, color: theme.textColorHistory}}>{lastNumber}</Text>
            <Text style={styles.resultText}>{currentNumber}</Text>
        </View>
        <View style={styles.containerButton}>
            <View style={styles.containerButtonLeft}>
                {
                    buttonsLeft.map((row, index) => {
                        return (
                            <View style={{...styles.containerRow, backgroundColor: (index == 0) ? theme.bgColorFunction : theme.bgColorNumber}} key={index}>
                                {
                                    row.map((item, index) => {
                                        return (
                                            <TouchableOpacity style={styles.button} onPress={() => handleInput(item)} key={index}>
                                                <Text style={{...styles.buttonText, color: isDarkMode ? theme.textColorButton : 'black'}}>{item}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
            </View>
            <View style={styles.containerButtonRight}>
                {
                    buttonsRight.map((item, index) => {
                        return (
                            <TouchableOpacity style={styles.button} onPress={() => handleInput(item)} key={index}>
                                <Text style={{...styles.buttonText, color: 'white'}}>{item}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    </View>
  )
}

export default Calculator

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerResult: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "flex-end",
    },
    containerButtonLeft: {
        flex: 3,
    },
    containerButtonRight: {
        flex: 1,
        backgroundColor: "#00b9d6",
    },
    containerButton: {
        flex: 2,
        flexDirection: "row",
    },
    themeButton: {
        marginTop: 50,
        marginLeft: 20,
        borderRadius: 90,
        height: 60,
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-start"
    },
    historyText: {
        fontSize: 20,
        marginRight: 10,
    },
    resultText: {
        color: "#00b9d6",
        fontSize: 35,
        margin: 15,
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 30,
        fontWeight: "bold",
    },
    containerRow: {
        flex: 1,
        flexDirection: "row"
    }
})